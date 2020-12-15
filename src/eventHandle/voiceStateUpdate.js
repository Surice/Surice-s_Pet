module.exports = (client, oldState, newState) => {
    const fs = require('fs');

    let stats = JSON.parse(fs.readFileSync(`${__dirname}/../stor/onlineStats.json`, 'utf-8'));

    if(oldState.channel && newState.channel) return;

    if(!oldState.channel && newState.channel){
        if(!stats[newState.guild.id]){
            stats[newState.guild.id] = new Object();
        }
        if(!stats[newState.guild.id][newState.member.id]){
            stats[newState.guild.id][newState.member.id] = new Array(0);
        }

        stats[newState.guild.id][newState.member.id][1] = Date.now();

        fs.writeFileSync(`${__dirname}/../stor/onlineStats.json`, JSON.stringify(stats));
    }
    else if(oldState.channel && !newState.channel){
        stats[newState.guild.id][newState.member.id][0] += Date.now() - stats[newState.guild.id][newState.member.id][1];

        fs.writeFileSync(`${__dirname}/../stor/onlineStats.json`, JSON.stringify(stats));
    }
}