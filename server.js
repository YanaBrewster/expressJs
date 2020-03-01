const express = require('express');
// Store the express top-level function in app
const app = express();

const path = require('path');

// Set API file
const apiData = require('./plant.json');

// Set port number
const port = 3000;

// When the request is successful and the response is finished then move onto the next function
app.use((req,res,next)=>{
console.log(`${req.method} request for ${req.url}`);
next();
})

// app.get('/', (req, res) => res.send('Hello World!'));

// Set paths to public folders
// This line of code is needed to connect to public files
app.use(express.static('public'));//all files from public folder must be included

// Get bootstrap files
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// Get jquery files
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// Get popperjs files
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));




// Set the root for index.html
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Set the root for about.html
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});

//Get access to API apiData
app.get('/plant', (req, res)=>{
  res.json(apiData);
});


// Display the port that the sever is listening from
app.listen(port, () => console.log(`This app is listening on ${port}`))
