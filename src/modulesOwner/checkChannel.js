module.exports = async (client, msg, content, placeholder, check, oldMember, newMember, react) => {
    const fs = require('fs');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,));
    var global = require(`${__dirname}/../global.js`);

    if(check){
        oldMember.member.send("du bist in der Warteschlange. Bitte hab einen moment gedult");
        console.log(oldMember.id);
        console.log(oldMember.member.id);
        console.log(oldMember.member.user.id);

        var me = await client.users.fetch(config.owner);
        me.send(`<@${oldMember.id}> wartet um gemovet zu werden!`).then(e =>{
            e.react('✅');
            e.react('❌');
        });
    }else if(content){
        if(content[1] == "target" || content[1] == "tar"){
            global.targetId = content[2];
        }else{
            global.channelId = content[1];
        }
    }else if(newMember && react){
        if(newMember.id == config.owner){
            var content = react.message.content.split(' ');
            console.log(react.message.content);
            var temp = content[0].substr(3).slice(0, -1);
            content[0] = temp;

            const chan = await client.channels.cache.get(global.targetId);
            const guild = chan.guild
            const member = await guild.members.fetch(content[0]);

            if(react.emoji.name == '✅'){                
                member.voice.setChannel(chan);
            }else if(react.emoji.name == '❌'){
                member.voice.kick();

                chan.createOverwrite(member, {
                    'CONNECT_CHANNEL': false
                })
            }
            react.message.delete();
        }
    }
}