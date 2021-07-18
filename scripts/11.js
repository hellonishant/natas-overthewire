#!/usr/bin/env node
const axios = require("axios");
const cheerio = require("cheerio");

const username = "natas11";
const password = "U82q5TCMMQ9xuFoI3dYX61s7OZD9JKoK";
const url = `http://natas11.natas.labs.overthewire.org/`;

const options = {
  auth: {
    username,
    password,
  },
};

(async () => {
  const response = await axios.get(url, options);

  const cookie = decodeURIComponent(
    response.headers["set-cookie"][0].split("=")[1]
  );
  const cypherText = new Buffer.from(cookie, "base64").toString("utf8");
  const data = JSON.stringify({ showpassword: "no", bgcolor: "#ffffff" });

  // xor_encrypt function
  const xor_encrypt = (s, key) => {
    let result = "";
    for (let i = 0; i < s.length; i++) {
      result += String.fromCharCode(
        s.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  };
  // decrypting
  let key = xor_encrypt(data, cypherText);
  key = "qw8J";

  const customData = JSON.stringify({
    showpassword: "yes",
    bgcolor: "#ffffff",
  });

  const newCookie = new Buffer.from(xor_encrypt(customData, key)).toString(
    "base64"
  );

  options.headers = { Cookie: `data=${newCookie}` };
  options.withCredentials = true;

  const newResponse = await axios.get(url, options);
  const $ = cheerio.load(newResponse.data);
  const re = /natas12 is (\w+)/;
  console.log($.html().match(re)[1]);
})();
