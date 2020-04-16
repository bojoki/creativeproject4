const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cookieSession({
    name:'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

mongoose.connect('mongodb://localhost:27017/sweetCards', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const user = require("./user.js");
app.use("/api/user", user.routes);
const person = require("./person.js");
app.use("/api/person", person.routes);
const contact = require("./contact.js");
app.use("/api/contact", contact.routes);
const card = require("./card.js");
app.use("/api/card", card.routes);




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



app.listen(3002, () => console.log('Server listening on port 3002!'));
