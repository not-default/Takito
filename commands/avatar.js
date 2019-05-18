const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // >avatar @user

    let user = message.mentions.users.first() || message.author;

    message.delete();

    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)
    .setColor('RANDOM');

    if(!message.mentions.users.first()) return message.channel.send(avatarEmbed).then(function (message) {
        message.react('📷');
    });

    message.channel.send(avatarEmbed).then(function (message) {
        message.react('📷');
    });

};

module.exports.help = {
    name: 'avatar',
    aliases: ['pfp']
};
