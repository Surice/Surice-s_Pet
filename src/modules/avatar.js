module.exports = async (client, msg, content) => {

    let user = msg.mention.first() || client.users.fetch(content[1]);

    if(!user){
        user = msg.author;
    }

    msg.channel.send({embed:{
        title: `Avatar of ${user.username}`,
        image:{
            url: user.avatarURL(),
        }
    }});
}