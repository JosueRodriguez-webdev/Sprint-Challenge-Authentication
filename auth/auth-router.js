const router = require("express").Router();
const bcrypt = require("bcryptjs");
const plug = require("./auth-helpers.js");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  // implement registration
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  password = hash;

  plug
    .add({ username, password })
    .then(() => {
      res.status(201).json({ successMessage: "Account successfully created" });
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "Error creating account, try again" });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;
  plug
    .findByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { username: user.username, id: user.id },
          "secret",
          { expiresIn: "1h" }
        );

        res.status(200).json({ username: user.username, token: token });
      } else {
        res.status(401).json({ message: "User is not authorized." });
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "Error login" });
    });
});

module.exports = router;
