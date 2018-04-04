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
        } else if (message.content.startsWith(prefix + 'testjson')){
            message.channel.send(autorole.memes.chats[0]);
        }
    } else if(message.channel.id == 429649915174453250){
        if (message.content.startsWith('nueva')) {
            message.channel.sendMessage('creada DB');
            message.delete();
        }
    } else if(message.channel.id == 429655030040363018){
        if(message.author.dmChannel == null){
            message.author.createDM().then(dmc => {
                dmc.send({
                      files: ['https://images7.memedroid.com/images/UPLOADED153/54c6c65e8cf07.jpeg']
                    })
                    .then(message => console.log(`Sent message: ${message.content}`))
                    .catch(er => {
                        message.member.removeRole(message.guild.roles.find("name", "no miembro"), "Por seguridad");
                        message.member.addRole(message.guild.roles.find("name", "n00bs"), "Bienvenido");
                    });
            });
        } else {
            message.author.dmChannel.send({
                  files: ['http://m.memegen.com/p9l8o1.jpg']
                })
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(er => {
                    message.member.removeRole(message.guild.roles.find("name", "no miembro"), "Por seguridad");
                    message.member.addRole(message.guild.roles.find("name", "n00bs"), "Bienvenido");
                });
        }
        message.delete();
    } else {
        if (message.content.startsWith('Coincide aqui?')) {
            console.log("hasta aqui funciono");
            message.channel.sendMessage('sabes usar consola?');
            for(i = 0; i < 4; i++){
                if(message.channel.id == autorole.memes.chats[i]){
                    for(j = 0; j < autorole.memes.rango.length; j++){
                        if(message.member.roles.exists('name', autorole.memes.rango[j])){
                            message.channel.sendMessage('Eres de lv ' + j);
                        }
                    }
                } else {
                    console.log(autorole.memes.chats[i]);
                }
            }
        }
    }
});

client.on("guildMemberAdd", (member) => {
    member.addRole(member.guild.roles.find("name", "no miembro"), "Por seguridad");
});
client.on("messageDelete", message => {
    /*let check = 0;
    for(i = 0; i < 2; i++){
        if(message.channel.id == autorole.delUnlog[i]){
            check = 1;
        }
    }*/
    if(message.channel.id == 429655030040363018){
        message.guild.channels.find("name", "log").sendMessage("Tenemos a " + message.author.username + " que intenta entrar.");
    } else if(message.channel.id != 429629491598589983 && message.channel.id != 429649915174453250){
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
