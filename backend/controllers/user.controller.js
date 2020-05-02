const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Input validation
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

// User model
const User = require("../models/user.model");

// JWT key
const keys = require("../config/keys");

exports.register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    // Check if email already in use
    if (user) {
      return res.status(400).json({ email: "Email already in use" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password and store in db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

exports.login = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find by email
  User.findOne({ "email": email }).then((user) => {
    if (!user) {
      return res.status(400).json({ emailnotfound: "Email not found" });
    }
    // Check password
    console.log(user.password);
    console.log(password);
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        // Create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600, // 1 hour
          },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        // Incorrect password
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};
