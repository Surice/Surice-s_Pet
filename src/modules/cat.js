module.exports = async (client, msg, content) => {
    const fs = require('fs');
    const xml = require('xmlhttprequest').XMLHttpRequest;

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    var req = new xml();
    req.open("GET", `https://api.thecatapi.com/v1/images/search?api_key=${config.cat_api_key}`);
    req.send();
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var response = JSON.parse(this.responseText);

            msg.channel.send({embed:{
                image: {
                    url: response[0].url,
            }}});
        }
    }
}