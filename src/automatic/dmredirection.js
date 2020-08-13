module.exports = (client, msg) =>{
    if(msg.author.id != client.user.id){
        client.channels.fetch('703645596107538492').then(channel =>{
            channel.send({embed: {color: 0x75003d ,fields:[{name: msg.author.username, value: msg.content}]}});
        });
    }
}