module.exports = (client, member) => {
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
    let mutes = JSON.parse(fs.readFileSync(`${__dirname}/../stor/muteUsers.json`).toString());

    const server = member.guild;

    if(mutes[server] && mutes[server].includes(member.id)){
        let role = server.roles.cache.find(e => e.name == config.muteRoleName);
        member.roles.add(role);
    }
}