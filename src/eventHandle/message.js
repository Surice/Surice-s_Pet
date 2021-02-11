module.exports = (client, msg) => {
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));
    const auth = require(`${__dirname}/../automatic/auth.js`);

    if(msg.channel.type == "dm"){
        let runfile = require(`${__dirname}/../automatic/dmredirection.js`);
        runfile(client,msg);
	}else{        
        const content = msg.content.substr(config.prefix.length).split(' ');

        if(msg.content.startsWith(config.prefix)){
            if(auth.authorized(msg).includes("everyone")){
                try{
                    let filerun = require(`${__dirname}/../modules/${content[0].toLowerCase()}.js`);
                    filerun(client, msg, content, auth.authorized(msg));
                }catch(err){
                    if(auth.authorized(msg).includes("admin")){
                        try{
                            let filerun = require(`${__dirname}/../modulesAdmin/${content[0].toLowerCase()}.js`);
                            filerun(client, msg, content, auth.authorized(msg));
                        }catch(err){
                            if(auth.authorized(msg).includes("owner")){
                                try{
                                    let filerun = require(`${__dirname}/../modulesOwner/${content[0].toLowerCase()}.js`);
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
            }else{
                msg.channel.send(`you are trying to communicate with me in a channel which is not available for this service. Please try again or contact <@${config.owner}> in case of a mistake`);
            }
        }
    }
}