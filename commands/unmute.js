const Discord = require('discord.js');
const errors = require('../utils/errors');

module.exports.run = async (client, message, args) => {

    // >unmute @user

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPerms(message, 'MANAGE_MESSAGES');
    
    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toMute) return message.reply("Couldn't find that user.");
    if(toMute.hasPermission('MANAGE_MESSAGES')) return message.reply("They couldn't be muted in the first place, why are you trying?");
    let muteRole = message.guild.roles.find(x => x.name === 'Muted');

    toMute.removeRole(muteRole.id);
    message.channel.send(`<@${toMute.id}> has been unmuted!`).then(function (message) {
        message.react('🎉');
    });
};

module.exports.help = {
    name: 'unmute'
};