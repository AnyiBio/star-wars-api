"use strict";

const axios = require("axios");
const url = "https://swapi.co/api/people/";

async function getPeople(req, res, next) {
  const name = { ...req.body };
  try {
    function mostrarResultado(axiosResponse) {
      const item = axiosResponse.data;
      console.log(item);
      return item;
    }

    function mostrarError(err) {
      console.error(err);
    }

    axios
      .get(url)
      .then(mostrarResultado)
      .catch(mostrarError);
  } catch (e) {
    return res.status(404).send(e);
  }
}

module.exports = getPeople;
