"use strict";

require("dotenv").config();
const axios = require("axios");
const api = "https://swapi.co/api";

async function getPeople(req, res, next) {
  const name = { ...req.body };

  try {
    const axiosResponse = await axios.get(`${api}/people/?search=${name.name}`);

    const people = axiosResponse.data;

    const peopleName = people.results.map(item => {
      const rawPeople = item;
      const { name, birth_year, gender } = rawPeople;
      const peopleStarWars = {
        name,
        birth_year,
        gender
      };
      return peopleStarWars;
    });
    const filmsTitle = [];
    people.results[0].films.forEach(element => {
      filmsTitle.push(axios.get(element));
    });

    const axiosResponsesFilms = await Promise.all(filmsTitle);
    const filmsName = axiosResponsesFilms.map(item => {
      const rawFilms = item.data;
      const { title, release_date } = rawFilms;
      const films = { title, release_date };
      return films;
    });

    const homeworldData = axios.get(people.results[0].homeworld);

    const axiosResponsesPlanet = await Promise.all([homeworldData]);
    const planetName = axiosResponsesPlanet.map(item => {
      const rawPlanet = item.data;
      const { name } = rawPlanet;
      const planet = { name };
      return planet;
    });

    const vehicleData = [];
    people.results[0].vehicles.forEach(element => {
      vehicleData.push(axios.get(element));
    });

    const axiosResponsesVehicle = await Promise.all(vehicleData);
    const vehiclesName = axiosResponsesVehicle.map(item => {
      const rawVehicle = item.data;
      const { name, max_atmosphering_speed } = rawVehicle;
      const vehicles = { name, max_atmosphering_speed };
      return vehicles;
    });

    const fastest_vehicle_driven = vehiclesName.reduce(function(prev, curr) {
      return prev.max_atmosphering_speed > curr.max_atmosphering_speed
        ? prev
        : curr;
    });

    console.log(fastest_vehicle_driven);
    console.log(planetName);
    console.log(filmsName);
    console.log(peopleName);

    return res.status(200).send(peopleName);
  } catch (e) {
    console.error("Use the Force, the person's name does not exist");
    return res.status(404).send(e);
  }
}

module.exports = getPeople;
