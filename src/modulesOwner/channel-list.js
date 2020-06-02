module.exports = async (client, msg, content) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    //import the Channel Object from storage
    let channels = JSON.parse(fs.readFileSync(`${__dirname}/../stor/channels.json`).toString());

    const embed = new Discord.MessageEmbed()
        .setTitle("channel:")
        .setColor(0x5e9cff);

    await Object.keys(channels).forEach(function (content) {
        servChannel(content).then(value =>{
            embed.addField(content, value);
        });
    });

    msg.channel.send(embed)

    async function servChannel(server){
        var response = "\u200b";
        await channels[server].forEach(function (content){
            response = response+ `<#${content}> \n`;
        });

        return response;
    }
}