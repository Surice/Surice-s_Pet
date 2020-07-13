module.exports = async (client, msg, content) => {
    const Discord = require('discord.js');
    const cron = require('cron');
    const fs = require('fs');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));

    let user = msg.mentions.users.first() || await client.users.fetch(content[1]);

    if(user){
        if(await checkAuth(user)){
            var reason = false;

            var embed = new Discord.MessageEmbed()
            .setTitle("Ban")
            .setThumbnail(user.avatarURL())
            .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
            .setFooter(user.id, client.user.avatarURL())
            .setTimestamp(new Date());

            if(content[2]){
                var time = false,
                    dur = false;

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
                        run(client, msg, content, "placeholder", true);
                    });
                    var m = cron.job(`0 */${time} * * * *`, function(){
                        m.stop();
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, "placeholder", true);
                    });
                    var h = cron.job(`0 0 */${time} * * *`, function(){
                        h.stop()
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, "placeholder", true);
                    });
                        var d = cron.job(`0 0 0 */${time} * *`, function(){
                        d.stop();
                        let run = require(`${__dirname}/unban.js`);
                        run(client, msg, content, "placeholder", true);
                    });
                }

                if(content[2].endsWith("s") && time){
                    embed.addField("Duration", `${time} Seconds`);
                    dur = `${time} Seconds`
                    s.start();
                }
                else if(content[2].endsWith("m") && time){
                    embed.addField("Duration", `${time} Minutes`);
                    dur = `${time} Minutes`
                    m.start();
                }
                else if(content[2].endsWith("h") && time){
                    embed.addField("Duration", `${time} Hours`);
                    dur = `${time} Hours`
                    h.start();
                }
                else if(content[2].endsWith("d") && time){
                    embed.addField("Duration", `${time} Days`);
                    dur = `${time} Days`
                    d.start();
                }
            }

           await msg.guild.members.ban(user.id, {reason: reason}).then(function(){
                embed.setColor('0x34ad4c')
                embed.setDescription(`Succesfully banned <@${user.id}>`);

                msg.channel.send(embed);
                let dnot = require(`${__dirname}/../automatic/dmNotification.js`);
                dnot(client, "banned from", user, msg.author, reason, msg.guild, dur);
            });
        }else{
            errContent = "you are not authorized to ban this person";
            error();
        }
    }else{
        errContent = "User not found";
        error();
    }

    async function checkAuth(user){
        var res = false;

        try{
            let member = await msg.guild.members.fetch(user.id);
            if(msg.author.roles.highest.position > member.roles.highest.position || msg.author.id == msg.guild.owner.id){
                res = true;
            }
        }catch{
            res = true;
        }

        return res;
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during banning of <@${user.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}