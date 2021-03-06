module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const cron = require('cron');
    const Discord = require('discord.js');

    var errContent = String;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, 'utf-8'));
    let mutes = JSON.parse(fs.readFileSync(`${__dirname}/../stor/muteUsers.json`).toString());
    
    const server = msg.guild;
    let role = server.roles.cache.find(e => e.name == config.muteRoleName);


    if(role){
        let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);
        if(member.id){
            var reason = false;

            var embed = new Discord.MessageEmbed()
            .setTitle("Mute")
            .setThumbnail(member.user.avatarURL())
            .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
            .setFooter(member.id, client.user.avatarURL())
            .setTimestamp(new Date());


            if(msg.member.roles.highest.position > member.roles.highest.position || msg.author.id == msg.guild.owner.id){
                if(msg.member.id == member.id){
                    errContent = "You cannot mute yourself";
                    error(member);
                    return;
                }


                if(content[2]){
                    var time = false;
                    if(/^\d+$/.test(content[2].slice(0,-1))){
                        time = content[2].slice(0,-1);
                        if(content[3]){
                            reason = content;
                            reason = reason.slice(3, reason.length);
                            reason = reason.join(' ');
                            embed.addField("Reason", reason);
                        }
                    }else{
                        reason = content;
                        reason = reason.slice(2, reason.length);
                        reason = reason.join(' ');
                        embed.addField("Reason", reason);
                    }

                    if(time){
                        var s = cron.job(`*/${time} * * * * *`, function(){
                            s.stop();
                            let run = require(`${__dirname}/unmute.js`);
                            run(client, msg, content, placeholder, true);
                        });
                        var m = cron.job(`0 */${time} * * * *`, function(){
                            m.stop();
                            let run = require(`${__dirname}/unmute.js`);
                            run(client, msg, content, placeholder, true);
                        });
                        var h = cron.job(`0 0 */${time} * * *`, function(){
                            h.stop()
                            let run = require(`${__dirname}/unmute.js`);
                            run(client, msg, content, placeholder, true);
                        });
                        var d = cron.job(`0 0 0 */${time} * *`, function(){
                            d.stop();
                            let run = require(`${__dirname}/unmute.js`);
                            run(client, msg, content, placeholder, true);
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
            

                if(!mutes[server]){
                    mutes[server] = new Object();
                }
                if(!(content[1] in mutes[server])){
                    var mSer = mutes[server];

                    mSer[content[1]] = new Array();
                
                    await member.roles.cache.forEach(e => {
                        if(e.name != '@everyone'){
                            mSer[content[1]].push(e.id);
                            member.roles.remove(e);
                        }
                    });
                    fs.writeFileSync(`${__dirname}/../stor/muteUsers.json`, JSON.stringify(mutes));

                    member.roles.add(role);

                    embed.setColor(0x34ad4c)
                    embed.setDescription(`Succesfully Muted <@${member.id}>`);

                    msg.channel.send(embed);
                    let dnot = require(`${__dirname}/../automatic/dmNotification.js`);
                    dnot(client, "Muted at", member, msg.author, reason, msg.guild, dur);
                } else {
                    errContent = "already Muted";
                    error(member);
                }
            }else{
                errContent = "You are not authorized to mute this person";
                error();
            }
        }else{
            errContent = `User not found`;
            error();
        }
    }else{
        errContent = `please make sure your server has an ${config.muteRoleName} role.`;
        error();
    }


    function error (member){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during muting of <@${member.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}