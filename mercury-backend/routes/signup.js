const express = require("express");
const jwtDecode = require("jwt-decode");
const userModel = require("../models/user");
const router = express.Router();

const User = require("../models/user");

const { createToken, hashedPassword } = require("../utils/utils");

router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email aleady exists!" });
    }

    const hashedPass = await hashedPassword(req.body.password);

    const userData = {
      firstname,
      lastname,
      email,
      password: hashedPass,
      role: "admin",
    };

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      res.json({
        message: "User created",
        token,
        expiresAt,
        userInfo: {
          firstname: savedUser.firstname,
          lastname: savedUser.lastname,
          email: savedUser.email,
          role: savedUser.role,
        },
      });
    } else {
      res
        .status(400)
        .json({ message: "There was a problem craeting your account!" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "There was a problem creating your account!" });
  }
});

module.exports = router;
