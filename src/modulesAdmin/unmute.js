module.exports = async (client, msg, content, placeholder,auto) => {
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
        var embed = new Discord.MessageEmbed();
        if(!auto){
            embed
            .setTitle("Unmute")
            .setThumbnail(muteMember.user.avatarURL())
            .setFooter(muteMember.id, client.user.avatarURL())
            .setTimestamp(new Date())
            .setAuthor(msg.author.tag, msg.author.avatarURL());
        }

        //check is user muted
        if(mutes[server] && muteMember.id in mutes[server]){
            if(msg.member.roles.highest.position > member.roles.highest.position){
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
                if(!auto){
                    embed.setColor(0x34ad4c);
                    embed.setDescription(`Succesfully Unmuted <@${muteMember.id}>`);
                }

                //send response embed if manually unmuted
                if(!auto){
                    msg.channel.send(embed);
                }

                //remove the user of muted index
                var mSer = mutes[server];
                await delete mSer[muteMember.id];

                //check if no muted users on server
                if(Object.keys(mutes[server]).length == 0){
                    delete mutes[server];
                }

                fs.writeFileSync(`${__dirname}/../stor/muteUsers.json`, JSON.stringify(mutes));
            }else{
                errContent = "You are not authorized to unmute this person";
                error();
            }
        }else{
            errContent = "User not Muted";
            error(muteMember);
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