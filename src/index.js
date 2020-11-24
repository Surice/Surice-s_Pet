const Discord = require('discord.js');
const fs = require("fs");

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));


let users = JSON.parse(fs.readFileSync(`${__dirname}/stor/users.json`).toString());
let channels = JSON.parse(fs.readFileSync(`${__dirname}/stor/channels.json`).toString());
let mutes = JSON.parse(fs.readFileSync(`${__dirname}/stor/muteUsers.json`).toString());


let client = new Discord.Client();


console.log("Loading...");
client.on('ready', ()=>{
    console.log("---------------------------");
    console.log(client.user.username+ " successfully logged in!");
    console.log("---------------------------\n");

    client.user.setStatus("idle");
    client.user.setActivity(`for Preifx: ${config.prefix}`, {type: "WATCHING"});
});


client.on('guildMemberAdd', member => {
    const server = member.guild;

    if(mutes[server] && mutes[server].includes(member.id)){
        let role = server.roles.cache.find(e => e.name == config.muteRoleName);
        member.roles.add(role);
    }
});

client.on('message', (msg) => {
	if(msg.channel.type == "dm"){
        let runfile = require(`${__dirname}/automatic/dmredirection.js`);
        runfile(client,msg);
	}else{        
        const content = msg.content.substr(config.prefix.lengh).split(' ');

        if(msg.content.startsWith(config.prefix)){
            if(authorized(msg).includes("everyone")){
                try{
                    let filerun = require(`${__dirname}/modules/${content[0]}.js`)
                    filerun(client, msg, content, authorized(msg));
                }catch(err){
                    if(authorized(msg).includes("admin")){
                        try{
                            let filerun = require(`${__dirname}/modulesAdmin/${content[0]}.js`)
                            filerun(client, msg, content, authorized(msg));
                        }catch(err){
                            if(authorized(msg).includes("owner")){
                                try{
                                    let filerun = require(`${__dirname}/modulesOwner/${content[0]}.js`)
                                    filerun(client, msg, content, authorized(msg));
                                }catch(err){             
                                    //if no owner command found
                                    if(err.code == 'MODULE_NOT_FOUND'){
                                        console.log("cant find this command");
                                        msg.channel.send(`the entered command doesn't exist.`);
                                    }else{
                                        console.log(err);
                                    }
                                }
                            }else{
                                //if not owner authorized and no admin command found
                                if(err.code != 'MODULE_NOT_FOUND'){
                                    console.log(err);
                                }
                                msg.channel.send(`the entered command doesn't exist or you aren´t authorized to give me this order. Please try again or contact <@${config.owner}> in case of a mistake`);
                            }
                        }
                    }else{
                        //if not admin authorized and no command found
                        if(err.code != "MODULE_NOT_FOUND"){
                            console.log(err);
                        }
                        msg.channel.send(`the entered command doesn't exist or you aren´t authorized to give me this order. Please try again or contact <@${config.owner}> in case of a mistake`);
                    }
                }
            }
        }
    }
});


//checks the access permission of the user
function authorized(msg){
    var response = new Array(),
        serverName = msg.guild.name;

    if(msg.author.id == config.owner || users.includes(msg.author.id)){
        response.push("owner", "admin", "everyone");
    }
    else if(msg.member.hasPermission('ADMINISTRATOR')){
        response.push("admin", "everyone");
    }
    else if(channels[serverName].includes(msg.channel.id)){
        response.push("everyone");
    }

    return response;
}


client.login(config.token);