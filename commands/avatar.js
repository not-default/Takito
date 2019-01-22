const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

    // >avatar @user

    if(!message.mentions.users.first()) return message.reply("Please specify a user.");
    let user = message.mentions.users.first() || message.author;

    message.delete();

    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)
    .setColor('RANDOM');

    message.channel.send(avatarEmbed).then(function (message) {
        message.react('📷');
    });

};

module.exports.help = {
    name: 'avatar'
};