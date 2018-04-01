const Discord = require('discord.js');
const client = new Discord.Client();
const pluralinfo = require("./principalDatabase.json");

client.on('ready', () => {
    console.log('I am ready!');
});

const autorole = require("./autoroles.json");
client.on('message', message => {
    let archat = autorole.roles.filter(er => er.chat == message.channel.id);
    if (archat.length == 1){
        if(Math.round(Math.random()*parseInt(archat[0].chance)) == 0){
            switch(archat[0].tipo) {
                case "msg":
                        message.member.addRole(message.guild.roles.find('name',archat[0].rol));
                    break;
                case "Smsg":
                    if(message.content.indexOf(archat[0].data) > -1){
                        message.member.addRole(message.guild.roles.find('name',archat[0].rol));
                    }
                    break;
                case "pic":
                    if(message.attachments.size > 0){
                        message.member.addRole(message.guild.roles.find('name',archat[0].rol));
                    }
                    break;
            }
        }
    } else if (archat.length > 1){
        let errcoiciden = "**Error, se ha usado 2 veces la id del chat " + message.channel.name  + " en el autorole:**\n";
        archat.forEach(function(responsable) {
            errcoiciden += responsable.name + "\n";
        });
        message.guild.channels.get(autorole.logchat).send(errcoiciden);
    }
});
/*
var prefix = 'mL+';
var comandchat = "comandos"; var dialogchat = "canal-r37j";
client.on('message', message => { //solo en chat de comandos
    if(message.content.startsWith(prefix) && (message.channel.name == comandchat || message.channel.name == dialogchat)){
        if (message.content.startsWith(prefix + 'ping')) {
            message.channel.sendMessage('Its over 999!!!!');
        } else if (message.content.startsWith(prefix + 'test') && message.author.id != '192007091169263616') {
            message.channel.send("Testeame esta!");
        } else if (message.content.startsWith(prefix + 'adm') && message.author.id != '192007091169263616') {
            message.channel.send("Solo el Staff puede usar comandos de administrador");
        } else if (message.content.startsWith(prefix + 'testaviso')) {
            message.guild.channels.find("name", "chat-principal").sendMessage('Hola');
        } else if (message.content.startsWith(prefix + 'testsay')) {
            message.channel.sendMessage(message.content.slice(10));
        } else if (message.content.startsWith(prefix + 'admNewDB')) {
            message.client.guilds.find("name", "Server secreto de Marco").channels.find("name", "databases").sendMessage('database vacía').then(m => {
                message.channel.send("Se ha creado el lienzo " + m.id + " para el servidor " + message.guild.id);
            });
        } else if (message.content.startsWith(prefix + 'admReadDB')) {
            let entrada = message.content.split(" ");
            message.client.guilds.find("name", "Server secreto de Marco").channels.find("name", "databases").fetchMessage(pluralinfo.server["d"+message.guild.id][entrada[1]]).then(m => {
                message.channel.send(m.content);
            });
        } else if (message.content.startsWith(prefix + 'admReplaceDB')) {
            let entrada = message.content.split("\n");
            let section = entrada[0].split(" ");
            message.client.guilds.find("name", "Server secreto de Marco").channels.find("name", "databases").fetchMessage(pluralinfo.server["d"+message.guild.id][section[1]]).then(m => {
                m.edit(message.content.slice(entrada[0].length));
                message.channel.send("modificado exitosamente");
            });
        } else if (message.content.startsWith(prefix + 'admNewSDB')) {
            let entrada = message.content.split(" ");
            message.guild.channels.find("name", pluralinfo.Sserver.database).sendMessage('database vacía').then(m => {
                message.channel.send("Se ha creado el lienzo " + m.id + " en servidor local.");
            });
        } else if (message.content.startsWith(prefix + 'admeditmsg')) {
            let entrada = message.content.split("\n");
            let section = entrada[0].split(" ");
            message.guild.channels.find("name", section[1]).fetchMessage(section[2]).then(m => {
                m.edit(message.content.slice(entrada[0].length));
            });
        } else if (message.content.startsWith(prefix + 'analiza')) {
            message.channel.sendMessage('Tu id es ' + message.author.id);
        } else if (message.content.startsWith(prefix + 'comandos') || message.content.startsWith(prefix + 'commands')) {
            message.channel.sendMessage('Para que preguntas eso? \nMis comandos están en los mensajes anclados de este canal.');
        } else if (message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'info')) {
            message.channel.sendMessage('Yo? pues... aún no tengo nombre...');
            message.channel.sendMessage('Soy un Bot creado por ᴍᴀʀᴄᴏᴩᴏʟᴇ mediante javascript y Discord.js\nAhora mismo estoy en la versión 0.0.15, puedes ver mi proceso en '
                + message.guild.channels.find("name", "proceso-del-bot") + "\n _Marcopole, actualizame! >:c_");
        } else if (message.content.startsWith(prefix + 'fastpoll')) {
            let entrada = message.content.split("\n");
            let opciones = 0;
            let emotinames = ["Oland_flag", "Mord_flag", "Gracan_flag", "Fora_flag", "Oland_ico", "Mord_ico", "Gracan_ico", "Fora_ico"];
            let envio = ("**Hey! " + message.author.username + " ha iniciado una votación!**");
            for(lain = 1; lain < entrada.length; lain++){
                if(entrada[lain].startsWith('- ') && opciones < 8){
                    envio = (envio + "\n" +
                             message.client.guilds.find("name", "Server secreto de Marco").emojis.find("name", emotinames[opciones])
                             + entrada[lain].slice(1));
                    opciones = opciones + 1;
                } else {
                    envio = (envio + "\n" + entrada[lain]);
                }
            }
            message.guild.channels.find("name", "chat-principal").send(envio).then(m => {
            //message.channel.send(envio).then(m => {
                for(let opt = 0; opt < opciones; opt++){
                    m.react(m.client.guilds.find("name", "Server secreto de Marco").emojis.find("name", emotinames[opt]));
                }
            });
        }
    } else {
        if(message.channel.id == ""){
            switch(Math.round(Math.random() * 12)) {
            case 1:
                message.member.addRole(message.guild.roles.find("name", "Alive!"), "comando");
                message.member.removeRole(message.guild.roles.find("name", "Undead"), "comando");
            break;
            default:
            }
        }
    }
});*/

client.on("guildMemberAdd", (member) => {
    member.addRole(member.guild.roles.find("name", "newbye"), "Por seguridad");
    member.addRole(member.guild.roles.find("name", "ad"), "Recien llegado");
});
client.on("messageDelete", message => {
    let rprt = "__Mensaje eliminado__ de _" + message.author.username + "_ en " + message.channel + " \n**``" + message.content + "``**";
    message.guild.channels.find("name", "log").sendMessage(rprt);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        newMember.addRole(newMember.guild.roles.find("name", "🔊"));
        newMember.guild.channels.find("name", "log").sendMessage(newMember.user.username + "entró en los chats de voz");
    } else if(newUserChannel === undefined){
        newMember.removeRole(newMember.guild.roles.find("name", "🔊"));
        newMember.guild.channels.find("name", "log").sendMessage(newMember.user.username + "salió de los chats de voz");
    }
});
