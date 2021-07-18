#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas5";
const password = "iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq";

const url = `http://${username}.natas.labs.overthewire.org/`;

axios
  .get(url, {
    auth: { username, password },
    withCredentials: true,
    headers: { Cookie: "loggedin=1" },
  })
  .then((response) => {
    const $ = cheerio.load(response.data);
    const re = /The password for natas6 is (.\w+)/;
    console.log($.html().match(re)[1]);
  })
  .catch(console.log);
