const Discord = require('discord.js');
const errors = require('../utils/errors.js');

module.exports.run = async (client, message, args) => {

    // >setnick @user name

    if(!message.member.hasPermission('MANAGE_NICKNAMES')) return errors.noPerms(message, 'MANAGE_NICKNAMES');

    let nUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!nUser) return message.channel.send(`**${message.author.username}**, Please specify a user that is on this server.`);

    let nickname = args.join(" ").slice(22);
    if(!nickname) return message.reply("Please specify a name.");

    if(nUser.hasPermission('MANAGE_NICKNAMES')) return message.channel.send("That person can't have their name changed.");
    
    message.delete();

    await(nUser.setNickname(nickname));
    return message.channel.send(`Their nickname was successfully changed!`);


};
module.exports.help = {
    name: 'setnick',
    aliases: ['']
};
