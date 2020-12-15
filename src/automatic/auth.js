const fs = require('fs');

const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));
let users = JSON.parse(fs.readFileSync(`${__dirname}/../stor/users.json`, 'utf-8'));

//checks the access permission of the user
function authorized(msg){
    let response = new Array(),
        serverName = msg.guild.name;

    if(msg.author.id == config.owner || users.includes(msg.author.id)){
        response.push("owner", "admin", "everyone");
    }
    else if(msg.member.hasPermission('ADMINISTRATOR')){
        response.push("admin", "everyone");
    }
    else if(channels[serverName].includes(msg.channel.id)){
        response.push("everyone");
    }

    return response;
}


async function checkLoginPerms(data, client){
    let guild = await client.guilds.cache.get(data.guildId);

    let member = await guild.members.fetch(data.id);

    if(data.id == config.owner || users.includes(data.id)){
        return "owner";
    }
    else if(member.hasPermission('ADMINISTRATOR')){
        return "admin";
    }
    else{
        return false;
    }
}


module.exports = { authorized, checkLoginPerms }