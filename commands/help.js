const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // >help
   
    // more Help.

    if(args[0] === '8ball'){
        message.channel.send('**Usage:** \`>8ball <question>\`');
        return;
    };

    if(args[0] === 'avatar'){
        message.channel.send('**Usage:** \`>avatar <user>\`');
        return;
    };

    if(args[0] === 'botinfo'){
        message.channel.send('**Usage:** \`>botinfo\`');
        return;
    };

    if(args[0] === 'cat'){
        message.channel.send('**Usage:** \`>cat\`');
        return;
    };

    if(args[0] === 'choose'){
        message.channel.send('**Usage:** \`>choose <Item 1> | <Item 2>\`');
        return;
    };

    if(args[0] === 'close'){
        message.channel.send('**Usage:** \`>close\`');
        return;
    };

    if(args[0] === 'dog'){
        message.channel.send('**Usage:** \`>dog\`');
        return;
    };

    if(args[0] === 'help'){
        message.channel.send('**Usage:** \`>help <page number>\`');
        return;
    };

    if(args[0] === 'mute'){
        message.channel.send('**Usage:** \`>mute <user>\`');
        return;
    };

    if(args[0] === 'muted'){
        message.channel.send('**Usage:** \`>muted\`');
        return;
    };

    if(args[0] === 'open'){
        message.channel.send('**Usage:** \`>open\`');
        return;
    };

    if(args[0] === 'ping'){
        message.channel.send('**Usage:** \`>ping\`');
        return;
    };

    if(args[0] === 'say'){
        message.channel.send('**Usage:** \`>say <statment>\`');
        return;
    };

    if(args[0] === 'serverinfo'){
        message.channel.send('**Usage:** \`>serverinfo\`');
        return;
    };

    if(args[0] === 'setnick'){
        message.channel.send('**Usage:** \`>setnick <user> <name>\`');
        return;
    };

    if(args[0] === 'suggest'){
        message.channel.send('**Usage:** \`>suggest <suggestion>\`');
        return;
    };

    if(args[0] === 'unmute'){
        message.channel.send('**Usage:** \`>unmute <user>\`');
        return;
    };

    if(args[0] === 'uptime'){
        message.channel.send('**Usage:** \`>uptime\`');
        return;
    };

    if(args[0] === 'userinfo'){
        message.channel.send('**Usage:** \`>userinfo <user>\`');
        return;
    };

    // Pages //

    if(args[0] === '1'){
        message.react('💬')

        // Page 1
        let page1HelpEmbed = new Discord.RichEmbed()
        .setColor('#9788BF')
        .addField('Page 1 | Core commands', "If you need to know more information on a command use `>help <command>`.")
        .addField('>ping', "The bot's ping.")
        .addField('>help', "Shows you the help menu.")
        .addField('>suggest', 'Send a suggestion to the server staff.')
        .addField('>invite', 'Shows your permanent invite link.')
        .setFooter('Takito | Made by Default | Inspired by FSY and others.');

        message.author.send(page1HelpEmbed);
        return;
    };

    if(args[0] === '2'){
        message.react('💬')

        // page 2
        let page2HelpEmbed = new Discord.RichEmbed()
        .setColor('#9788BF')
        .addField('Page 2 | Fun Commands', "If you need to know more information on a command use `>help <command>`.")
        .addField('>8ball', "Asks the 8ball a question.")
        .addField('>cat', "Shows a random cat.")
        .addField('>choose', 'Choose between multiple things.')
        .addField('>dog', "Shows a random dog.")
        .setFooter('Takito | Made by Default | Inspired by FSY and others.');

        message.author.send(page2HelpEmbed);
        return;
    };

    if(args[0] === '3'){
        message.react('💬')

        // page 2
        let page3HelpEmbed = new Discord.RichEmbed()
        .setColor('#9788BF')
        .addField('Page 3 | Information Commands', "If you need to know more information on a command use `>help <command>`.")
        .addField('>avatar', "Shows a users avatar.")
        .addField('>botinfo', "Shows information about the bot.")
        .addField('>muted', "Shows the muted users on this server.")
        .addField('>serverinfo', "Shows information about the server.")
        .addField('>userinfo', "Shows information about a specific user.")
        .setFooter('Takito | Made by Default | Inspired by FSY and others.');

        message.author.send(page3HelpEmbed);
        return;
    };

    if(args[0] === '4'){
        message.react('💬')

        // page 2
        let page4HelpEmbed = new Discord.RichEmbed()
        .setColor('#9788BF')
        .addField('Page 4 | Moderation Commands', "If you need to know more information on a command use `>help <command>`.")
        .setFooter('Takito | Made by Default | Inspired by FSY and others.');

        message.author.send(page4HelpEmbed);
        return;
    };
    
    if(args[0] === '5'){
        message.react('💬')

        // page 2
        let page5HelpEmbed = new Discord.RichEmbed()
        .setColor('#9788BF')
        .addField('Page 5 | Miscellaneous Commands', "If you need to know more information on a command use `>help`.")
        .addField('>goc', "Gives you the `GraalClassic` role.")
        .setFooter('Takito | Made by Default | Inspired by FSY and others.');

        message.author.send(page5HelpEmbed);
        return;
    };

    message.react('💬')
    let helpEmbed = new Discord.RichEmbed()
    .setColor('#9788BF')
    .addField('Help Menu', 'To see a certain page, just add the page number after the `>help` command.\nLike this: `>help 2`')
    .addField('Page 1 | Core', 'Core server commands.')
    .addField('Page 2 | Fun', 'fun commands.')
    .addField('Page 3 | Information', 'Information commands.')
    .addField('Page 4 | Moderation', 'Moderation commands.')
    .addField('Page 5 | Miscellaneous', "Commands that don't have a home.")
    .setFooter('Takito | Made by Default | Inspired by FSY and others.');
    
    message.author.send(helpEmbed);
    return;

};

module.exports.help = {
    name: 'help',
    aliases: ['h']
};
