const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = require("../../models/UserSchema");

let user = {};
const env = require("./../../../env.json");

router.route("/").post(async (req, ress) => {
  const email = req.body.user.email;
  const password = req.body.user.password;

  await UserSchema.findOne({ email: email }).then((res) => {
    if (res == null) {
      ress.json({ msg: "მომხმარებელი ვერ მოიძებნა", success: false });
    } else if (res.password.length > 0) {
      bcrypt.compare(password, res.password, (err, verified) => {
        if (verified) {
          const email = res.email;
          const access_token = jwt.sign({ email }, env.ACCESS_TOKEN, {
            expiresIn: "1h",
          });
          user = res;
          ress.json({
            user: {
              name: res.name,
              surname: res.surname,
              picture: res.picture,
              email: res.email,
            },
            msg: "შესვლა განხორციელდა წარმატებით",
            access_token: access_token,
            success: true,
          });
          return;
        } else {
          ress.json({ msg: "მომხმარებლის პაროლი არასწორია", success: false });
        }
      });
    }
  });
});

module.exports = router;
