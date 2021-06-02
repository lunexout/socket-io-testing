const mongoose = require("mongoose");

let ReservationSchema = mongoose.Schema({
  id: String,
  name_id: String,
});

module.exports = mongoose.model("reservations", ReservationSchema);
