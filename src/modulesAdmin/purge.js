module.exports = async (client, msg, content) => {
    var err = false;

    let amount = content[1] || 1;
    amount++;

    await msg.channel.bulkDelete(amount).catch(function(error){
        err = true;
        if(error.code == "50034"){
            msg.channel.send("It isn´t possible to delete these old messages. They must be less than 14 days old");
        }
        else if(error.code == "50035"){
            msg.channel.send("Can´t delete more than __100__ messages. please choose a value less than 100");
        }
        else{
            msg.channel.send("an unexpected error has occurred");
        }
    });
    if(!err){
        msg.channel.send(`${amount - 1} Messages Deleted✅`).then(message => setTimeout(function(){message.delete()}, 2000));
    }
}