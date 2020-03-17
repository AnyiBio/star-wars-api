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
    const films = axiosResponsesFilms.map(item => {
      const rawFilms = item.data;
      const { title, release_date } = rawFilms;
      const filmsData = { title, release_date };
      return filmsData;
    });

    const homeworldData = axios.get(people.results[0].homeworld);

    const axiosResponsesPlanet = await Promise.all([homeworldData]);
    const planetName = axiosResponsesPlanet.map(item => {
      const rawPlanet = item.data;
      const { name } = rawPlanet;
      const planet = { planet_name: name };
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
      const vehicles = { fastest_vehicle_driven: name, max_atmosphering_speed };
      return vehicles;
    });

    const starshipData = [];
    people.results[0].starships.forEach(element => {
      starshipData.push(axios.get(element));
    });

    const axiosResponsesStarship = await Promise.all(starshipData);
    const starshipName = axiosResponsesStarship.map(item => {
      const rawStarship = item.data;
      const { name, max_atmosphering_speed } = rawStarship;
      const starships = {
        fastest_vehicle_driven: name,
        max_atmosphering_speed
      };
      return starships;
    });

    Array.prototype.push.apply(vehiclesName, starshipName);

    console.log(vehiclesName);

    const fastest_vehicle_driven = vehiclesName.sort(
      (a, b) => b.max_atmosphering_speed - a.max_atmosphering_speed
    )[0];

    const peopleFilm = Object.assign(
      peopleName[0],
      { films: films },
      planetName[0],
      {
        fastest_vehicle_driven: fastest_vehicle_driven.fastest_vehicle_driven
      }
    );

    console.log(peopleFilm);
    return res.status(200).send(peopleFilm);
  } catch (e) {
    console.error("Use the Force, the person's name does not exist");
    return res.status(404).send(e);
  }
}

module.exports = getPeople;
