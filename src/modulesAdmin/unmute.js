module.exports = async (client, msg, content) => {
    const fs = require('fs');

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

        if (mutes[server] && mutes[server].includes(muteMember.id)) {
            muteMember.roles.remove(role);
            var index = mutes[server].findIndex(e => e == muteMember.id);
            mutes[server].splice(index, 1); //remove index number of channel

            fs.writeFileSync(`${__dirname}/../stor/muteUsers.json`, JSON.stringify(mutes));
        }else{
            msg.channel.send("User not Muted");
        }
    }
}