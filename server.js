const express = require('express');
// Store the express top-level function in app
const app = express();

const path = require('path');

// Set API file
const apiData = require('./people.json');
const apiCarData = require('./cars.json');

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

// Get style.css files. '/' means go to the home index. __dirname is the current directory
app.use('/css', express.static(path.join(__dirname, 'public/css/style.css')));


// Set the root for index.html
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Set the root for about.html
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});

//Get access to API apiData
app.get('/people' , (req, res)=>{
  res.json(apiData);
});

// API parameters, getting them and looping them
// examples
// app.get('/gender/g=:gender',(req,res)=>{
//   const genderParam = req.params.gender; //retrieves the parameter value requested by the user
//   if ((genderParam === 'male') || (genderParam === 'female')){
//     let filteredArray = [];//array to push the matching objects to user's value
//     for (let i = 0; i < apiData.length; i++) {
//       if (genderParam === apiData[i].gender.toLowerCase()){
//         filteredArray.push(apiData[i]);
//       }
//     }
//     res.send(filteredArray);
//   } else {
//     res.send('Invalid parameter');
//   }
// });

app.get('/first_name/f=:first_name',(req,res)=>{
  const first_nameParam = req.params.first_name; //retrieves the parameter value requested by the user
  if ((first_nameParam === 'Abdul') || (first_nameParam === 'Sam')){
    let filteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < apiData.length; i++) {
      if (first_nameParam.toLowerCase() === apiData[i].first_name.toLowerCase()){
        filteredArray.push(apiData[i]);
      }
    }
    res.send(filteredArray);
  } else {
    res.send('Invalid parameter');
  }
});

// CAR DATA API

app.get('/cars' , (req, res)=>{
  res.json(apiCarData);
});

// app.get('/cars/make=:make&model=:model',(req,res)=>{
//   const makeParam = req.params.make;
//   const modelParam = req.params.model; //retrieves the parameter value requested by the user
//
//     let filteredArray = [];//array to push the matching objects to user's value
//     for (let i = 0; i < apiCarData.length; i++) {
//       if ((modelParam.toLowerCase() === apiCarData[i].car_model.toLowerCase()) && (makeParam.toLowerCase() === apiCarData[i].car_make.toLowerCase())){
//         filteredArray.push(apiCarData[i]);
//       }
//     }
//     res.send(filteredArray);
//   {
//     res.send('Invalid parameter');
//   }
// });

app.get('/cars/year=:year&colour=:colour',(req,res)=>{
  const yearParam = req.params.year;
  const colourParam = req.params.colour; //retrieves the parameter value requested by the user

    let filteredArray = [];//array to push the matching objects to user's value
    for (let a = 0; a < apiCarData.length; a++) {
      if ((yearParam === apiCarData[a].car_model_year) && (colourParam.toLowerCase() === apiCarData[a].car_colour.toLowerCase())){
        filteredArray.push(apiCarData[a]);
      }
    }
    res.send(filteredArray);
  {
    res.send('Invalid parameter');
  }
});


// Display the port that the sever is listening from
app.listen(port, () => console.log(`This app is listening on ${port}`))
