#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');

const username = 'natas0';
const password = 'natas0';

url = `http://${username}.natas.labs.overthewire.org`;

axios.get(url, { auth: { username: username, password: password } }).then(res => {
    const $ = cheerio.load(res.data);
    const re = /The password for natas1 is (.\w+)/;
    let password = $.html().match(re)[1];
    console.log(`Password: ${password}`);
}
);
