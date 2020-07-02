const mute = require('./mute');

module.exports = async (client, msg, content, auto) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
    let mutes = JSON.parse(fs.readFileSync(`${__dirname}/../stor/muteUsers.json`).toString());
    
    const server = msg.guild;
    let role = server.roles.cache.find(e => e.name == config.muteRoleName);


    if(role){
        console.log(content[1]);
        if (content[1] && content[1].startsWith("<@!")) {
            var temp = content[1].substr(3).slice(0, -1);
            content[1] = temp;
        }
        const muteMember = await server.members.fetch(content[1]);

        var embed = new Discord.MessageEmbed()
        .setTitle("Unmute")
        .setThumbnail(muteMember.user.avatarURL())
        .setFooter(muteMember.id, client.user.avatarURL())
        .setTimestamp(new Date());

        if(!auto){
            embed.setAuthor(msg.author.tag, msg.author.avatarURL());
        }else{
            embed.setAuthor(client.user.tag, client.user.avatarURL());
        }

        if (mutes[server] && mutes[server].includes(muteMember.id)) {
            muteMember.roles.remove(role);

            embed.setColor(0x34ad4c);
            if(!auto){
                embed.setDescription(`Succesfully Unmuted <@${muteMember.id}>`);
            }else{
                embed.setDescription(`Successfully auto Unmuted <@${muteMember.id}>`);
            }

            if(!auto){
                msg.channel.send(embed);
            }

            var index = mutes[server].findIndex(e => e == muteMember.id);
            mutes[server].splice(index, 1); //remove index number of channel

            fs.writeFileSync(`${__dirname}/../stor/muteUsers.json`, JSON.stringify(mutes));
        }else{
            errContent = "User not Muted";
            error();
        }
    }else{
        errContent = `please make sure your server has an Muted role.`;
        error();
    }

    function error (muteMember){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during unmuting of <@${muteMember.id}>`)
        embed.addField("Error", errContent);

        if(!auto){
            msg.channel.send(embed);
        }
    }
}