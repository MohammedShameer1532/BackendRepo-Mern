const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const UserModel = require("./model/User");
require("dotenv").config();
const PORT = process.env.PORT || 2001;

server.use(express.json());
server.use(cors());

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (err) {
    console.error(err);
  }
}
// Error handling middleware
server.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => {
      // console.log("Data added:", users);
      res.status(201).json({ message: "Success", data: users });
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request."});
    });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: console.log("Please fill in all the required fields.")});
  }
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("the password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});
server.post("/profile", (req, res) => {
  UserModel.create(req.body)
    .then((users) => {
      console.log("Data added:", users);
      res.status(201).json({ message: "Success", data: users });
    })
    .catch((err) => {
      console.log("Something went wrong:", err);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request." });
    });
});

server.listen(PORT, () => {
  console.log("server is running");
});
