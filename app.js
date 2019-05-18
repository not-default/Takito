/// Required Libraries ///
const config = require('./config.json'); // requires prefix and bot token
const Discord = require('discord.js'); // requires discord.js
const ddiff = require('return-deep-diff'); // requires ddiff
const moment = require('moment');
const fs = require('fs'); // require files

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Command Handler Setup
fs.readdir('./commands', (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
        return console.log(' [ LOG ] couldn\'t find commands!');
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[ LOG ] ${f} loaded!`);
        client.commands.set(props.help.name, props);
        // Aliases
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name)
        });
    });
});

//////////////////////////

// Client Event: On Ready //
client.on('ready', async () => {
    console.log(`\n[ LOG ] ${client.user.username} Launched... \n        discord.js ${Discord.version}`);
    client.user.setStatus('online'); // Change the status of the Bot Online, Idle, dnd, Invisible.
function setActivity() {
    //Variable Array for what the setGame can be set to
    var Gameinfo = [`${config.prefix}help`, `Javascript` // Change these to what you want, add as many or as few as you want to
    ]

    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)]; //Random Math to set the setGame to something in the GameInfo array

    client.user.setActivity(info) // "playing Game" '...' Sets the setGame to what the info Random math picked from the GameInfo Array

};

setInterval(setActivity, 1000 * 60 * 10) //sets and picks a new game every 10 minutes
});

////////////////////////////

// Server Join and Leave messages //
client.on('guildMemberAdd', member => {

    var role = member.guild.roles.find(r => r.name === 'Commoner');
    member.addRole (role);

    member.guild.channels.find(x => x.name === 'general-chat').send(`:beginner: Welcome ${member.user} to **${member.guild.name}**, please head over to ${member.guild.channels.find("name", "welcome")} for more information about this server!`).then(function (message) {
        message.react('🙌');
    });

});

client.on('guildMemberRemove', member => {

    member.guild.channels.find(x => x.name === 'general-chat').send(`We're sorry to see you go ${member.user.username}!`);

});

////////////////////////////////////

// Events //

// join //
client.on('guildMemberAdd', member => {

const usericon = member.user.displayAvatarURL;
const message = Discord.RichEmbed;

let joinembed = new Discord.RichEmbed()
.setColor('#77B255')
.setDescription(`📥 **${member.user.tag}** has \`joined\` the server.`)
.setFooter(`User Join`, `${usericon}`).setTimestamp(message.createdAt);

member.guild.channels.find(x => x.name === 'action-log').send(joinembed);

});

// Leave //
client.on('guildMemberRemove', member => {

    const usericon = member.user.displayAvatarURL;
    const message = Discord.RichEmbed;

    let leaveEmbed = new Discord.RichEmbed()
    .setColor('#DD2E44')
    .setDescription(`📤 **${member.user.tag}** has \`left\` the server.`)
    .setFooter(`User Leave`, `${usericon}`).setTimestamp(message.createdAt);

    member.guild.channels.find(x => x.name === 'action-log').send(leaveEmbed);

})

// Nickname Change //
client.on('guildMemberUpdate',(oMember, nMember) => {

    if(oMember.displayName === nMember.displayName) return;

    const usericon = oMember.user.displayAvatarURL;
    const message = Discord.RichEmbed;

    let nickembed = new Discord.RichEmbed()
    .setColor("#AFB8BF")
    .setDescription(`🔖 **${oMember.user.tag}** has changed their \`nickname\` to: **${nMember.displayName}**.`)
    .setFooter(`Name Change`, `${usericon}`).setTimestamp(message.createdAt);

    oMember.guild.channels.find(x => x.name === 'action-log').send(nickembed);
  });

////////////////////////////////////

// Perms Stuff

client.on('message', async message => {

    if(message.author.bot) return; // If the message author is a bot, return.
    if(message.channel.type === 'dm') return message.reply(`**${message.author.username}**, You can not use commands within direct messages.`); // If message sent within DM's, return.
    

    let prefix = config.prefix; // Let prefix = whatever the prefix is in the config file.
    if(!message.content.startsWith(prefix)) return // If message does NOT start with a prefix, return.
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
    if (commandfile) commandfile.run(client,message,args);

});

client.login(process.env.BOT_TOKEN);
