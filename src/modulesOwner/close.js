module.exports = async (client, msg, content, react, member, addRm) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    var global = require(`${__dirname}/../global.js`),
        members = JSON.parse(fs.readFileSync(`${__dirname}/../stor/closeMember.json`));
    
    if(content){
        if(content[1] == "start"){
            //634344148153008140
            const channel = client.channels.fetch("656581677262307338");

            msg.channel.send("❌Der Server wird geschlossen!❌ \n```wenn du weiterhin Mitglied des Servers sein möchtest Reagiere auf die Reaktion```").then(function(mes){
                mes.react('✋');
                global.closeMsg = mes.id;
            });
        }
        else if(content[1] == "add"){
            if(!members.includes(content[2])){
                members.push(content[2]);

                fs.writeFileSync(`${__dirname}/../stor/closeMember.json`, JSON.stringify(members));
            }
        }
        else if(content[1] == "rm"){
            if(members.includes(content[2])){
                var index = members.indexOf(content[2]);
                members.splice(index, 1);

                fs.writeFileSync(`${__dirname}/../stor/closeMember.json`, JSON.stringify(members));
            }
        }
        else if(content[1] == "show"){
            var embed = new Discord.MessageEmbed()
            .setTitle("Members")
            .setColor(0x75003d);

            members.forEach((e, i) => {
                embed.addField(i+1, `<@${e}>`);
            });

            msg.channel.send(embed);
        }
        else if(content[1] == "final"){
            //634336764911288331
            var guild = client.guilds.resolve('634336764911288331'),
                count = 0;
            guild.members.cache.forEach(e => {
                count ++;
            });
            var all = await guild.members.fetch();
            all.forEach(async (e, i) => {
                if(!members.includes(i)){
                    var mem = await guild.members.fetch(i);
                    if(mem.kickable){
                        mem.kick("Serverauflösung");
                    }
                }
            });
        }
    }
    else{
        if(react.message.id == global.closeMsg){
            if(react.emoji.name == '✋'){
                if(addRm == "add"){
                    if(!members.includes(member.id)){
                        members.push(member.id);

                        member.send(`you have been added to the list on LamaArmy`);

                        fs.writeFileSync(`${__dirname}/../stor/closeMember.json`, JSON.stringify(members));
                    }
                }
                else if(addRm == "rm"){
                    if(members.includes(member.id)){
                        var index = members.indexOf(member.id);
                        members.splice(index, 1);

                        fs.writeFileSync(`${__dirname}/../stor/closeMember.json`, JSON.stringify(members));
                    }
                }
            }else{
                react.remove();
            }
        }
    }
}