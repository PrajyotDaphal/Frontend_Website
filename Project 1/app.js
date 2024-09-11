const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Kitten', contactSchema);

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get("/",(req, res) => {
    const params = { }
    res.status(200).render('home.pug', params);
});

app.get("/contact",(req, res) => {
    const params = { }
    res.status(200).render('contact.pug', params);
});

app.get("/about",(req, res) => {
    const params = { }
    res.status(200).render('about.pug', params);
});

app.get("/services",(req, res) => {
    const params = { }
    res.status(200).render('services.pug', params);
});

app.post("/contact",(req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("Information Save to Database")
    }).catch(() => {
        res.status(404).send("Information not saved to Database")
    });
    // res.status(200).render('contact.pug');
});

app.listen(port, () => {
    console.log(`Started Sucessfully ${port}`)
});