module.exports = async (client, msg, content) => {
    const answer = {
        0: new Array("Ja", "Definitiv", "Absolut"),
        1: new Array("Nein", "Nie im Leben", "Vergiss es"),
        2: new Array("Vielleicht", "mir egal", "Entscheide selbst"),
    }
    var choose = Math.floor(Math.random() * 3),
        items = answer[choose];

    msg.channel.send(item[Math.floor(Math.random()*items.length)]);
}