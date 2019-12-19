const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://music-v0-5-2.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "/";
const ownerID = "254507968710574080";
const active = new Map();

client.on('message', message => {


    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
      
        let ops = {
            ownerID: ownerID,
            active: active
        }

        let commandFile = require(`./commands/${cmd}`);
        commandFile.run(client, message, args, ops);

    } catch (e) {
        console.log(e);
    }

});

client.on('ready', () => console.log('Im Ready Man :)'));

client.login("NjU3MjI2OTUwODQxOTkxMjA5.XfuIiQ.FAZlSrZ39N4cOos7VBaUyEwe05A");
