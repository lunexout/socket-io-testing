const express = require("express");
const router = express.Router();
const UserSchema = require("../models/UserSchema");
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
    const personalNumber = req.body.user.personalNumber;
    const name = req.body.user.name;
    const email = req.body.user.email;
    const password = bcrypt.hashSync(req.body.user.password, 7);
    
    await UserSchema.findOne({ personalNumber: personalNumber }).then(
      (result) => {
        if (result == null) {
          UserSchema.findOne({ email: email }).then((result) => {
            if (result == null) {
              const newUser = new UserSchema({
                personalNumber,
                name,
                email,
                password,
              });
              newUser.save();
              res.json({ msg: "რეგისტრაცია განხორციელდა წარმატებით", success: true, });
            } else {
              res.json({ msg: "მომხმარებელი ამ მეილით არსებობს", success: false, });
            }
          });
        } else {
          res.json({ msg: "მომხმარებელი ამ პირადობით არსებობს", success: false,  });
        }
      }
    );
});

module.exports = router;
