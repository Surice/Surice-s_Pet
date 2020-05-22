module.exports = (client, msg, content) => {
    var global = require(`${__dirname}/../global.js`);

    try{
        let func = require(`${content[1]}`);
        func(content);
    }catch(err){
        console.log(error);
    }
}

function  setuser(content){
    var myuser = content [2];
    global.myuser = myuser;
    try{setnick(msg.guild);}catch{console.error}
    console.log("myuser changed to: "+ myuser);
}
function  setnick(content){
    var unick = content[2];
    global.unick = unick;
    try{setnick(msg.guild);}catch{console.error;}
    console.log("unick changed to: "+ unick);
}
function  reset(){
    global.unick;
    console.log("Reset Nick");
}