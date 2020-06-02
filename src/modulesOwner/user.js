module.exports = async (client, msg, content) => {
    const fs = require("fs");

    var errContent = String;

    let users = JSON.parse(fs.readFileSync(`${__dirname}/../stor/users.json`).toString());

    var embed = new Discord.MessageEmbed()
        .setTitle("Muted")
        .setThumbnail(msg.guild.iconURL)
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setFooter(muteMember.id, client.user.avatarURL())
        .setTimestamp(new Date());

    if (content[2] && content[2].startsWith("<@!")) {
        var temp = content[2].substr(3).slice(0, -1);
        content[2] = temp;
    }
    if(content[1] == "add"){
        if(!users.includes(content[2])){
            users.push(content[2]);;
            fs.writeFileSync(`${__dirname}/stor/users.json`, JSON.stringify(users));
            embed.setColor(0x34ad4c)
            embed.setDescription(`Succesfully added <@${content[2]}> to Dev User´s`);
        }else{
            errContent = "already Added";
            error();
        }
    }
    else if (content[1] == "remove") {
        if(users.includes(content[2])){
            var index = users.findIndex(element => element == content[2]);

            users.splice(index, 1);; //remove index number of user
            fs.writeFileSync(`${__dirname}/../stor/users.json`, JSON.stringify(users));
            embed.setColor(0x34ad4c)
            embed.setDescription(`Succesfully removed <@${content[2]}> to Dev User´s`);
        }else{
            errContent = "User not Found";
            error();
        }
    }else{
        var output = new Array();
        await users.forEach(element => {
            output.push(`<@${element}>`);
        });
        msg.channel.send({
            embed: {
                title: "User:",
                color: 0x0c9fb3,
                fields: [{ name: "\u200b", value: output, },]
            }
        });
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during editing of <#${content[2]}> to the Bot-Channel´s`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    } 
}