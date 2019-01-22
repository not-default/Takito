const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args) => {

    //suggest suggestion

    message.delete()
    if(!args [2]) return message.reply("please submit a full statement.");

    let suggestion = args.slice(0).join(" ");

    let suggestEmbed = new Discord.RichEmbed()
    .setColor('#99AAB5')
    .addField('🗒 Suggestion', suggestion)
    .setFooter(`Suggested by: ${message.author.username}`);

    let suggestschannel = message.guild.channels.find(x => x.name === 'suggestions');
    if(!suggestschannel) return message.channel.send("Couldn't find suggestions channel.");
    message.channel.send(`🗒 | **${message.author.username}**, Your suggestion has been received and is being reviewed!`);


    message.delete().catch(O_o=>{});
    suggestschannel.send(suggestEmbed).then(function (message) {
        message.react('✅').then(r => message.react('❎'));
    });    

};

module.exports.help = {
    name: "suggest"
};