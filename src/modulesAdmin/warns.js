module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const Discord = require('discord.js');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));
    let warns = JSON.parse(fs.readFileSync(`${__dirname}/../stor/warns.json`).toString());

    const server = msg.guild;
    var wSer = warns[server];

    if(content[1] == "rm"){
        let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[2]);
        let role = server.roles.cache.find(e => e.name == config.warnRoleName);

        if(member.id){
            var embed = new Discord.MessageEmbed()
            .setTitle("Remove Warn")
            .setThumbnail(member.user.avatarURL())
            .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
            .setFooter(member.id, client.user.avatarURL())
            .setTimestamp(new Date());
            if(msg.member.roles.highest.position > member.roles.highest.position || msg.author.id == msg.guild.owner.id){
                if(wSer[member.id]){
                    if(content[3] == "all"){
                        await delete wSer[member.id];
                    }else{
                        const num = content[3];

                        wSer[member.id].splice((num-1), 1);
                    }

                    if(wSer[member.id] && wSer[member.id].length == 0){
                        delete wSer[member.id];

                        if(member.roles.cache.has(role.id)){
                            member.roles.remove(role);
                        }
                    }

                    if(Object.keys(warns[server]).length == 0){
                        delete warns[server];
                    }
                    fs.writeFileSync(`${__dirname}/../stor/warns.json`, JSON.stringify(warns));
                }else{
                    errContent = "User not warned";
                    error();
                }
            }else{
                errContent = "You are not authorized to delete warns from this person";
                error();
            }
        }else{
            errContent = "User not found";
            error();
        }
    }else{
        let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);

        var embed = new Discord.MessageEmbed()
        .setTitle("Warns")
        .setThumbnail(server.iconURL())
        .setFooter(msg.author.id, client.user.avatarURL())
        .setColor(0x0c9fb3)
        .setTimestamp(new Date());

        if(member.id){
            const ar = wSer[member.id];

            embed.setDescription(`Warns from <@${member.id}>`)
                .setThumbnail(member.user.avatarURL());

            await ar.forEach((e)=>{
                embed.addFields({
                    name: '\u200B', value: '\u200B'
                },{
                    name: "From:", value: e[2]
                },{
                    name: "Reason", value: e[0], inline: true
                },{
                    name: "Enforced by", value: `<@${e[1]}>`, inline: true
                },{
                    name: "Index: ", value: e[3], inline: true
                });
            });
        }else{
            var out = '';
            for(i in warns[server]){
                out = out + `<@${i}> **${wSer[i].length}** \n`;
            }
            if(out == ''){
                out = "no warnings exist";
            }
            embed.addFields({name: `Warnings on ${server.name}`, value: out});
        }
        msg.channel.send(embed);
    }

    function checkWarnCount(){

    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during remove Warn of ${content[2]}`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}