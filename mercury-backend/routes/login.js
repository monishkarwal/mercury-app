const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { comparePassword, createToken } = require("../utils/utils");
const jwtDecode = require("jwt-decode");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(403).json({ message: "Wrong Email or Password!" });
    }

    const checkPasswordMatch = await comparePassword(password, user.password);

    if (!checkPasswordMatch) {
      return res.status(403).json({ message: "Wrong Email or Password!" });
    } else {
      const token = createToken(user);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      res.json({
        message: "Authenticated successfully!",
        token,
        expiresAt,
        userInfo: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
