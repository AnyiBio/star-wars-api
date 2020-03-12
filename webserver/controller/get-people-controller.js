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
      const {
        name,
        birth_year,
        gender,
        homeworld,
        vehicles,
        films
      } = rawPeople;
      const peopleStarWars = {
        name,
        birth_year,
        gender,
        homeworld,
        vehicles,
        films
      };
      return peopleStarWars;
    });

    console.log(peopleName);
    return res.status(200).send(peopleName);
  } catch (e) {
    console.error("Use the Force, the person's name does not exist");
    return res.status(404).send(e);
  }
}

module.exports = getPeople;
