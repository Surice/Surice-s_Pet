module.exports = (client, msg, content) => {
    //isn´t working right now. the stop command is broke
    var whiletrue = false;

    if(content[1] && content[1] == "stop"){
        console.log("mitte turned off");
        whiletrue = false
        console.log(whiletrue);
    }else{
        console.log("mitte turned on");
        whiletrue = true;
        createchannel();
    }

    function createchannel(){
        client.channels.fetch('697017870466678795').then(chnl =>{
            guilde = chnl.guild;
            chnl.updateOverwrite(chnl.guild.roles.everyone, { VIEW_CHANNEL: true , SEND_MESSAGES: true}).catch(console.error).then(setTimeout( deletechannel, 800, chnl));
        });
    }
    function deletechannel(chnl){
        if(whiletrue){
            chnl.updateOverwrite(chnl.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false }).catch(console.error).then(setTimeout( createchannel, 800));
        }
    }

}