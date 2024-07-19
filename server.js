// Import necessary libraries
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });