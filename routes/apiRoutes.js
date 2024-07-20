const router = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

// Handle Get of existing notes, to populate on page
router.get('/notes', function(req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      res.send(dbData);
    });
  });

  // Handle the Post of new notes when user clicks save
router.post('/notes', function(req, res) {
    const newNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbData = JSON.parse(data);
      dbData.push(newNotes);
      dbData.forEach((note, index) => {
        note.id = uuid();
        return dbData;
      });
      console.log(dbData);

      stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send('Note Added');
  });
  
module.exports = router;