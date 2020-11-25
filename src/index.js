const fs = require("fs");
const Discord = require('discord.js');

const express = require('express');
const app = express();

const commonRouter = require(`${__dirname}/router/common`);
const surveyRouter = require(`${__dirname}/router/survey`);

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));

let global = require(`${__dirname}/global`);


let client = new Discord.Client();

console.log("Loading...");
client.on('ready', () => {
    global.startedAt = Date.now();

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


function getClientInfos(){
    let res = {
        name: client.user.tag,
        ceatedAt: client.user.createdAt,
        serverCount: client.guilds.cache.size,
        uptime: client.uptime
    }

    return res;
}

exports.index = { getClientInfos };