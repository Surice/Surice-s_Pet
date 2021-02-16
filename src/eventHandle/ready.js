module.exports = (client) => {
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    console.log(`
        ---------------------------
        ${client.user.username} successfully logged in!
        ---------------------------
        `);

    client.user.setActivity(`for Prefix: ${config.prefix}`, {type: "WATCHING"});
}