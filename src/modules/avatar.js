module.exports = async (client, msg, content) => {

    let user = msg.mentions.users.first() || await client.users.fetch(content[1]);

    if(!user){
        user = msg.author;
    }

    msg.channel.send({embed:{
        title: `Avatar of: ${user.username}`,
        image:{
            url: `${user.avatarURL()}?size=256`,
        }
    }});
}