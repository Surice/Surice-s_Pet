module.exports = async (client, msg, content) => {
    const Discord = require('discord.js');

    var errContent = String;

    var embed = new Discord.MessageEmbed()
        .setTitle("Kick")
        .setThumbnail(client.user.avatarURL())
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setFooter(content[1])
        .setTimestamp(new Date());


    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);
    if(member){
        const reason = content.slice(2).join(" ");

        embed.setThumbnail(member.user.avatarURL());
        embed.setFooter(member.id, client.user.avatarURL());

        if(member.kickable){
            await member.kick({reason: reason}).then(function(){
                embed.setColor(0x34ad4c)
                embed.setDescription(`Succesfully kicked <@${member.id}>`);

                msg.channel.send(embed);
            });
        }else{
            errContent = "you are not authorized to kick this person";
            error();
        }

    }else{
        errContent = "User not found";
        error();
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during kicking of ${content[1]}`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}