const express = require("./config/express.js"),
  mongoose = require("mongoose");


const uri = require("../env.json");
const port = 3001;

const app = express.init();
const server = require("http").createServer(app);
const io = require("socket.io")(server);



io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on('change billets', async ({item}) => {
  })

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

server.listen(port, () => console.log(`Server now running on port ${port}!`));

const TicketSchema = require("./models/biletSchema");


const Reg = require('./routes/Reg')
app.use('/registration', Reg);

const Log = require('./routes/Log')
app.use('/login', Log)


app.post("/getbillets", async (req, res) => {
  await TicketSchema.find({}).then((r) => {
    res.json({ data: r });
  });
});

const Reserv = require("./models/reservationSchema");

app.post("/changeBiletStatus", async (req, res) => {
  Reserv({ 'id': req.body.item.id ,'name_id': req.body.id}).save(function(err, result){
    if(err)
        res.send(err);
    else {
        TicketSchema.findOne({id: req.body.item.id}).then((r) => {
          r.status = 1;
          r.name_id = req.body.id;
          r.save();
        });
        console.log(result);
        // req.session.user = result;
        res.send({"code":200,"message":"Record inserted successfully"});
    }
});
  
});
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
          name_id: change.updateDescription.updatedFields.name_id,
        };
        io.of("/api/socket").emit("newThought", thought);
        break;

      case "delete":
        io.of("/api/socket").emit("deletedThought", change.documentKey._id);
        break;
    }
  });
});


// app.get('/create', (req,res) => {
  
// for(let i = 0; i < 10; i ++){ 

//   tick = new TicketSchema({
//     id: i,
//     status: 0,
//     isReserved: false,
//     name_id: ''
//   })
//   tick.save()
// }
// res.json('success')
// })
const biletSchema = require("./models/biletSchema");
// app.get('/reservation', (req, res) => {
//   let reserv = new Reserv({
//     id: 0,
//   })
//   reserv.save();
//   res.json('succ')
// })

connection.on("error", (error) => console.log("Error: " + error));
