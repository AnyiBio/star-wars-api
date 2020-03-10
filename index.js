"use strict";

// const axios = require("axios");
//
require("dotenv").config();
const webServer = require("./app/webserver");

const port = process.env.PORT;
const url = process.env.API_STARWARS;

async function initApp() {
  try {
    await webServer.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

initApp();
