/// Required Libraries ///
const config = require('./config.json'); // requires prefix and bot token
const Discord = require('discord.js'); // requires discord.js
const ddiff = require('return-deep-diff'); // requires ddiff
const moment = require('moment');
const fs = require('fs'); // require files

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

// Command Handler Setup
fs.readdir('./commands', (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split('.').pop() === 'js');
    if (jsfile.length <= 0){
        console.log('couldn\'t find commands.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[ LOG ] ${f} loaded!`);
        client.commands.set(props.help.name, props);
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
    if (config.debugMode === '1') {
        console.log(`[ LOG ] set Activity set to ( ${info} )`) //Logs to console what the setGame was set as.
    };
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

// // Ban //
// client.on('guildBanAdd', (guild, user) => {

//     //const usericon = guild.user.displayAvatarURL;
//     const message = Discord.RichEmbed;

//     let banembed = new Discord.RichEmbed()
//     .setColor('#292F33')
//     .setDescription(`🏴 **${user.username}** has been \`banned\` from the server.`)
//     .setFooter(`user Ban`, ``).setTimestamp(message.createdAt);

//     guild.channels.find(x => x.name === 'action-log').send(banembed);

//}); 
// UnBan //
//client.on("guildBanRemove", (guild, user) => {
//
  //  const usericon = user.user.displayAvatarURL;
//    const message = Discord.RichEmbed;
//
//    let unbanembed = new Discord.RichEmbed()
//   .setColor("#E1E8ED")
//   .setDescription(`🏳 **${user.usertag}** has been \`unbanned\` from the server.`)
//    .setFooter(`user Ban`, ``).setTimestamp(message.createdAt);
//
//    user.guild.channels.find("name", "action-log").send(unbanembed);
//
//});

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

    let commandfile = client.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(client,message,args);

});

    // Auto Message //
    var NOTIFY_CHANNEL;
    client.on('ready', () => {
        NOTIFY_CHANNEL = client.channels.find('id', '397928222555242501'); // Channel to send notification
    });
    
    let replies = [
        //":gear: |  **Tip:** text"
        //":gear: |  **Tip:** After your permanent invite link gets 10 unique uses you will receive the **Inviter** role! Type \`>invite\` to view your permanent invite link!",
        ":gear: |  **Tip:** You can join a private one on one voice channel with any other member on this server.", 
        ":gear: |  **Tip:** You can report a user with the command `>report @user reason`.",
        ":gear: |  **Tip:** If you need help with commands just type `>help` and check your DM's!",
        ":gear: |  **Tip:** You can watch videos through discord by clicking on them.",
        ":gear: |  **Tip:** Type `>invite` to view your permanent invite link.",
        ":gear: |  **Tip:** You can view users information with `>userinfo @user` as well as server information `>serverinfo` and, bot information `>botinfo`.",
        ":gear: |  **Tip:** If you want to recive updates for GraalOnline Classic type the command `>goc`. If you want to stop reciving updates just type the command again.",
        ":gear: |  **Tip:** Use the command `>suggest Suggestion` to send a suggestion to the servers staff!",
        ":gear: |  **Tip:** If you want to change your colour use the command `?ranks` to view your options.",
        ":gear: |  **Tip:** To mute channels on mobile, press and hold on the desired channel you would like to mute, on PC right click the channel you want muted, if you want to mute the whole server do the action on the server icon.",
        ":gear: |  **Tip:** You can use HTML format within Graal guild chat. You must format your brackets like so: `<\\text>`",
        ":gear: |  **Tip:** Subscribe to VBanished on youtube!\nhttps://www.youtube.com/user/VBanished",
        ":gear: |  **Tip:** Typing `unstick me` in feedback will instantly warp you back to Angel Clan.",
        ":gear: |  **Tip:** If you need any extra help with a command just use add 'help' after the command like this: `>help <command>`"
    
    ];

  //  let result = Math.floor((Math.random() * replies.length));

    const START_DATE = '2018-10-10'; // Date used as the starting point for multi-hour intervals, must be YYYY-MM-DD format
    const START_HOUR = 19; // Hour of the day when the timer begins (0 is 12am, 23 is 11pm), used with START_DATE and INTERVAL_HOURS param
    const INTERVAL_HOURS = 37; // Trigger at an interval of every X hours
    const TARGET_MINUTE = 30; // Minute of the hour when the chest will refresh, 30 means 1:30, 2:30, etc.
    const OFFSET = 0; // Notification will warn that the target is X minutes away
    
    // Don't change any code below
    const NOTIFY_MINUTE = (TARGET_MINUTE < OFFSET ? 60 : 0) + TARGET_MINUTE - OFFSET;
    const START_TIME = new Date(new Date(START_DATE).getTime() + new Date().getTimezoneOffset() * 60000 + START_HOUR * 3600000).getTime();
    
    setInterval(function() {
        var d = new Date();
        let result = Math.floor((Math.random() * replies.length));
        if(Math.floor((d.getTime() - START_TIME) / 3600000) % INTERVAL_HOURS > 0) return; // Return if hour is not the correct interval
        if(d.getMinutes() !== NOTIFY_MINUTE) return; // Return if current minute is not the notify minute
        NOTIFY_CHANNEL.send(replies[result]);
    }, 60 * 1000); // Check every minute

    //message react
    

client.login(process.env.BOT_TOKEN);