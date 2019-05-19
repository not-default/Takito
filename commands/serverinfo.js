const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {

    //>serverinfo

    const user = message.author;
    const member = message.guild.member(user);

    let sIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
    .setTitle('Server Information')
    .setColor('#3D5198')
    .setThumbnail(sIcon)
    .setDescription(`Server Name **${message.guild.name}**`)
    .addField('Server created On', `${moment.utc(message.guild.createdAt).format('MMMM Do YYYY')}\n(${moment().diff(message.guild.createdAt, 'days')} days ago)`, true).addField('You Joined', `${moment.utc(member.joinedAt).format("MMMM Do YYYY")}\n(${moment().diff(member.joinedAt, 'days')} days ago)`, true)
    .addField('Total Members', message.guild.memberCount)

    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`);

    return message.channel.send(serverEmbed);

};

module.exports.help = {
    name: 'serverinfo',
    aliases: ['si']
};
