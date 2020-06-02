module.exports = async (client, msg, content) => {

    var errContent = String;

    let member = msg.mentions.members.first() || await msg.guild.members.fetch(content[1]);
    const reason = content.slice(2).join(" ");

    var embed = new Discord.MessageEmbed()
        .setTitle("Ban")
        .setThumbnail(member.user.avatarURL())
        .setAuthor(`${msg.author.tag}`, msg.author.avatarURL())
        .setFooter(member.id, client.user.avatarURL())
        .setTimestamp(new Date());

    if(member.banable){
        await member.ban(reason).then(function(){
            embed.setColor(0x34ad4c)
            embed.setDescription(`Succesfully banned <@${member.id}>`);

            msg.channel.send(embed);
        });
    }else{
        errContent = "you are not authorized to ban this person";
        error();
    }

    function error(){
        embed.setColor('0xd42828')
        embed.setDescription(`Error during banning of <@${member.id}>`)
        embed.addField("Error", errContent);

        msg.channel.send(embed);
    }
}