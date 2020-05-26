module.exports = async (client, msg, content) => {
    var axios = require('axios');
    const fs = require('fs');
    const Discord = require('discord.js');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    var url = 'http://some-random-api.ml/lyrics',
        song = content.slice(1).join(" ");

    axios({
        method: 'get',
        url: `${url}?title=${song}`,
    })
    .then(async function(response) {
        var lyric = response.data.lyrics;
            lyric = lyric.split('\n\n');

        try{
            const embed = new Discord.MessageEmbed()
                .setTitle(response.data.title)
                .setColor(0x5e9cff)
                .setDescription(response.data.author)
                .setThumbnail(response.data.thumbnail.genius);
            
            await lyric.forEach(function(content, index){
                embed.addField('\u200b', content);
            });
            
            msg.channel.send(embed);
        }catch (err){
            console.log(err);
            msg.channel.send(">"+response.error);
        }
    });
}