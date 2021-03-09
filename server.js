//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("db")

//sets up express
var app = express();
var PORT = process.env.port || 5500;


//link to assets
app.use(express.static('public'));

//setting up data parsing - interpret as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//request and response 

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// get, post, and delete endpoints

app.route("/api/notes")

    // route get for notes list

    .get(function (req, res) {
        res.json(database);
    })

    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "db");
        let newNote = req.body;


    });



//listen to start the server on the port specified 
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



