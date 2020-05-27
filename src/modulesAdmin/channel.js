module.exports = async (client, msg, content) => {
    const fs = require("fs");

    let channels = JSON.parse(fs.readFileSync(`${__dirname}/../stor/channels.json`).toString());
    let users = JSON.parse(fs.readFileSync(`${__dirname}/../stor/users.json`).toString());

        if(content[2] && content[2].startsWith("<#")){
            var temp = content[2].substr(2).slice(0, -1);
            content[2] = temp;
        }
        if(content[1] == "add" && !channels.includes(content[2])){
            console.log(content[2]);
            channels.push(content[2]);;
            fs.writeFileSync('../stor/channels.json', JSON.stringify(channels));
            msg.channel.send("Successfully Added");
            console.log("New control channels: "+ channels);
        }
        else if(content[1] == "remove" && channels.includes(content[2])){
            console.log(content[2]);
            var index = channels.findIndex(element => element == content[2]);
            channels.splice(index, 1);; //remove index number of channel
            fs.writeFileSync(`${__dirname}/../stor/channels.json`, JSON.stringify(channels));
            msg.channel.send("Successfully Removed");
            console.log("New Channels: "+ channels);
        }else{
            var output = new Array();
            await channels.forEach(element => {
                output.push(`<#${element}>`);
            });
            msg.channel.send({embed: {
                title: "channel:",
                color: 0x0c9fb3,
                fields:[{name: "\u200b", value: output,},]}
            });
        }
}