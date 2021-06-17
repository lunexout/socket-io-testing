const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = require("../../models/UserSchema");

let user = {};
const env = require("./../../../env.json");

// const CheckUser = require("./../../middlewares/CheckUser");
const EventsSchema = require("./../../models/EventsSchema")

router.route("/top").post(async (req, res) => {

    await EventsSchema.findOne({}).then((response) => {

    })
});

module.exports = router;



// CREATE EVENTS


router.route("/createsportevent").get((req, res) => {
    EventsSchema.findOne({}).then(result => {
        result.sportEvents.push({
            eventId: 4,
            titleGeo: '4ივენთი',
            titleEng: '4event',
            titleRu: '4события',
            groupName: 'sportEvent',
            smallImage: 'https://www.gannett-cdn.com/media/2020/03/23/USATODAY/usatsports/247WallSt.com-247WS-658009-imageForEntry4-th0.jpg?width=2560',
            mediumImage: 'https://www.gannett-cdn.com/media/2020/03/23/USATODAY/usatsports/247WallSt.com-247WS-658009-imageForEntry4-th0.jpg?width=2560',
            image: 'https://www.gannett-cdn.com/media/2020/03/23/USATODAY/usatsports/247WallSt.com-247WS-658009-imageForEntry4-th0.jpg?width=2560',
            startedAt: '03/11/2021',
            sellStartedAt: '02/11/2021',
            descriptionGeo: 'აღწერაGeo',
            descriptionEng: 'აღწერაEng',
            descriptionRu: 'აღწერაRu',
            location: 'Batumi',
            adressGeo: 'chavchavadze 59Geo',
            adressEng: 'chavchavadze 59Eng',
            adressRu: 'chavchavadze 59Ru',
            price: '5 - 25',
            status: true,
        })
        result.topEvents.push({
                eventId: 4,
                titleGeo: '4ივენთი',
                titleEng: '4event',
                titleRu: '4события',
                groupName: 'sportEvent',
                smallImage: 'https://www.gannett-cdn.com/media/2020/03/23/USATODAY/usatsports/247WallSt.com-247WS-658009-imageForEntry4-th0.jpg?width=2560',
                mediumImage: 'https://www.gannett-cdn.com/media/2020/03/23/USATODAY/usatsports/247WallSt.com-247WS-658009-imageForEntry4-th0.jpg?width=2560',
                image: 'https://www.gannett-cdn.com/media/2020/03/23/USATODAY/usatsports/247WallSt.com-247WS-658009-imageForEntry4-th0.jpg?width=2560',
        })
        result.save();
    })
    res.json('success')
});

router.route("/top").get((req, res) => {
    EventsSchema.findOne({}).then(result => {
        res.json(result.topEvents)
    })
});
