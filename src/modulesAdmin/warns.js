module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const Discord = require('discord.js');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));
    let warns = JSON.parse(fs.readFileSync(`${__dirname}/../stor/warns.json`).toString());

    const server = msg.guild;

    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);

    var embed = new Discord.MessageEmbed()
    .setTitle("Warns")
    .setThumbnail(server.iconURL())
    .setFooter(msg.author.id, client.user.avatarURL())
    .setColor(0x0c9fb3)
    .setTimestamp(new Date());

    var wSer = warns[server];
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
            });
        });
    }else{
        for(i in warns[server]){
            embed.addFields({name: '\u200B', value: '\u200B'},{name: "-------------", value: `<@${i}>`});

            await wSer[i].forEach((e)=>{
                embed.addFields({
                    name: "From:", value: e[2]
                },{
                    name: "Reason", value: e[0], inline: true
                },{
                    name: "Enforced by", value: `<@${e[1]}>`, inline: true
                });
            });
        }
    }
    msg.channel.send(embed);


    
}