module.exports = async (client, msg, content) => {

    let user = (msg.mentions.users) ? msg.mentions.users.first() : await client.users.fetch(content[1]);

    if(!user){
        user = msg.author;
    }

    msg.channel.send({embed:{
        title: `Avatar of: ${user.username}`,
        image:{
            url: `${user.displayAvatarURL({dynamic: true})}?size=256`,
        }
    }});
}