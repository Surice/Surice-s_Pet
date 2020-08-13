module.exports = async (client, msg, content, placeholder,check, oldMember, newMember) => {
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,));

    if(check){
        oldMember.member.send("du bist in der Warteschlange. Bitte hab einen moment gedult");
        var me = await client.users.fetch(config.owner);
        me.send(`<@${oldMember.member.id}> wartet um gemovet zu werden!`);
    }else{
        var global = require(`${__dirname}/../global.js`);

        global.channelId = content[1];
    }
}