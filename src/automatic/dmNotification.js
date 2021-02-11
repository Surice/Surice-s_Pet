module.exports = (client, process, user, mod, reason, server, time) => {
    const Discord = require('discord.js');

    var embed = new Discord.MessageEmbed()
    .setTitle(`${process} ${server.name}`)
    .setThumbnail(server.iconURL())
    .setColor('0xc22a1f')
    .setAuthor(mod.tag, mod.avatarURL())
    .addField("Reason:", reason)
    .addField("Enforced by:", `<@${mod.id}>`)
    .setTimestamp(new Date());

    if(time){
        embed.addField("Duration:", time);
    }

    user.send(embed);
}