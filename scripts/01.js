#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');

const username = 'natas1';
const password = 'gtVrDuiDfck831PqWsLEZy5gyDz1clto';

url = `http://${username}.natas.labs.overthewire.org`;

axios.get(url, { auth: { username: username, password: password } }).then(res => {
    const $ = cheerio.load(res.data);
    const re = /The password for natas2 is (.\w+)/;
    let password = $.html().match(re)[1];
    console.log(`Password: ${password}`);
}
);
