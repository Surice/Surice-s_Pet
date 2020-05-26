module.exports = async (client, msg, content) => {
    var axios = require('axios');
    const fs = require('fs');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    var url = 'http://some-random-api.ml/meme';

    axios({
        method: 'get',
        url: url
    }).then(function(response) {
        msg.channel.send({embed:{title: response.data.caption, Color: 0x5e9cff, image:{url: response.data.image,}}});
    });
}