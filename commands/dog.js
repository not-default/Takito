const Discord = require('discord.js');
const superagent = require('superagent');
const talkedRecently = new Set();

module.exports.run = async (client, message, args) => {

    // >dog

    if (talkedRecently.has(message.author.id)) {
        message.channel.send(`${message.author} Wait one minute before using this command again!`);
    } else {

        let{body} = await superagent
        .get(`https://random.dog/woof.json`);

        let dogEmbed = new Discord.RichEmbed()
        .setColor('#CCD6DD')
        .setTitle('🐶 Dog')
        .setImage(body.url);

        message.channel.send(dogEmbed);
    
    };

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);
    };

module.exports.help = {
    name: 'dog'
};