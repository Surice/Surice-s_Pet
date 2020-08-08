module.exports = (client, msg, content, check) => {
    if(check){
        
    }else{
        var global = require(`${__dirname}/../global.js`);

        global.channelId = content[1];
    }
}