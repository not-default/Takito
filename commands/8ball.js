const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    
    // >8ball question

    if(!args[2]) return message.channel.send(`**${message.author.username}**, please ask a full question!`);
    
    let replies = [
    "It Is Certain",
    "Most likely",
    "Without a doubt",
    "Signs point to yes",
    "Better not tell you now",
    "Ask again later",
    "Don't count on it",
    "My reply is no",
    "Outlook not so good"
];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    message.channel.send(`🎱 |  ${(replies[result])}, **${message.author.username}**.`);
};

module.exports.help = {
    name: '8ball',
    aliases: ['8b']
};
