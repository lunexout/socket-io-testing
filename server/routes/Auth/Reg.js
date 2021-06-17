const express = require("express");
const router = express.Router();
const UserSchema = require("../../models/UserSchema");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const name = req.body.user.name;
  const surname = req.body.user.surname;
  const email = req.body.user.email;
  const password = bcrypt.hashSync(req.body.user.password, 7);

  UserSchema.findOne({ email: email }).then((result) => {
    if (result == null) {
      const newUser = new UserSchema({
        name,
        email,
        surname,
        password,
        picture: "",
      });
      newUser.save();
      res.json({ msg: "რეგისტრაცია განხორციელდა წარმატებით", success: true });
    } else {
      res.json({ msg: "უკვე რეგისტრირებულია", success: false });
    }
  });
});

module.exports = router;
