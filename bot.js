const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});
const autorole = require("./autoroles.json");

var prefix = 'mL+';
client.on('message', message => {
    if(message.channel.id == 429629491598589983){
        message.guild.channels.get("429650257723392011").sendMessage('**Petición de '
                + message.member.nickname + '('
                + message.author.tag + ' ' + message.author.id +') \n'+
            message.content);
        message.delete();
    } else if(message.channel.id == 429624999683424261){
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.sendMessage('Its over 999!!!!');
        }
    } else if(message.channel.id == 429649915174453250){
        if (message.content.startsWith('nueva')) {
            message.channel.sendMessage('creada DB');
            message.delete();
        }
    }
});

client.on("guildMemberAdd", (member) => {
    member.addRole(member.guild.roles.find("name", "no miembro"), "Por seguridad");
});
client.on("messageDelete", message => {
    let check = 0;
    for(i = 0; i < 2; i++){
        if(message.channel.id == autorole.delUnlog[i]){
            check = 1;
        }
    }
    if(check == 0){
        let rprt = "__Mensaje eliminado__ de _" + message.author.username + "_ en " + message.channel + " \n**``" + message.content + "``**";
        message.guild.channels.find("name", "log").sendMessage(rprt);
    }
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        newMember.addRole(newMember.guild.roles.find("name", "🔊"));
        newMember.guild.channels.find("name", "log").sendMessage(newMember.user.username + " entró en los chats de voz");
    } else if(newUserChannel === undefined){
        newMember.removeRole(newMember.guild.roles.find("name", "🔊"));
        newMember.guild.channels.find("name", "log").sendMessage(newMember.user.username + " salió de los chats de voz");
    }
});

//This is da wae
client.login(process.env.BOT_TOKEN);
