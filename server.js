//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");


//sets up express
const app = express();
const PORT = process.env.port || 3001;

//sets the id so I can add to it later for each note being made into the db
let NoteId = 1;


//link to assets
app.use(express.static(path.join(__dirname, "public")));

//setting up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//request and response 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
//request and response for notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// get, post, and delete endpoints
app.route("/api/notes")

    // Grabs the notes list in json format when prompted with get
    .get(function (req, res) {
        res.json(database);
    })

//posts a new note to the DB
app.post('/api/notes', (req, res) => {

    let jsonFilePath = path.join(__dirname, "/db/db.json");
    const note = {
        id: NoteId++,
        title: req.body.title,
        text: req.body.text,
    };


    database.push(note);
    //Save to db.json in json format
    fs.writeFileSync("./db/db.json", JSON.stringify(database));
    res.json(true);
});

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    // request to delete note by id.
    for (let i = 0; i < database.length; i++) {

        //splice the note database array by 1
        if (database[i].id == req.params.id) {
            database.splice(i, 1);
            break;
        }
    }
    // Write the db.json file again.
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});

//listen to start the server on the port specified 
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});