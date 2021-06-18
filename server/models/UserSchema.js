const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     personalNumber: {
//         type: String,
//         required: true,
//     },
//     name: String,
//     email: String,
//     password: String,
//     phone: String,
//     picture: String,
//     myBillets: [],
  
//   });
const Favourite = new mongoose.Schema({
  eventId: { type: String, required: true, },
  titleGeo: String,
  titleEng: String,
  titleRu: String,
  groupName: { type: String, required: true, },
  smallImage: String,
  mediumImage: String,
  image: String,
  startedAt: String,
  sellStartedAt: String,
  descriptionGeo: String,
  descriptionEng: String,
  descriptionRu: String,
  locationGeo: String,
  locationEng: String,
  locationRu: String,
  adressGeo: String,
  adressEng: String,
  adressRu: String,
  price: Number,
  status: Boolean,
})
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  personalNumber: String,
  phone: String,
  picture: String,
  myBillets: [],
  myHistory: [],
  myFavourites: [Favourite]
});

module.exports = mongoose.model("users", UserSchema);
