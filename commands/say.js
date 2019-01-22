const Discord = require('discord.js');
const errors = require('../utils/errors');

module.exports.run = async (client, message, args) => {

    // >say

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPerms(message, 'MANAGE_MESSAGES');
    let botMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botMessage);
};

module.exports.help = {
    name: "say"
};