module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const cron = require('cron');

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
        var time = content[2].slice(0,-1);
        if(content[2]){
            var s = cron.job(`*/${time} * * * * *`, function(){
                s.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content);
            });
            var m = cron.job(`0 */${time} * * * *`, function(){
                m.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content);
            });
            var h = cron.job(`0 0 */${time} * * *`, function(){
                h.stop()
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content);
            });
            var d = cron.job(`0 0 0 */${time} * *`, function(){
                d.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content);
            });
            var w = cron.job(`0 0 0 0 */${time} *`, function(){
                w.stop();
                let run = require(`${__dirname}/unmute`);
                run(client, msg, content);
            });

            if(content[2].endsWith("s")){
                s.start();
            }
            else if(content[2].endsWith("m")){
                m.start();
            }
            else if(content[2].endsWith("h")){
                h.start();
            }
            else if(content[2].endsWith("d")){
                d.start();
            }
            else if(content[2].endsWith("w")){
                w.start();
            }
        }
        muteMember.roles.add(role);

        if (!mutes[server]) {
            mutes[server] = new Array();
        }

        if(!mutes[server].includes(content[1])){
            mutes[server].push(content[1]);

            fs.writeFileSync(`${__dirname}/../stor/muteUsers.json`, JSON.stringify(mutes));
        } else {
            msg.channel.send("already Muted");
        }

    }else{
        msg.channel.send(`please make sure your server has an Muted role.`);
    }
}