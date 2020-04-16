const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const users = require("./user.js");
const User = users.model;
const validUser = users.valid;
const persons = require("./person.js");
const Person = persons.model;

const contactSchema = new mongoose.Schema({
    cell: String,
    email: String,
    address: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// just to update, not necessarily initialize...
router.post("/", async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const photo = new Photo({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });
    try {
      await photo.save();
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
    let person = await Person.findById(user.person).populate('contact');
    let contact = person.contact;
    
    //console.log(photo);
    return res.send(contact);
  } catch (error) {
    //console.log(error, "photo phetch");
    return res.sendStatus(500);
  }
});

module.exports = {
    routes: router,
    model: Contact
}