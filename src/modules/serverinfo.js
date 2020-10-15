module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const Discord = require('discord.js');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    const server = msg.guild;


    var embed = new Discord.MessageEmbed()
    .setTitle(server.name)
    .setColor('0x7d0099')
    .setThumbnail(server.iconURL())
    .setFooter(msg.author.tag, client.user.avatarURL())
    .setTimestamp(new Date())
    .addFields([
        {
            name: "Server ID", value: server.id, inline: true
        },{
            name: "Server Owner", value: `<@${server.owner.id}>`, inline: true
        },{
            name: "Description", value: checkDescription(server)
        },{
            name: "\u200b", value: "\u200b"
        },{
            name: "Created At", value: await createTimeSort(server)
        },{
            name: "Server Region", value: server.region
        },{
            name: "Channels", value: await getChannels(server, "text"), inline: true
        },{
            name: "\u200b", value: await getChannels(server, "voice"), inline: true
        },{
            name: "Members", value: `
                👪 Total: ${server.memberCount}
                🐱‍💻 Users: ${await getMembers(server, "user")}
                🤖 Bots: ${await getMembers(server, "bot")} \n
                ❌ Banned: ${await getMembers(server, "banned")}
            `
        },{
            name: "Roles", value: server.roles.cache.size, inline: true
        },{
            name: "customized emojies", value: server.emojis.cache.size, inline: true
        },{
			name: '\u200b',
			value: '\u200b',
			inline: true,
		},{
            name: "👑 premium Tier", value: server.premiumTier, inline: true
        },{
            name: "🤴 premium Subs", value: server.premiumSubscriptionCount, inline: true
        },{
			name: '\u200b',
			value: '\u200b',
			inline: true,
		},{
            name: "🔐 verification Level", value: formatString(server.verificationLevel), inline: true
        },{
            name: "🗑️ content Filter", value: formatString(server.explicitContentFilter), inline: true
        },{
            name: "Features", value: await getFeatures(server)
        }
    ]);

    msg.channel.send(embed);
}


function formatString(str){
    return str.replace("_", " ").replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    });
}

function checkDescription(server){
    if(server.description){
        return server.description;
    }else{
        return "--none--";
    }
}

function getChannels(server, type){
    const channels = server.channels.cache.array();
    var out = {
        "voice": 0,
        "text": 0
    };

    channels.forEach(e => {
        if(e.type == "text"){
            out.text ++;
        }else if(e.type == "voice"){
            out.voice ++;
        }
    });

    if(type == "text"){
        return `💬 ${out.text} Text`;
    }else if(type == "voice"){
        return `🔊 ${out.voice} Voice`;
    }
}

async function getMembers(server, type){
    const members = server.members.cache.array();
    var out = {
        "user": 0,
        "bot": 0,
    };
    
    members.forEach(e =>{
        if(e.user.bot){
            out.bot ++;
        }else{
            out.user ++;
        }
    });

    if(type == "user"){
        return out.user;
    }else if(type == "bot"){
        return out.bot;
    }else if(type == "banned"){
        const banns = await server.fetchBans();
        return banns.size;
    }
}

function getFeatures(server){
    out = "";

    server.features.forEach(e =>{
        e = formatString(e);
        out += `${e} \n`;
    });

    return out;
}

async function createTimeSort(server){
    var response,
        days = new Array("Mon","Tue","Wed","Thu","Sat","Sun"),
        minute = server.createdAt.getMinutes(),
        hour = server.createdAt.getHours(),
        amPm = "am",
        day = server.createdAt.getDay(),
        date = server.createdAt.getDate(),
        month = server.createdAt.getMonth(),
        year = server.createdAt.getFullYear(),
        timeZoon = server.createdAt.getTimezoneOffset();

    if(hour >= 12){
        hour = hour - 12;
        amPm = "pm";
    }
    if(hour < 10){
        hour = `0${hour}`;
    }
    if(minute < 10){
        minute = `0${minute}`;
    }
    day = await parseInt(day);
    timeZoon = timeZoon/60;

    response = await `on ${days[day+1]} at ${hour}:${minute} ${amPm} \nthe ${date}.${month}.${year} in Timezoon (UTC)${timeZoon}`

    return response;
}