'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const { response } = require('express');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('hello Hexx!');
});

app.get('/weather', (req, res) => {
  let searchQuery = req.query.searchedForCity;
  let lat = req.query.searchedCityLat;
  let lon = req.query.searchedCityLon;

  const cityICareAbout = weather.find(
    city => city.city_name.toLowerCase() === searchQuery.toLowerCase()
  );

  // Using each data point from the static data of the city that the user searched, create an array of `Forecast` objects, one for each day

  try {
    const forcastArr = cityICareAbout.data.map(day => new Forcast(day));
    res.send(forcastArr);
  } catch (error) {
    console.log(error);
  }
});

function Forcast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;
}

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
