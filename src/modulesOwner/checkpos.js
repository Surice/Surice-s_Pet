module.exports = (client, msg, content) => {
    msg.guild.roles.fetch(content[1]).then(function(role){
        msg.channel.send(role.position);
    });
}