module.exports = async (client, msg, content) => {
    const fs = require('fs');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
}