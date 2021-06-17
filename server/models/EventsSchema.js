const mongoose = require("mongoose");

const SportEvent = new mongoose.Schema({
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
    location: String,
    adressGeo: String,
    adressEng: String,
    adressRu: String,
    price: String,
    status: Boolean,
});
const TopEvent = new mongoose.Schema({
    eventId: { type: String, required: true, },
    titleGeo: String,
    titleEng: String,
    titleRu: String,
    groupName: { type: String, required: true, },
    smallImage: String,
    mediumImage: String,
    image: String,
});


const EventSchema = new mongoose.Schema({
    topEvents: [TopEvent],
    sportEvents: [SportEvent]
});

module.exports = mongoose.model("events", EventSchema);
