const Discord = require('discord.js');
const settings = require('../botsettings.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let logchannel = message.guild.channels.find('name', 'logs');
  if (!logchannel) return message.reply('?? ? Geen logs gevonden!');
  if (!message.member.hasPermission("BAN_MEMBERS")) return msg.reply(":no_entry_sign: ? Je hebt hier geen permissie voor!");
  if (reason.length < 1) return message.reply('?? ? Gelieve een reden op te geven!');
  if (message.mentions.users.size < 1) return message.reply('?? ? Geen speler getagd, @<speler>').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply(`<:redTick:${settings.redTick}> Deze persoon kan niet worden geband!`);
  message.guild.member(user).ban();

  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    
    .addField('Actie:', 'Ban')
    .addField('Gebruiker:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Actie uitvoerder:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reden:', reason);
    message.author.send('?? | Ban in #logs geregistreerd!')
  message.channel.send(`?? | De volgende gebruiker is verbannen: ${user.username}#${user.discriminator}`)
  return client.channels.get(logchannel.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban'
}; 