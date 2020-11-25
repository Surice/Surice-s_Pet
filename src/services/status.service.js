const fs = require('fs');
const os = require('os');

const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));

const indexFile = require(`${__dirname}/../index`);

let global = require(`${__dirname}/../global`);

async function collectData(){
    let clientData = indexFile.index.getClientInfos();

    let data = {
        client: {
            uptime: Math.floor(clientData.uptime / 1000),
            createdAt: clientData.createdAt,
            name: clientData.name,
            serverCount: clientData.serverCount
        },
        host: {
            hostname: os.hostname(),
            platform: os.platform()
        }
    }

    return data;
}

module.exports = { collectData }