// Import necessary libraries
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //static files

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });


  // API Routes
  // app.get('/api/notes', (req, res) => {
  //   fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).json({ message: 'Error reading notes file' });
  //     }
  //     res.json(JSON.parse(data));
  //   });
  // });
  
  app.post('/api/notes', (req, res) => {
    // Destructure the request body to get title and text
    const { title, text } = req.body;
  
    // Check if title and text are provided
    if (!title || !text) {
      return res.status(400).json({ message: 'Note title and text are required.' });
    }
  
    // Create a new note object
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
  
    // Read the existing notes, add the new note, and write back to db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
        res.json(newNote);
      });
    });
  });
  

  // Bonus: DELETE route
// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     let notes = JSON.parse(data);
//     notes = notes.filter(note => note.id !== noteId);
//     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
//       if (err) throw err;
//       res.json({ message: 'Note deleted' });
//     });
//   });
// });


  // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });