// const { getBillets } = require("../controllers/biletController"),
const express = require("express");
const router = express.Router();
const TicketSchema = require("../models/biletSchema");

router.post("/getbillets", (req, res) => {
  TicketSchema.find({}).then((r) => {
    res.json({ data: r });
  });
});
// router.get("/getThoughts", getThoughts);

module.exports = router;
