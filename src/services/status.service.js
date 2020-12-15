const os = require('os');

const index = require(`${__dirname}/../index`);

async function collectData(){
    let data = {
        client: {
            uptime: Math.floor(index.client.uptime / 1000),
            createdAt: index.client.user.createdAt,
            name: index.client.user.tag,
            serverCount: index.client.guilds.cache.size
        },
        host: {
            hostname: os.hostname(),
            platform: os.platform()
        }
    }

    return data;
}

module.exports = { collectData }