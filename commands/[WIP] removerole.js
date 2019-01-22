const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //removerole @user role

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("I couldn't find that user.");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("I couldn't find that role.");

      message.delete();
  
    if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
    await(rMember.removeRole(gRole.id));
  
      message.channel.send(`${gRole.name} role removed.`);
    }
  
  module.exports.help = {
    name: "removerole"
  }