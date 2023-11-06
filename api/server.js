// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();
server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved",
      err: err.message,
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id);

    if (!userById) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(userById);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      err: err.message,
    });
  }
});

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newUser = await User.insert({ name, bio });
    if (!name || !bio) {
      res.status(400).json({
        message: "Please provide name and bio for the user",
      });
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      err: err.message,
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    possibleUser = await User.findById(req.params.id);
    if (!possibleUser) {
      res.status(404).json({
        message: `The user with the specified ID does not exist`,
      });
    } else {
      if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      } else {
        const updatedUser = await User.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved",
      err: err.message,
    });
  }
});

server.get("*", (req, res) => {
  res.send("hell world from express");
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
