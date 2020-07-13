module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const Discord = require('discord.js');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));
    let warns = JSON.parse(fs.readFileSync(`${__dirname}/../stor/warns.json`).toString());
    
    const server = msg.guild;

    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);

    if(member.id){
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
    
        if(msg.member.roles.highest.position > member.roles.highest.position || msg.author.id == msg.guild.owner.id){
            if(!warns[server]){
                warns[server] = new Object();
            }
            var wSer = warns[server];
            if(!(member.id in wSer)){
                wSer[member.id] = new Array();
            }
            await wSer[member.id].push(new Array(reason, msg.author.id, await createTimeSort(), await getIndex(wSer[member.id])));
                    
            fs.writeFileSync(`${__dirname}/../stor/warns.json`, JSON.stringify(warns));
                
            embed.addField("Reason", reason)
            embed.setColor(0x34ad4c)
            embed.setDescription(`Succesfully Warned <@${member.id}>`);

            msg.channel.send(embed);
            let dnot = require(`${__dirname}/../automatic/dmNotification.js`);
            dnot(client, "Warned at", member, msg.author, reason, msg.guild, null);
        }else{
            errContent = "You are unauthorized to warn this person";
            error();
        }
    }else{
        errContent = "User not found";
        error();
    }

    function getIndex(li){
        var response = li.length +1;
        return response;
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during Warning of <@${member.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}

async function createTimeSort(){
    var today = new Date();

    if(today.getMinutes() < 10){
        var min = "0"+today.getMinutes();
    }else{var min = today.getMinutes()};
    if(today.getHours() < 10){
        var hou = "0"+today.getHours();
    }else{var hou = today.getHours()};
    
    today = await `${hou}:${min} (${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()})`;

    return today;
}