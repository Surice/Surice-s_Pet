module.exports = (client, msg, content) => {
	console.log("say command triggered!\n");
	if(content[1]){
		//check if channel was set
		var channelId = content[1];
		

		client.channels.fetch(channelId).then(channel =>{
			if(content.lenght >= 2){
				content = content.slice(2);   
				if(content[1] && content[1] == "embed"){
					channel.send({embed: {color: 0x75003d ,fields:[{name: content[1], value: content.slice(2).join(" ")}]}});
				}else{
					content = content.join(" ");
					channel.send(content);
				}
			}else{
				//content to short. no say possible
				msg.channel.send(`Syntax:\n ${config.prefix}say <channelid> [embed(opt)] content`);
			}
		});
	}else{
		//no channel has been set!
		msg.channel.send(`Syntax:\n ${config.prefix}say <channelid> [embed(opt)] content`);
	}
}