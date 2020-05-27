module.exports = async (client, msg, content) => {
    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);
    const reason = content.slice(2).join(" ");

    if(member.banable){
        await member.ban(reason).then;
        msg.channel.send(`${member} Successfully Banned!`);
    }
}