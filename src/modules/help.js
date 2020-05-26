module.exports = (client, msg, content, permissions) =>{
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    console.log("help-Page triggered");

    msg.channel.send({embed:{
        title: "Commands",
        description: " ",
        color: 0xa8a80d,
        thumbnail:{
            url: client.user.avatarURL(),
        },fields:
        [{
            name: "Search",
            value: `description: returns an Information about the founded user \nSyntax: ${config.prefix}search <name>/<user id>`,
        },{
            name: "Meme",
            value: `description: sends an random Meme \nSyntax: ${config.prefix}meme`,
        },{
            name: "Lyric",
            value: `description: sends the Lyric´s of an speicified Song \nSyntax: ${config.prefix}lyric <song title>`, 
        }]
    }});

    if(permissions.includes("admin")){
        msg.channel.send({embed:{
            title: "Admin-Commands",
            description: " ",
            color: 0xc76f12,
            fields:[{
                name: "User",
                value: `description: add/remove a user as bot Admin \nSyntax: ${config.prefix}user add/remove <@username>`,
            },{
                name: "channel",
                value: `description: add/remove a channel as bot command channel \nSyntax: ${config.prefix}channel add/remove <#channel id>`,
            }]
        }});
    }
    if(permissions.includes("owner")){
        msg.channel.send({embed:{
            title: "Owner-Commands",
            description: " ",
            color: 0xc41212,
            fields:[{
                name: "Nick",
                value: `description: hold nickname of specific user on an value \nSyntax: ${config.prefix}nick setuser/setnick <user id>/nickname \nfor reset ${config.prefix}nick reset`,
            },{
                name: "Mitte",
                value: `description: let´s start flashing the "mitte" text channel \nSyntax: ${config.prefix}mitte stop(opt)`,
            },{
                name: "say",
                value: `description: the bot will say whatever you want and if you want as embed too \nSyntax: ${config.prefix}say <channelid> [embed(opt)] content`,
            },{
                name: "Test",
                value: `description: the test command. depending on what you're about to test. \nSyntax: ${config.prefix}test ...(undefined)`,
            }]
        }});
    }
}