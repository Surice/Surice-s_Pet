module.exports = async (client, msg, content) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    var errContent = String,
        channel

    //import the Channel Object from storage
    let channels = JSON.parse(fs.readFileSync(`${__dirname}/../stor/channels.json`).toString());

    //check if channel tagged an convert into chhannel id
    if (content[2] && content[2].startsWith("<#")) {
        var temp = content[2].substr(2).slice(0, -1);
        content[2] = temp;
    }
    try{
        channel = await client.channels.fetch(content[2]).id;
    }catch(e){
        channel = "Unknown";
    }

    var embed = new Discord.MessageEmbed()
        .setTitle("Channel")
        .setThumbnail(msg.guild.iconURL)
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setFooter(channel, client.user.avatarURL())
        .setTimestamp(new Date());


    const server = msg.guild.name;
    //check if user want to add an new channel to storage
    if (content[1] == "add") {
        if (!channels[server]) {
            channels[server] = new Array();
        }

        if (!channels[server].includes(content[2])) {
            channels[server].push(content[2]);

            fs.writeFileSync(`${__dirname}/../stor/channels.json`, JSON.stringify(channels));
            embed.setColor(0x34ad4c)
            embed.setDescription(`Succesfully added <#${content[2]}> to Bot-Channel´s`);
            msg.channel.send(`Successfully Added ${content[2]}`);
        } else {
            errContent = "already added";
            error();
        }
    }

    //check if user want to remove an channel from storage
    else if (content[1] == "remove") {
        if (channels[server] && channels[server].includes(content[2])) {
            var index = channels[server].findIndex(element => element == content[2]);
            channels[server].splice(index, 1);; //remove index number of channel

            fs.writeFileSync(`${__dirname}/../stor/channels.json`, JSON.stringify(channels));
            msg.channel.send(`Successfully Removed ${content[2]}`);
        }else{
            errContent = "channel not found";
            error();
        }
    }

    //send a list with all channels
    else {
        var output = new Array();

        await channels[server].forEach(e => {
            output.push(`<#${e}>`);
        });
        msg.channel.send({
            embed: {
                title: "channel:",
                color: 0x0c9fb3,
                fields: [{ name: "\u200b", value: output, },]
            }
        });
    }

    function error (){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during editing of <#${content[2]}> to the Bot-Channel´s`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    } 
}