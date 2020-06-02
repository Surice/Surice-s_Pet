module.exports = async (client, msg, content) => {
    const fs = require("fs");

    //import the Channel Object from storage
    let channels = JSON.parse(fs.readFileSync(`${__dirname}/../stor/channels.json`).toString());

    //check if channel tagged an convert into chhannel id
    if (content[2] && content[2].startsWith("<#")) {
        var temp = content[2].substr(2).slice(0, -1);
        content[2] = temp;
    }

    const server = msg.guild.name;
    //check if user want to add an new channel to storage
    if (content[1] == "add") {
        if (!channels[server]) {
            channels[server] = new Array();
        }

        if (!channels[server].includes(content[2])) {
            channels[server].push(content[2]);

            fs.writeFileSync(`${__dirname}/../stor/channels.json`, JSON.stringify(channels));
            msg.channel.send("Successfully Added");
            console.log("New control channels: " + channels);
        } else {
            msg.channel.send("already added");
        }
    }

    //check if user want to remove an channel from storage
    else if (content[1] == "remove") {
        if (channels[server] && channels[server].includes(content[2])) {
            var index = channels[server].findIndex(element => element == content[2]);
            channels[server].splice(index, 1);; //remove index number of channel

            fs.writeFileSync(`${__dirname}/../stor/channels.json`, JSON.stringify(channels));
            msg.channel.send("Successfully Removed");
            console.log("New Channels: " + channels);
        }else{
            msg.channel.send("channel not found");
        }
    }

    //send a list with all channels
    else {
        var output = new Array();
        await channels[server].forEach(element => {
            output.push(`<#${element}>`);
        });
        msg.channel.send({
            embed: {
                title: "channel:",
                color: 0x0c9fb3,
                fields: [{ name: "\u200b", value: output, },]
            }
        });
    }
}