module.exports = async (client, msg, content) => {
    const Discord = require('discord.js');
    const cron = require('cron');
    const fs = require('fs');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));

    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);

    if(member.id){
        if(member.bannable){
            var reason = false;

            var embed = new Discord.MessageEmbed()
            .setTitle("Ban")
            .setThumbnail(member.user.avatarURL())
            .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
            .setFooter(member.id, client.user.avatarURL())
            .setTimestamp(new Date());

            if(content[2]){
                var time = false;
                if(/^\d+$/.test(content[2].slice(0,-1))){
                    time = content[2].slice(0,-1);
                    if(content[3]){
                        reason = content.slice(3, reason.length);
                        reason = reason.join(' ');
                        embed.addField("Reason", reason);
                    }
                }else{
                    reason = content.slice(2, reason.length);
                    reason = reason.join(' ');
                    embed.addField("Reason", reason);
                }

                if(time){
                    var s = cron.job(`*/${time} * * * * *`, function(){
                        s.stop();
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, placeholder, true);
                    });
                    var m = cron.job(`0 */${time} * * * *`, function(){
                        m.stop();
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, placeholder, true);
                    });
                    var h = cron.job(`0 0 */${time} * * *`, function(){
                        h.stop()
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, placeholder, true);
                    });
                    var d = cron.job(`0 0 0 */${time} * *`, function(){
                        d.stop();
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, placeholder, true);
                    });
                }

                if(content[2].endsWith("s") && time){
                    embed.addField("Duration", `${time} Seconds`);
                    s.start();
                }
                else if(content[2].endsWith("m") && time){
                    embed.addField("Duration", `${time} Minutes`);
                    m.start();
                }
                else if(content[2].endsWith("h") && time){
                    embed.addField("Duration", `${time} Hours`);
                    h.start();
                }
                else if(content[2].endsWith("d") && time){
                    embed.addField("Duration", `${time} Days`);
                    d.start();
                }
            }

            await member.ban({reason: reason}).then(function(){
                embed.setColor(0x34ad4c)
                embed.setDescription(`Succesfully banned <@${member.id}>`);

                msg.channel.send(embed);
            });
        }else{
            errContent = "you are not authorized to ban this person";
            error();
        }
    }else{
        errContent = "User not found";
        error();
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during banning of <@${member.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}