const express = require("express");
var {doSaveProfile, doSearchProfile, doUpdateProfile} = require("../controllers/userProfile")

const app = express.Router();

app.post("/new", doSaveProfile);

app.post("/search", doSearchProfile);

app.post("/update", doUpdateProfile);

module.exports = app;