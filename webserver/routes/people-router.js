"use strict";

const express = require("express");
const getPeople = require("../controller/get-people-controller");

const router = express.Router();

router.get("/people", getPeople);

module.exports = router;
