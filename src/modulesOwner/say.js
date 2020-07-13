module.exports = async (client, msg, content) => {
	const Discord = require('discord.js');
	const fs = require('fs');

	var errContent = String;
	
	const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

	var embed = new Discord.MessageEmbed()
        .setTitle("Say")
		.setColor(0x34ad4c)
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setTimestamp(new Date());	

	if(content[1]){
		let channel = await client.channels.fetch(content[1]);
		if(channel){
			embed.setFooter(channel.id, client.user.avatarURL())
				.setThumbnail(channel.guild.iconURL());

			if(content.length >= 3){
				content = content.slice(2);

				if(content[0] == "embed"){
					if(content.length >= 2){
						channel.send({embed: {color: 0x75003d ,fields:[{name: content[1], value: content.slice(1).join(" ")}]}});
					}else{
						//content to short. no say possible
						errContent = "Message must be set";
						error();
					}
				}else{
					content = content.join(" ");
					channel.send(content);
				}
			}else{
				//content to short. no say possible
				errContent = "Message must be set";
				error();
			}
		}else{
			errContent = "Channel not found";
			error();
		}
	}else{
		//no channel has been set!
		errContent = "Channel must be set";
		error();
	}


	function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error at Say command`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}