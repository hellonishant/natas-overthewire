#!/usr/bin/env node
const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas8";
const password = "DBfUBfqQG69KvJvJ1iAbMoIpwSNQ9bWe";

const url = `http://${username}.natas.labs.overthewire.org/`;

const encodedSecret = "3d3d516343746d4d6d6c315669563362";

function hex2bin(hex) {
  let result = "";
  for (let i = 0; i < hex.length; i += 2) {
    result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return result;
}

function strReverse(str) {
  return str.split("").reverse().join("");
}

// implement a base64 decoder
function decode64(input) {
  return new Buffer.from(input, "base64").toString("utf8");
}

const secret = decode64(strReverse(hex2bin(encodedSecret)));

// const data = `secret=${encodeURIComponent(secret)}&submit=Submit`;
const data = {
  secret: secret,
  submit: "Submit",
};

const urlEncodedData = Object.keys(data)
  .map((key) => `${key}=${encodeURIComponent(data[key])}`)
  .join("&");

(async () => {
  const response = await axios.post(url, urlEncodedData, {
    auth: {
      username,
      password,
    },
  });
  const $ = cheerio.load(response.data);
  const re = /The password for natas9 is (.\w+)/;
  console.log($.html().match(re)[1]);
})();
