const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {

    // >userinfo @user
    
    let user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);
    let uIcon = user.displayAvatarURL;
    let userEmbed = new Discord.RichEmbed()

    .setColor('RANDOM')
    .setThumbnail(uIcon)
    .setAuthor(`${member.user.tag} | ${member.displayName} (${member.user.id})`)
    .setDescription(`Playing: ${member.user.presence.game ? `**${member.user.presence.game.name}**` : "**Nothing.**"}`, true)
    
    .addField('Joined server on', `${moment.utc(member.joinedAt).format('MMMM Do YYYY')}\n(${moment().diff(member.joinedAt, 'days')} days ago)`, true).addField('Joined Discord on', `${moment.utc(member.user.createdAt).format('MMMM Do YYYY')}\n(${moment().diff(member.user.createdAt, 'days')} days ago)`, true)
    .addField('Status', `${user.presence.status}`, true)

    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`);

    if(!message.mentions.users.first()) return message.channel.send(userEmbed).then(function (message) {
        message.react('📖');
    });

    return message.channel.send(userEmbed).then(function (message) {
        message.react('📖');
    });

};

module.exports.help = {
    name: 'userinfo',
    aliases: ['ui']
};
