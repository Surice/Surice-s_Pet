module.exports = (client, process, user, mod, reason, server, time) => {
    const Discord = require('discord.js');

    var embed = new Discord.MessageEmbed()
    .setTitle(process)
    .setThumbnail(server.iconURL())
    .setAuthor(mod.tag, mod.avatarURL())
    .setDescription(`you were ${process} from ${server.name}`)
    .addField("Reason:", reason)
    .setTimestamp(new Date());

    if(time){
        embed.addField("Duration:", time);
    }

    user.send(embed);
}