const Discord = require('discord.js');
const fs = require("fs");

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));

var users = JSON.parse(fs.readFileSync(`${__dirname}/stor/users.json`).toString());
var channels = JSON.parse(fs.readFileSync(`${__dirname}/stor/channels.json`).toString());

var global = require(`${__dirname}/global.js`);
var client = new Discord.Client(),
    myuser = global.myuser,
    unick = global.unick,
    save = new Array();


console.log("Loading...");
client.on('ready', ()=>{
    console.log("---------------------------");
    console.log(client.user.username+ " successfully logged in!");
    console.log("---------------------------\n");

    client.user.setStatus("idle");
    client.user.setActivity("for Preifx: $$$", {type: "WATCHING"});
});

client.on('guildMemberUpdate', function (guild, oldguild){
    if(guild.user.id == myuser && oldguild.nickname != unick){
       setnick(guild);
    }else{
    }
});

client.on('message', (msg)=>{
	if(msg.channel.type == "dm"){
        let runfile = require(`${__dirname}/automatic/dmredirection.js`);
        runfile(client,msg);
	}else{
        var content = msg.content.substr(config.prefixlengh).split(' '),
            errorLog = String;

        if(msg.content.startsWith(config.prefix)){
            console.log("Prefix detected!");

            if(authorized(msg).includes("everyone")){
                try{
                    console.log("try run command");
                    let filerun = require(`${__dirname}/modules/${content[0]}.js`)
                    filerun(client, msg, content, authorized(msg));
                }catch(err){
                    console.log(err);
                    if(authorized(msg).includes("admin")){
                        try{
                            console.log("try run admin command");
                            let filerun = require(`${__dirname}/modulesAdmin/${content[0]}.js`)
                            filerun(client, msg, content, authorized(msg));
                        }catch(err){
                            if(authorized(msg).includes("owner")){
                                try{
                                    console.log("try run owner command");
                                    let filerun = require(`${__dirname}/modulesOwner/${content[0]}.js`)
                                    filerun(client, msg, content, authorized(msg));
                                }catch(err){             
                                    //if no owner command found
                                    if(err.code == "MODULE_NOT_FOUND"){
                                        msg.channel.send(`the entered command doesn't exist.`);
                                    }else{
                                        console.log(err);
                                    }
                                }
                            }else{
                                //if not owner authorized and no admin command found
                                msg.channel.send(`the entered command doesn't exist or you aren´t authorized to give me this order. Please try again or contact <@${config.owner}> in case of a mistake`);
                            }
                        }
                    }else{
                        //if not admin authorized and no command found
                        msg.channel.send(`the entered command doesn't exist or you aren´t authorized to give me this order. Please try again or contact <@${config.owner}> in case of a mistake`);
                    }
                }
            }
/*
            if(errorLog){
                if(errorLog.code == 'MODULE_NOT_FOUND'){
                    console.log("Wrong input. no command found");
                    msg.channel.send("the entered command doesn't exist");
                }else{
                    console.log(errorLog);
                }
            }
*/
        }
    }
});


//checks the access permission of the user
function authorized(msg){
    var response = new Array();

    
    if(msg.author.id == config.owner){
        response.push("owner");
        response.push("admin");
        response.push("everyone");
    } 
    else if(users.includes(msg.author.id)){
        response.push("admin");
        response.push("everyone");
    }
    else if(channels.includes(msg.channel.id)){
        response.push("everyone");
    }

    return response;
}


try{
    client.login(config.token)
}catch(err){
    console.log(err);
    if(err.code == 'EAI_AGAIN' || err.code == 'ETIMEDOUT'){
        console.log(`------------------------\n>CONNECTION ERROR DETECTED<\n------------------------`);
        setTimeout(function(){
            client.login(config.token)
        }, 30000);
    }
}