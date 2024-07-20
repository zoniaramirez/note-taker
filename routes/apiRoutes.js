const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Handle Get of existing notes, to populate on page
router.get('/notes', function (req, res) {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.send(dbData);
    });
});

// Handle the Post of new notes when user clicks save
router.post('/notes', function (req, res) {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        dbData.push(newNote);


        fs.writeFile('./db/db.json', JSON.stringify(dbData, null, 2), (err) => {
            if (err) throw err;
            res.send('Note Added');
        });
    });
});

// Handle the Delete HTTP request of a note, based on ID, from user clicking the delete icon
router.delete('/notes/:id', function (req, res) {
    const deleteNote = req.params.id;

    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;

        let dbData = JSON.parse(data);
        const initialLength = dbData.length;
        dbData = dbData.filter(note => note.id !== deleteNote);

        if (dbData.length < initialLength) {
            let stringData = JSON.stringify(dbData);

            fs.writeFile('./db/db.json', stringData, (err) => {
                if (err) throw err;
                res.send('Note deleted');
            });
        }
    });
});

    module.exports = router;