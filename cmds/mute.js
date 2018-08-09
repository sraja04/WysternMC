const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":warning: | Sorry, maar je hebt deze permissies niet!");
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("🤖 | Gebruiker onvindbaar!.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("🤖 | Hmm, deze gebruiker heeft dezelfde rechten als jou, dus muten gaat niet werken he!");
    let muterole = message.guild.roles.find(`name`, "Muted");

    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.reply("🤖 | Je moet wel even een tijd benoemen!");

    await (tomute.addRole(muterole.id));
    message.reply(`🤖 | <@${tomute.id}> is gemute voor ${ms(ms(mutetime))}`);

    setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`🤖 | <@${tomute.id}> is unmuted!`);
    }, ms(mutetime));

}

exports.conf = {
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    name: "mute",
    description: 'Denies the user from speaking for the time provided.',
    usage: 'mute [time: hours, minitues, or days.]'
} 