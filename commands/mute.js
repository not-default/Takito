const Discord = require('discord.js');
const errros = require('../utils/errors.js');

module.exports.run = async (client, message, args) => {

    // >mute @user

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return errros.noPerms(message, 'MANAGE_MESSAGES');

    let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toMute) return message.reply("Couldn't find that user.");
    if(toMute.hasPermission('MANAGE_MESSAGES')) return message.reply("Can't mute them!");
    let muteRole = message.guild.roles.find(x => x.name === 'Muted');

    await(toMute.addRole(muteRole.id));
    message.channel.send(`<@${toMute.id}> has been muted.`).then(function (message) {
        message.react('🤐');
    });
};

module.exports.help = {
    name: 'mute'
};