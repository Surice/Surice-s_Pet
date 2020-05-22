module.exports = (client, msg) =>{
    client.channels.fetch('703645596107538492').then(channel =>{
        channel.send({embed: {color: 0x75003d ,fields:[{name: msg.author.username, value: msg.content}]}});
    });
}