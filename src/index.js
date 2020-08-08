const Discord = require('discord.js');
const fs = require("fs");
const nodemailer = require('nodemailer');
const cron = require('cron');
const { request } = require('http');

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));

var users = JSON.parse(fs.readFileSync(`${__dirname}/stor/users.json`).toString());
var channels = JSON.parse(fs.readFileSync(`${__dirname}/stor/channels.json`).toString());
let mutes = JSON.parse(fs.readFileSync(`${__dirname}/stor/muteUsers.json`).toString());


var global = require(`${__dirname}/global.js`);

var client = new Discord.Client(),
    myuser = global.myuser,
    unick = global.unick;

var mail = nodemailer.createTransport({
    host: 'smtp.strato.de',
	port: 465,
	secure: true,
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
    }),
    mailOptions = {
        from: 'Bot-Status@sebastian-web.de',
	    to: 'sesi.ulrich@gmail.com',
	    subject: '',
	    text: ''
    };

console.log("Loading...");
client.on('ready', ()=>{
    console.log("---------------------------");
    console.log(client.user.username+ " successfully logged in!");
    console.log("---------------------------\n");

    client.user.setStatus("idle");
    client.user.setActivity(`for Preifx: ${config.prefix}`, {type: "WATCHING"});

    run = require(`${__dirname}/automatic/monitoring`);
    run(client, fs, cron, mail, mailOptions);
});

client.on('guildMemberUpdate', (guild, oldguild) => {
    if(guild.user.id == myuser && oldguild.nickname != unick){
       setnick(guild);
    }else{
    }
});
client.on('guildMemberAdd', member => {
    const server = member.guild;
    if(mutes[server] && mutes[server].includes(member.id)){
        let role = server.roles.cache.find(e => e.name == config.muteRoleName);
        member.roles.add(role);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {    
    //everytime false!
    if(1 == 2){
        let run = require(`${__dirname}/modulesOwner/checkChannel.js`);
        run(oldMember, newMember);
    }
});

client.on('messageReactionAdd', (react, member) => {
    let run = require(`${__dirname}/modulesOwner/close.js`);
    run(client, false, false, react, member, "add");
});
client.on('messageReactionRemove', (react, member) => {
    let run = require(`${__dirname}/modulesOwner/close.js`);
    run(client, false, false, react, member, "rm");
});

client.on('message', (msg) => {
	if(msg.channel.type == "dm"){
        let runfile = require(`${__dirname}/automatic/dmredirection.js`);
        runfile(client,msg);
	}else{
        const content = msg.content.substr(config.prefixlengh).split(' '),
            errorLog = String;

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
        server = msg.guild.name;

    if(msg.author.id == config.owner || msg.author.id == config.owner2 || users.includes(msg.author.id)){
        response.push("owner");
        response.push("admin");
        response.push("everyone");
    }
    //DOESNT WORK RIGHT NOW! need an if clause for "user has role bot-command and check if the role has admin rights"
    else if(msg.member.hasPermission('ADMINISTRATOR')){
        response.push("admin");
        response.push("everyone");
    }
    else if(channels[server].includes(msg.channel.id)){
        response.push("everyone");
    }
    return response;
}


try{
    client.login(config.token);
}catch(err){
    console.log(err);
    mailOptions.subject = "an error was detected";
    mailOptions.text =  `Unknown Error \n\nERROR: \n${err}`;

    if(err.code == 'EAI_AGAIN' || err.code == 'ETIMEDOUT'){
        mailOptions.text = `an Connection Timeout was detected! \n\nERROR: \n${err}`;
        console.log(`------------------------\n>CONNECTION ERROR DETECTED<\n------------------------`);
        setTimeout(function(){
            client.login(config.token)
        }, 30000);
    }
    mail.sendMail(mailOptions, function(error, info){
        console.log(info);
    });
}