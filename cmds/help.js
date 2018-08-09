const Discord = module.require("discord.js");
let hinfo = ("Lijst met alle commando's!\n\n")
let hcommands = ("**Avatar**\nLaat je de avatar van een gebruiker zien!\n**Ban <mention> <reden>**\nVerban een gebruiker\n**Help**\nLaat je dit menu zien!\n**Kick <mention> <reden>**\nKick een gebruiker\n**Mute <mention> <(aantal secondes)(s)**\nMute een gebruiker!\n**Ping**\nKijk hoe snel je bot is!\n**Purge (aantal)**\nVerwijder een groot aantal berichten!\n**Alert**\nLaat je bot typen!\n")
module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
    .setThumbnail(bicon)
        .setColor("#FFBF00")
        .addField("**WysternMC | Help:**", hinfo)
        .addField("\n**Commands**", hcommands)
        .setFooter(`© WysternMC - Alle rechten voorbehouden`);




        message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help"
} 