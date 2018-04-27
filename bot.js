const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});
const adapt = require("./readaptable.json");

var prefix = 'e-';
client.on('message', message => {
    if(message.member.roles.exists('name', adapt.ultrausers)){ //comandos de admins
        
    }
    if(message.channel.id == adapt.comchat || message.channel.id == adapt.ultracomchat){ //comandos publicos
        if (message.content.startsWith(prefix + 'ping')) {
            let test = adapt.ping[Math.round(Math.random() * (adapt.ping.length -1))];
            message.channel.send({
                  files: [test]
                });
        }
    }
    if(message.channel.id == adapt.ultracomchat || message.member.roles.exists('name', adapt.ultrausers)){ //comandos de mods
        
    }
    if(message.member.id == 192007091169263616){ //comandos de desarollador
        if (message.content.startsWith(prefix + 'purge')) {
            message.channel.fetchMessages({ limit: 10 })
            .then(messages => {message.channel.bulkDelete(messages);});
        } else if (message.content.startsWith(prefix + '2purge')) {
            message.channel.bulkDelete(10).catch(console.error);
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
