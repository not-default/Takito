const Discord = require('discord.js');
const errors = require('../utils/errors.js');

module.exports.run = async (client, message, args) => {

    //>open

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPerms(message, 'MANAGE_MESSAGES');

    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
    }).then(() => {
        message.delete();
        message.channel.send(`**This channel has been reopend**`).then(function (message) {
            message.react('🔓');
        });
    });
  };

module.exports.help = {
    name: 'open'
};