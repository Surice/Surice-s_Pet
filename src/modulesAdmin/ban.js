module.exports = async (client, msg, content) => {
    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);

    if(member.banable){
        await member.ban().then;
        msg.channel.send(`${member} Successfully Banned!`);
    }
}