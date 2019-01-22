const Discord = require('discord.js');
const superagent = require('superagent');
const talkedRecently = new Set();

module.exports.run = async (client, message, args) => {

    // >cat

    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`${message.author} Wait one minute before using this command again!`);
    } else {

        let{body} = await superagent
        .get(`http://aws.random.cat/meow`);
      
        let catEmbed = new Discord.RichEmbed()
        .setColor('#FFCB4E')
        .setTitle('🐱 Cat')
        .setImage(body.file);
      
        message.channel.send(catEmbed);
    
    };

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);
    };

module.exports.help = {
    name: 'cat'
};
