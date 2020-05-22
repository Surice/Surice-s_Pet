module.exports = async (client, msg, content) => {
    const fs = require("fs");

    let users = JSON.parse(fs.readFileSync(`${__dirname}/../stor/users.json`).toString());

    if(users.includes(msg.author.id)){
        if(content[2] && content[2].startsWith("<@!")){
            var temp = content[2].substr(3).slice(0, -1);
            content[2] = temp;
        }
        if(content[1] == "add" && !users.includes(content[2])){
            users.push(content[2]);;
            fs.writeFileSync(`${__dirname}/stor/users.json`, JSON.stringify(users));
            msg.channel.send("Successfully Added");
            console.log("New Bot-Controler: "+ users);
        }
        else if(content[1] == "remove" && users.includes(content[2])){
            var index = users.findIndex(element => element == content[2]);

            users.splice(index, 1);; //remove index number of user
            fs.writeFileSync(`${__dirname}/../stor/users.json`, JSON.stringify(users));
            msg.channel.send("Successfully Removed");
            console.log("New Bot-Controler: "+ users);
        }else{
            var output = new Array();
            await users.forEach(element => {
                output.push(`<@${element}>`);
            });
            msg.channel.send({embed: {
                title: "User:",
                color: 0x0c9fb3,
                fields:[{name: "\u200b", value: output,},]}
            });
        }
    }else{
        msg.channel.send("you are not authorized to use admin commands");
    }
}