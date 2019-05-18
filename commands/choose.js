const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    //>choose this | that

    args = args.join(' ').split(/\s*\|\s*/g);
    if (args.length <2) return message.channel.send(`❌ | **${message.author.username}**, please pick at least two things for me to choose from!`);

    const randomIndex = Math.floor(Math.random() * args.length);
    const randomPick = args[randomIndex];
    
    message.channel.send(`🤔 |  **${message.author.username}**, I choose **${randomPick}**!`);
};

module.exports.help = {
    name: 'choose',
    aliases: ['pick']
};
