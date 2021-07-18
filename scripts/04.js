#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas4";
const password = "Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ";

const url = `http://${username}.natas.labs.overthewire.org`;

axios
  .get(url, {
    auth: { username, password },
    headers: { referer: "http://natas5.natas.labs.overthewire.org/" },
  })
  .then((response) => {
    const $ = cheerio.load(response.data);
    const re = /The password for natas5 is (.\w+)/;
    console.log($.html().match(re)[1]);
  });
