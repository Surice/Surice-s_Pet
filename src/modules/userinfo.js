module.exports = async (client, msg, content) => {
    const fs = require('fs');

    const config = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`,'utf-8'));


    try{
        if (content[1] && content[1].startsWith("<@!")) {
            var temp = content[1].substr(3).slice(0, -1);
            content[1] = temp;
        }

        var user = await client.users.fetch(content[1]);
        userInfoEmbed(user, msg).then(console.log("Search by Id: "+ content[1]));
    }catch{
        var username = content.slice(1).join(' '),
            discriminator = 0,
            valex = 1000,
            tag,
            allreadyFound = new Array(),
            output = new Array();

        console.log("Searching for: "+ username);
        searchUser(username, discriminator, tag, output, msg, valex);
    }

    async function searchUser(username, discriminator, tag, output, msg, valex){
        let user = client.users.cache.find(user => user.username == username && !allreadyFound.includes(user.id));


        if(discriminator < 10000){
            if(discriminator < 10){
                tag = `000${discriminator.toString()}`;
            }
            else if(discriminator < 100){
                tag = `00${discriminator.toString()}`;
            }
            else if(discriminator < 1000){
                tag = `0${discriminator.toString()}`;
            }else{
                tag = discriminator.toString();
            }

            if(user && user.discriminator == tag && !allreadyFound.includes(user.id)){
                console.log("user: "+ user.username+ " Found");
                allreadyFound.push(user.id);
                console.log(allreadyFound);
                await userInfoEmbed(user, msg);
            }

            discriminator = discriminator + 1;

            if(discriminator == valex){
                console.log(discriminator+ "\n");
                valex = valex + 1000;
                setTimeout(searchUser, 50, username, discriminator, tag, output, msg, valex);
            }else{
                searchUser(username, discriminator, tag, output, msg, valex);
            }
        }else{
            console.log("Search Completed!");
        }
    }
    async function userInfoEmbed(user, msg){

            msg.channel.send({embed: 
                {
                    color: 0x7d0099,
                    title: user.username,
                    thumbnail: {
                        url: user.avatarURL(),
                    },
                    fields: [{
                        name:"Nickname",
                        value: await getUserNick(user, msg),
                    },{
                        name: "Status",
                        value: status(user),
                    },{
                        name: "Discriminator",
                        value: user.discriminator,
                    },{
                        name: "User-ID",
                        value: user.id,
                    },{
                        name: "Client type",
                        value: botOrNot(user),
                    },{
                        name: "certificates",
                        value: certificates(user),
                    },{
                        name: "Activity",
                        value: await activity(user),
                    },{
                        name: "last Massage",
                        value: lastMsg(user),
                    },{
                        name: "Created At",
                        value: await createTimeSort(user, msg),
                    }],
                    footer: {
                        text:`Owner: ${await ownerGet()}`
                    }
                }
            }).catch(console.error);
    }

    async function getUserNick(user, msg){
        try{
            const member = await msg.guild.members.fetch(user.id);
            return member.displayName;
        }catch{
            return user.username;
        }
    }
    function status(user){
        var response;
        if(user.presence.clientStatus){
            response = user.presence.status;
            if(user.presence.clientStatus.mobile){
                response = `${response} (mobile)`;
            }
        }else{
            response = "Offline";
        }
        return response
    }
    function lastMsg(user){
        if(user.lastMessage){
            return user.lastMessage;
        }else{
            return "--none--";
        }
    }
    function botOrNot(user){
        if(user.bot){
            return `Bot Client`;
        }else{
            return "User Client";
        }
    }
    function certificates(user){
        if(user.flags){
            var cert = user.flags.bitfield,
                response;
            if(cert == 1<<0){
                response = "Discord Employee";
            }
            else if(cert == 1<<1){
                response = "Discord Partner";
            }
            else if(cert == 1<<2){
                response = "HypeSquad Events";
            }
            else if(cert == 1<<3){
                response = "Bug Hunter Level 1";
            }
            else if(cert == 1<<6){
                response = "House Bravery";
            }
            else if(cert == 1<<7){
                response = "House Brilliance";
            }
            else if(cert == 1<<8){
                response = "House Balance";
            }
            else if(cert == 1<<9){
                response = "Early Supporter";
            }
            else if(cert == 1<<10){
                response = "Team User";
            }
            else if(cert == 1<<12){
                response = "System";
            }
            else if(cert == 1<<14){
                response = "Bug Hunter Level 2";
            }
            else if(cert == 1<<16){
                response = "Verified Bot";
            }
            else if(cert == 1<<17){
                response = "Verified Bot Developer";
            }else{
                response = "-none-(undefined)";
            }
        }else{
            response = "-none-";
        }
        return response;
    }
    function activity(user){
        try{
            return user.presence.activities[0].name;
        }catch{
            return "-none-";
        }
    }
    async function createTimeSort(user, msg){
        var response,
            days = new Array("Mon","Tue","Wed","Thu","Sat","Sun"),
            minute = user.createdAt.getMinutes(),
            hour = user.createdAt.getHours(),
            amPm = "am",
            day = user.createdAt.getDay(),
            date = user.createdAt.getDate(),
            month = user.createdAt.getMonth(),
            year = user.createdAt.getFullYear(),
            timeZoon = user.createdAt.getTimezoneOffset();

        if(hour >= 12){
            hour = hour - 12;
            amPm = "pm";
        }
        if(hour < 10){
            hour = `0${hour}`;
        }
        if(minute < 10){
            minute = `0${minute}`;
        }
        day = await parseInt(day);
        timeZoon = timeZoon/60;

        response = await `on ${days[day+1]} at ${hour}:${minute} ${amPm} the \n${date}.${month}.${year} \nin Timezoon \n(UTC)${timeZoon}`

        return response;
    }
    async function ownerGet(){
        const owner = await client.users.fetch(config.owner);
        var response = owner.tag;
        return response;
    }

}