module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const Discord = require('discord.js');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));
    let warns = JSON.parse(fs.readFileSync(`${__dirname}/../stor/warns.json`).toString());
    
    const server = msg.guild;

    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);

    if(member){
        var reason = "no reason given";

        var embed = new Discord.MessageEmbed()
        .setTitle("Warn")
        .setThumbnail(member.user.avatarURL())
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setFooter(member.id, client.user.avatarURL())
        .setTimestamp(new Date());

        if(content[2]){
            var reason = content.slice(2, reason.length).join(' ');
        }
    

        if(!warns[server]){
            warns[server] = new Object();
        }
        var wSer = warns[server];
        if(!(member.id in wSer)){
            wSer[member.id] = new Array(reason, msg.author.id, new Date());
        }else{
            wSer[member.id].push(reason, msg.author.id, new Date());
        }
                
        fs.writeFileSync(`${__dirname}/../stor/warns.json`, JSON.stringify(warns));
            
        embed.addField("Reason", reason)
        embed.setColor(0x34ad4c)
        embed.setDescription(`Succesfully Warned <@${member.id}>`);

        msg.channel.send(embed);
    }else{
        errContent = "you are not authorized to ban this person";
        error();
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during Warning of <@${member.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}