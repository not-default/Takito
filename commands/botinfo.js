const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');

module.exports.run = async (client, message, args) => {

    // >botinfo

    let bIcon = client.user.displayAvatarURL;

    let botEmbed = new Discord.RichEmbed()
    .setTitle('Bot Information')
    .setColor("#9788BF")
    .setThumbnail(bIcon)
    .setDescription(`Bot name **${client.user.username}**`)
    .addField("Joined on", `${moment.utc(client.joinedAt).format("MMMM Do YYYY")}`, true).addField("Created On", `${moment.utc(client.user.createdAt).format("MMMM Do YYYY")}`, true)

    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator} | Created by Default | Profile picture: Cricut`);

    return message.channel.send(botEmbed); 
    
};

module.exports.help = {
    name: "botinfo"
};