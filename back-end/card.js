const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const users = require("./user.js");
const User = users.model;
const validUser = users.valid;

const cardSchema = new mongoose.Schema({
    recipient: String,
    // contact: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Contact'
    // }
    message: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});
const Card = mongoose.model("Card", cardSchema);

// just to update, not necessarily initialize...
router.post("/", validUser, async (req, res) => {
    // check parameters
  
    const card = new Card({
      user: req.user._id,
      recipient: req.recipient,
      message: req.message
    });
    try {
      await card.save();
      return res.sendStatus(200);
    } catch (error) {
      //console.log(error);
      return res.sendStatus(500);
    }
});
// pass me user ID
router.get("/", validUser,  async (req, res) => {
  try {
    let user = req.user;
    let cards = await Card.find({user: user._id});
    
    //console.log(photo);
    return res.send(cards);
  } catch (error) {
    //console.log(error, "photo phetch");
    return res.sendStatus(500);
  }
});

module.exports = {
    routes: router,
    model: Card
}