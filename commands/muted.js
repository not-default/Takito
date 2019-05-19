const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // >muted

    let role = message.guild.roles.find(x => x.name === 'Muted');
    let membersWithRole = (role).members;
    let notMuted = false || null || undefined || '' || 0 || -0;

    let noMutedEmbed = new Discord.RichEmbed()
    .setColor('#CCD6DD')
    .setTitle('🔊 There are no users muted on this server.');
    if(membersWithRole.size === 0) return message.channel.send(noMutedEmbed).then(function (message) {
        message.react('👍');
    });

    let mutedEmbed = new Discord.RichEmbed()
    .setColor('#DD2E44')
    .setTitle(`🔇 Users ${role.name}`)
    .setDescription(membersWithRole.array().join('\n'));

    return message.channel.send(mutedEmbed);

};

module.exports.help = {
    name: 'muted',
    aliases: ['hushed']
};
