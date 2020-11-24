const Discord = require('discord.js');
const fs = require("fs");

const express = require('express');
const { RSA_NO_PADDING } = require('constants');
const app = express();

const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`,'utf-8'));
const auth = require(`${__dirname}/automatic/auth.js`);


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
        const content = msg.content.substr(config.prefix.length).split(' ');

        if(msg.content.startsWith(config.prefix)){
            if(auth.authorized(msg).includes("everyone")){
                try{
                    let filerun = require(`${__dirname}/modules/${content[0]}.js`);
                    filerun(client, msg, content, auth.authorized(msg));
                }catch(err){
                    if(auth.authorized(msg).includes("admin")){
                        try{
                            let filerun = require(`${__dirname}/modulesAdmin/${content[0]}.js`);
                            filerun(client, msg, content, auth.authorized(msg));
                        }catch(err){
                            if(auth.authorized(msg).includes("owner")){
                                try{
                                    let filerun = require(`${__dirname}/modulesOwner/${content[0]}.js`);
                                    filerun(client, msg, content, auth.authorized(msg));
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



client.login(config.token);


app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requestet-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/test', (req, res) => {
    res.send("OK");
})

app.post('/login-auth', async (req, res) => {
    const data = {
        token: req.body.auth,
        id: req.body.id,
        guildId: req.body.gid
    }

    if(data.token != config.frontend_auth_token){
        res.status(401).json({ status: false });
        return;
    }

    let authRes = await auth.checkLoginPerms(data, client);

    if(authRes) res.json({ status: true, role: authRes });
});


app.listen(config.backend_port, function(){
    console.log(`express listen on port ${config.backend_port} \n`);
});