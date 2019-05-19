const Discord = require('discord.js');
const errors = require('../utils/errors.js');

module.exports.run = async (client, message, args) => {

    //>close 

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPerms(message, 'MANAGE_MESSAGES');
    
    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
    }).then(() => {
        message.delete();
        message.channel.send(`**This channel has been closed!**`).then(function (message) {
            message.react('🔒');
        });
    });
  };

module.exports.help = {
    name: 'close',
    aliases: ['']
};
