const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./user.js");
const User = users.model;
const validUser = users.valid;

const contacts = require("./contact.js");
const Contact = contacts.model;

const personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    birth: String,
    photo: String,
    contact: {
        type: mongoose.Schema.ObjectId,
        ref: 'Contact'
    }
    //
});
const Person = mongoose.model("Person", personSchema);
  
router.post("/photo", validUser, upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
    const person = await Person.findById(user.person);
    person.photo = "/images/" + req.file.filename;
    try {
      await person.save();
      return res.sendStatus(200);
    } catch (error) {
      //console.log(error);
      return res.sendStatus(500);
    }
});

router.get("/", validUser, async (req, res) => {
    // return photos
    try {
      let photos = await Photo.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(photos);
    } catch (error) {
      //console.log(error);
      return res.sendStatus(500);
    }
});


module.exports = {
    model: Photo,
    routes: router,
  }


