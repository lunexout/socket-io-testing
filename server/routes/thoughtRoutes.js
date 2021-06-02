const express = require("express");
const router = express.Router();
const TicketSchema = require("../models/biletSchema");

router.post("/getbillets", (req, res) => {
  TicketSchema.find({}).then((r) => {
    res.json({ data: r });
  });
});

module.exports = router;
