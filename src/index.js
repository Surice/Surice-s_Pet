const fs = require("fs");
const Discord = require('discord.js');

let client = new Discord.Client();
module.exports = { client };

const express = require('express');
const app = express();

const commonRouter = require(`${__dirname}/router/common`);
const surveyRouter = require(`${__dirname}/router/survey`);

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));


console.log("Loading...");
client.on('ready', () => {
    let run = require(`${__dirname}/eventHandle/ready`);
    run(client);
});

client.on('guildMemberAdd', member => {
    let run = require(`${__dirname}/eventHandle/guildMemberAdd`);
    run(client, member);
});
client.on('message', (msg) => {
    let run = require(`${__dirname}/eventHandle/message`);
    run(client, msg);
});
client.on('voiceStateUpdate', (oldState, newState) => {
    let run = require(`${__dirname}/eventHandle/voiceStateUpdate`);
    run(client, oldState, newState);
})

client.login(config.token);

app
    .use(express.json())
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requestet-With, Content-Type, Accept, Authorization");
        next();
    })

    .use('/', commonRouter)
    .use('/survey', surveyRouter)
;

app.listen(config.backend_port, () => {
    console.log(`express listen on port: ${config.backend_port} \n`);
});
