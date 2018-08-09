const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let logchannel = message.guild.channels.find('name', 'logs');
  if (!message.member.hasPermission("KICK_MEMBERS")) return msg.reply(":no_entry_sign: | Je hebt hier geen permissie voor!");
  if (!logchannel) return message.reply('\n🤖 | Geen logs gevonden!');
  if (reason.length < 1) return message.reply('\n🤖 | Gelieve een reden op te geven!');
  if (message.mentions.users.size < 1) return message.reply('\n🤖 | Geen speler getagd, @<speler>').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('\n🤖 | Gebruiker kan niet worden gekickt');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x0000FF)
    .setTimestamp()
    
    .addField('Actie:', 'Kick')
    .addField('Gebruiker:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Actievoerder:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reden', reason);
    message.author.send('🤖 | Gelukt! Kick in #logs geregistreerd!')
  message.channel.send(`🤖 | De volgende gebruiker is gekickt: ${user.username}#${user.discriminator}`)
  return client.channels.get(logchannel.id).send({embed});
};   
            
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick'
}; 