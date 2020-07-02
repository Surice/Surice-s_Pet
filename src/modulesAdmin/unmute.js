module.exports = async (client, msg, content, auto) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
    let mutes = JSON.parse(fs.readFileSync(`${__dirname}/../stor/muteUsers.json`).toString());
    
    const server = msg.guild;
    let role = server.roles.cache.find(e => e.name == config.muteRoleName);

    //check if muted role exists
    if(role){
        //convert if mention into clean id
        if (content[1] && content[1].startsWith("<@!")) {
            var temp = content[1].substr(3).slice(0, -1);
            content[1] = temp;
        }
        //fetch mute User
        const muteMember = await server.members.fetch(content[1]);

        //some response embed stuff
        if(!auto){
            var embed = new Discord.MessageEmbed()
            .setTitle("Unmute")
            .setThumbnail(muteMember.user.avatarURL())
            .setFooter(muteMember.id, client.user.avatarURL())
            .setTimestamp(new Date())
            .setAuthor(msg.author.tag, msg.author.avatarURL());
        }

        //check is user muted
        if(mutes[server] && muteMember.id in mutes[server]){
            //removes "muted" role
            muteMember.roles.remove(role);
            
            //set all roles of user
            var mSer = mutes[server];
            await mSer[muteMember.id].forEach(async (e, i) =>{
                var arole = await server.roles.fetch(e);
                mSer[muteMember.id].splice(0, i);
                muteMember.roles.add(arole);
            });

            //set some response values
            embed.setColor(0x34ad4c);
            if(!auto){
                embed.setDescription(`Succesfully Unmuted <@${muteMember.id}>`);
            }

            //send response embed if manually unmuted
            if(!auto){
                msg.channel.send(embed);
            }

            //remove the user of muted index
            var mSer = mutes[server];
            delete mSer[muteMember.id];

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