"use strict";

require("dotenv").config();

const webServer = require("./webserver");

const port = process.env.PORT;

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
