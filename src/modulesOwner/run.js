module.exports = async (client, msg, content) => {
    msg.channel.send({embed: {
        color: '#EB7B03',
        title: "Reaction-Roles",
        description: `
            Hey! Wenn du für bestimmte Events eine Benachrichtigung oder einen Bereich freischalten möchtest, findest du unter dieser Nachricht eine Auflistung aller aktuell möglichen Optionen mit einem Emoji. 
            
            Wenn du die jeweilige Benachrichtigung bekommen / den Bereich freischalten möchtest, klick auf den passenden Emoji, welche oben aufgelistet sind.
        `
    }});
}