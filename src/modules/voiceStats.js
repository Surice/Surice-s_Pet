module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const Discord = require('discord.js');

    const stats = JSON.parse(fs.readFileSync(`${__dirname}/../stor/onlineStats.json`, 'utf-8'));

    const guild = msg.guild.id;
    let embed = new Discord.MessageEmbed();

    if(msg.mentions.members.first()){
        let member = msg.mentions.members.first();

        embed
            .setTitle(`Voicechannel Stats of ${member.user.nickname}`)
            .setDescription("Displays the total time the user has spent in the voice channel")
            .setColor('0x7d0099')
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .addField("Time", sortTime(stats[guild][member.user.id][0]))
            .setFooter(client.user.tag, client.user.avatarURL())
            .setTimestamp(new Date());
    }else{
        embed
            .setTitle(`Voicechannel Stats of ${msg.guild.name}`)
            .setDescription("Displays the total time all users has spent in the voice channel")
            .setColor('0x7d0099')
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .setFooter(client.user.tag, client.user.avatarURL())
            .setTimestamp(new Date());
        for (element in stats[guild]){
            embed.addField(`<@${element}>`, sortTime(stats[guild][element][0]));
        }
    }

    msg.channel.send(embed);
}

function sortTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }