const fs = require("fs");

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));

var nick = config.selfid,
    unick = null,
    channelId = 510370517824438282,
    closeMsg = null;

module.exports = {
    nick, unick, channelId, closeMsg
}