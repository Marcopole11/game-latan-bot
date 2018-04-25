const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});
const adapt = require("./readaptable.json");

var prefix = 'e-';
client.on('message', message => {
    if(message.channel.id == 429624999683424261){
        if (message.content.startsWith(prefix + 'ping')) {
            let test = adapt.ping[Math.round(Math.random() * (adapt.ping.length -1))];
            message.channel.send(adapt.ping.length);
            message.channel.send(test);
            message.channel.send({
                  files: [test]
                });
        }
    }
});

client.on("guildMemberAdd", (member) => {
    member.addRole(member.guild.roles.find("name", "no miembro"), "Por seguridad");
});
client.on("messageDelete", message => {
    if(message.channel.id != 429629491598589983 && message.channel.id != 429649915174453250){
        let rprt = "__Mensaje eliminado__ de _" + message.author.username + "_ en " + message.channel + " \n**``" + message.content + "``**";
        message.guild.channels.find("name", "log").sendMessage(rprt);
    }
});

//This is da wae
client.login(process.env.BOT_TOKEN);
