const { MessageEmbed } = require("discord.js")

module.exports = async (client, msg, content) => {
    const role = await msg.guild.roles.cache.filter(role => role.id == "802222230137470977");
    msg.guild.emojis.create('https://i.imgur.com/w3duR07.png', 'rip', {roles: role})
    .then(emoji => msg.reply(`Created new emoji with name ${emoji.name}!`));
}