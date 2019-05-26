const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // >rank

    let rankEmbed = new Discord.RichEmbed()
    .setTitle('Ranks')
    .setColor('#9788BF')
    .setDescription(`
    \`Naturistic
    Forest Child
    Archer
    Youngin
    Mischievous
    Pyromaniac
    Inventor
    Engineer
    Coordinator
    Frost Sorcerer
    Novice Wizard
    Elder Wizard
    Night Elf Sorcerer
    Mysterious Gypsy
    Warlock
    Arcane Wizard
    Fluxible Enchanter
    Cinder Wizard
    Fire Spirit
    Elemental Shaman
    Fury Warrior
    Priest
    Healer
    Necromancer\``)
    .setFooter('Use >rank <rankname> to join a rank');

    const acceptedRoles = [
    '450954444771688450',
    '450954809013567488',
    '437717975655776257',
    '450955133787045890',
    '450955266943352832',
    '450955410321571850',
    '450955629817888771',
    '450955863960846336',
    '450956008672460800',
    '450956347165638667',
    '450956603806580737',
    '450956827287486474',
    '450957106540052491',
    '450957359758573568',
    '447193614444134400',
    '450957613778075648',
    '450957758947262475',
    '450957921753235456',
    '450958020818763777',
    '450958119745617920',
    '450958236917694464',
    '450953291396939799',
    '450958847998164992',
    '450953898627170316'];

    const existingRole = acceptedRoles.find(role => message.member.roles.has(role));
    const roleName = message.guild.roles.find(r=>r.name === args.join(" "));
    
    if(args[0] === 'clear') {
        message.member.removeRole(existingRole);
        return message.channel.send(`**${message.author.username}**, Your role has been removed successfully.`);
    };
    if(!args[0]) return message.channel.send(rankEmbed);
    if(!roleName) return message.channel.send('Please use a role that is listed. See listed roles using \`>rank\`');
    if(existingRole) await message.member.removeRole(existingRole);
    if(acceptedRoles.includes(roleName.id)) message.member.addRole(roleName);

    message.channel.send(`**${message.author.username}**, Your role has been changed to: \`${roleName.name}\``);
    

    
};
module.exports.help = {
    name: 'rank',
    aliases: ['r']
};
