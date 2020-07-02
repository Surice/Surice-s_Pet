module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const cron = require('cron');
    const Discord = require('discord.js');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
    let mutes = JSON.parse(fs.readFileSync(`${__dirname}/../stor/muteUsers.json`).toString());
    
    const server = msg.guild;
    let role = server.roles.cache.find(e => e.name == config.muteRoleName);


    if(role){
        if (content[1] && content[1].startsWith("<@!")) {
            var temp = content[1].substr(3).slice(0, -1);
            content[1] = temp;
        }
        const muteMember = await server.members.fetch(content[1]);

        var embed = new Discord.MessageEmbed()
        .setTitle("Mute")
        .setThumbnail(muteMember.user.avatarURL())
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setFooter(muteMember.id, client.user.avatarURL())
        .setTimestamp(new Date());

        if(content[2]){
            var time = content[2].slice(0,-1);
            console.log(time);

            var s = cron.job(`*/${time} * * * * *`, function(){
                s.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content, true);
            });
            var m = cron.job(`0 */${time} * * * *`, function(){
                m.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content, true);
            });
            var h = cron.job(`0 0 */${time} * * *`, function(){
                h.stop()
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content, true);
            });
            var d = cron.job(`0 0 0 */${time} * *`, function(){
                d.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content, true);
            });

            if(content[2].endsWith("s")){
                embed.addField("Duration", `${time} Seconds`);
                s.start();
            }
            else if(content[2].endsWith("m")){
                embed.addField("Duration", `${time} Minutes`);
                m.start();
            }
            else if(content[2].endsWith("h")){
                embed.addField("Duration", `${time} Hours`);
                h.start();
            }
            else if(content[2].endsWith("d")){
                embed.addField("Duration", `${time} Days`);
                d.start();
            }
        }
        

        if (!mutes[server]) {
            mutes[server] = new Array();
        }

        if(!mutes[server].includes(content[1])){
            muteMember.roles.add(role);

            embed.setColor(0x34ad4c)
            embed.setDescription(`Succesfully Muted <@${muteMember.id}>`);

            msg.channel.send(embed);

            mutes[server].push(content[1]);

            fs.writeFileSync(`${__dirname}/../stor/muteUsers.json`, JSON.stringify(mutes));
        } else {
            errContent = "already Muted";
            error(muteMember);
        }

    }else{
        errContent = `please make sure your server has an Muted role.`;
        error();
    }


    function error (muteMember){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during muting of <@${muteMember.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}