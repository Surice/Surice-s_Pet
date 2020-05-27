module.exports = async (client, fs, cron, mail, mailOptions)=> {
    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));

    let user1 = await client.users.fetch(config.owner),
        user2 = await client.users.fetch(config.owner2);

    var offMsgSend = true;

    var j = cron.job('0 */5 * * * *', function(){
        if(offMsgSend && user1.presence.clientStatus.web != "online" || offMsgSend && user2.presence.clientStatus.web != "online"){
            offMsgSend = false;
            console.log("!Monitoring Alert!");
            console.log(user1.presence.clientStatus);
            console.log(user2.presence.clientStatus);

            mailOptions.subject = "Your Discord Assistent may Went Offline!";
            mailOptions.text =`the monitoring system has reported an error. you should check the server status. \nno further error informations \n\n\non behalf of sebastian ulrich \n\nthis is a machine generated letter. an answer to this email cannot be handled. in case of problems or questions please write to info@sebastian-web.de`;
            mail.sendMail(mailOptions);
        }else{
            offMsgSend = true;
        }
    });
    j.start();
}