const express = require("./config/express.js"),
  mongoose = require("mongoose");
// cron = require("node-cron");

// Use env port or default

const uri = require("../env.json");
const port = 3001;
//establish socket.io connection
const app = express.init();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`));
// const router = express.Router();
const TicketSchema = require("./models/biletSchema");

app.post("/getbillets", (req, res) => {
  TicketSchema.find({}).then((r) => {
    res.json({ data: r });
  });
});

app.post("/changeBiletStatus", async (req, res) => {
  TicketSchema.findOne({id: req.body.item.id}).then(r => {
    if(!r.name_id.length > 0) {
      // TicketSchema.findOne({id: req.body.item.id}).then(r => {
        TicketSchema.updateOne({id: req.body.item.id}, {name_id: req.body.id})
      // })
      res.json('daemata')
    }else {
      res.json('arsebobs')
    }
  })
});
//connect to db
mongoose.connect(uri.BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");
  console.log("Setting change streams");
  const thoughtChangeStream = connection.collection("tickets").watch();

  thoughtChangeStream.on("change", (change) => {
    console.log(change);
    switch (change.operationType) {
      case "update":
        const thought = {
          _id: change.documentKey._id,
          status: change.updateDescription.updatedFields.status,
        };
        io.of("/api/socket").emit("newThought", thought);
        break;

      case "delete":
        io.of("/api/socket").emit("deletedThought", change.documentKey._id);
        break;
    }
  });
});

//schedule deletion of thoughts at midnight
// cron.schedule("0 0 0 * * *", async () => {
//   await connection.collection("thoughts").drop();

//   io.of("/api/socket").emit("thoughtsCleared");
// });
app.get('/create', (req,res) => {
  
for(let i = 0; i < 10; i ++){ 

  tick = new TicketSchema({
    id: i,
    status: 0,
    isReserved: false,
    name_id: ''
  })
  tick.save()
}
res.json('success')
})

connection.on("error", (error) => console.log("Error: " + error));
