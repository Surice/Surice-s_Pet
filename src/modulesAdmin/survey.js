module.exports = async (client, msg, content) => {
    if (content[1] && content[1].startsWith("<#")) {
        content[1] = content[1].substr(2).slice(0, -1);
    }

    let channel = content[1],
        react1 = content[2],
        react2 = content[3];


    let quest = content.slice(4).join(' ');

    let chnl = await client.channels.fetch(channel);
    try{
        chnl.send(quest).then(function(mes){
            mes.react(react1);
            mes.react(react2);
        });
    }catch(e){
        msg.channel.send("incorrect input. please try again");
    }
}