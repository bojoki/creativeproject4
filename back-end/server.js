const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/babyTracker', {
    useNewUrlParser: true
});

const upload = multer({
    dest:'../images/',
    limits: {
        fileSize: 10000000
    }
});

const parentSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    contactId: mongoose.Schema.Types.ObjectId,
    spouseId: mongoose.Schema.Types.ObjectId
});
const Parent = mongoose.model("Parent", parentSchema);

const childSchema = new mongoose.Schema({
    // do we need two separate if the parents are already connected?
    fatherId: mongoose.Schema.Types.ObjectId,
    motherId: mongoose.Schema.Types.ObjectId,
    personId: mongoose.Schema.Types.ObjectId,
});
const Child = mongoose.model("Child", childSchema);

const contactSchema = new mongoose.Schema({
    cell: String,
    email: String,
    address: String,
});
const Contact = mongoose.model ("Contact", contactSchema);

const personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    birth: Date,
    photo: String,
});
const Person = mongoose.model("Person", personSchema);

const napSchema = new mongoose.Schema({
    start: Date,
    end: Date,
    childId: mongoose.Schema.Types.ObjectId
});
const Nap = mongoose.model("Nap", napSchema);

const mealSchema = new mongoose.Schema({
    start: Date,
    food: [String],
    childId: mongoose.Schema.Types.ObjectId
});
const Meal = mongoose.model("Meal", mealSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});
app.post('/api/items', async (req, res) => {
    const item = new Item({
        title: req.body.title,
        path: req.body.path,
        description: req.body.description
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.get('/api/items', async (req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.delete('/api/items/:id', async(req,res) => {
    try {
        await Item.deleteOne({
        _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.put('/api/items/:id', async(req,res) => {
    try {
        let item = await Item.findOne({
        _id: req.params.id
        });
        item.title = req.body.title;
        item.description = req.body.description;
        item.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// const preferenceSchema = new mongoose.Schema({
//     // ... nap time, // 
// })
// 
// app.post()
// app.post()
// app.post()
// app.post()

// app.get()
// app.get()

app.listen(3000, () => console.log('Server listening on port 3000!'));
