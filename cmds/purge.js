exports.run = (client, message, args, tools) => {
  if (isNaN(args[0])) return message.channel.send('🤖 | Geef een getal in!');
  if (args[0] > 100) return message.channel.send('🤖 | Gelieve een getal onder de 100');
  message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`🤖 | Succesvol \`${messages.size}/${args[0]}\` berichten verwijderd!**`).then(msg => msg.delete({
      timeout: 50000
    }))) 
}
module.exports.help = {
  name: "purge"
} 