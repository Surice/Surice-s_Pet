module.exports = async (client, msg, content, placeholder,auto) => {
    const Discord = require('discord.js');
    const fs = require('fs');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
    
    const server = msg.guild;


    if(msg.member.hasPermission("BAN_MEMBERS")){
        let member = content[1];
        let user = await client.users.fetch(content[1]);

        //some response embed stuff
        var embed = new Discord.MessageEmbed();
        if(!auto){
            embed
            .setTitle("Unban")
            .setThumbnail(user.avatarURL())
            .setFooter(user.id, client.user.avatarURL())
            .setTimestamp(new Date())
            .setAuthor(msg.author.tag, msg.author.avatarURL());
        }

        //check is user Banned
        if(await server.fetchBan(member)){
            
            if(!auto){
                server.members.unban(member, {reason: null});
            }else{
                server.members.unban(Member, {reason: "Time is over"});
            }

            //send response embed if manually unmuted
            if(!auto){
                embed.setColor(0x34ad4c);
                embed.setDescription(`Succesfully Unmuted <@${member.id}>`);
                msg.channel.send(embed);
            }
        }else{
            errContent = "User not Banned";
            error(member);
        }
    }else{
        errContent = `please make sure your server has an Muted role.`;
        error();
    }

    function error (member){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during unmuting of <@${member.id}>`)
        embed.addField("Error", errContent);

        if(!auto){
            msg.channel.send(embed);
        }
    }
}