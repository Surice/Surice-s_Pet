module.exports = (client, msg, content, permissions) =>{
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    console.log("help-Page triggered");

    msg.channel.send({embed:{
        title: "Commands",
        description: "<requried Field> (Optional Field)",
        color: 0xa8a80d,
        thumbnail:{
            url: client.user.avatarURL(),
        },fields:
        [{
            name: "Search",
            value: `description: returns an Information about the founded user \nSyntax: ${config.prefix}search <@user>/<user name>/<user id>`,
        },{
            name: "Meme",
            value: `description: sends an random Meme \nSyntax: ${config.prefix}meme`,
        },{
            name: "Lyric",
            value: `description: sends the Lyric´s of an speicified Song \nSyntax: ${config.prefix}lyric <song title>`, 
        },{
            name: "Dog",
            value: `description: sends an Random Dog Picture \nSyntax: ${config.prefix}dog`,
        },{
            name: "Cat",
            value: `description: sends an Random Cat Picture \nSyntax: ${config.prefix}cat`,
        }]
    }});

    if(permissions.includes("admin")){
        msg.channel.send({embed:{
            title: "Admin-Commands",
            description: " ",
            color: 0xc76f12,
            fields:[{
                name: "Kick",
                value: `description: kick´s an Player from current Server \nSyntax: ${config.prefix}kick <@user>/<user id> (reason)`,
            },{
                name: "Ban",
                value: `description: Ban´s an Player from current Server \nSyntax: ${config.prefix}ban <@user>/<user id> (duration[s, m,h,d]) (reason)`,
            },{
                name: "Unban",
                value: `description: Unban´s an Player from current Server \nSyntax: ${config.prefix}unban <@user>/<user id>`,
            },{
                name: "Mute",
                value: `description: Add the Muted role to an Player \nSyntax: ${config.prefix}mute <@user>/<user id> (duration[s, m,h,d]) (reason)`,
            },{
                name: "Unmute",
                value: `description: Remove the Muted role to an Player and give all Roles back \nSyntax: ${config.prefix}unmute <@user>/<user id>`,
            },{
                name: "Warn",
                value: `description: Warn an user on the curront Server \nSyntax: ${config.prefix}warn <@user>/<user id> (reason)`,
            },{
                name: "Purge",
                value: `description: Purges a specific amount of messages \nSyntax: ${config.prefix}purge (mount of messages)`,
            },{
                name: "Channel",
                value: `description: Add/Remove a channel as bot command channel \nSyntax: ${config.prefix}channel add/remove <#channel id>`,
            },{
                name: "Survey",
                value: `description: Creates an either or survey \nSyntax: ${config.prefix}survey <#channel id> <react emote 1> <react emote 2> <question>`
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
                value: `description: the bot will say whatever you want and if you want as embed too \nSyntax: ${config.prefix}say <#channelid> [embed(opt)] content`,
            },{
                name: "User",
                value: `description: add/remove a user as bot Admin \nSyntax: ${config.prefix}user add/remove <@username>`,
            },{
                name: "Test",
                value: `description: the test command. depending on what you're about to test. \nSyntax: ${config.prefix}test ...(undefined)`,
            }]
        }});
    }
}