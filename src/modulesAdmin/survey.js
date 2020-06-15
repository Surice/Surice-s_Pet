module.exports = async (client, msg, content) => {

    console.log("umfrage");

    if (content[1] && content[1].startsWith("<#")) {
        var temp = content[1].substr(2).slice(0, -1);
        content[1] = temp;
    }

    let channel = content[1];
    let react1 = content[2];
    let react2 = content[3];


    let quest = content.slice(4).join(' ');
    console.log(channel);

    var chnl = await client.channels.fetch(channel);
    try{
        chnl.send(quest).then(function(mes){
            mes.react(react1);
            mes.react(react2);
        });
    }catch(e){
        msg.channel.send("incorrect input. please try again");
    }
}