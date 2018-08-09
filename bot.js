const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Oepsie, er zijn nog geen commands!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);

    jsfiles.forEach((f, i) => {    
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

	bot.on("ready", () => {
    bot.user.setGame('WysternMC', 'https://wysternmc.nl');
    
    }); 

	bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find('name', 'welkom');
    if (!channel) return;

	let autorole = member.guild.roles.find('name', "Speler");
	member.addRole(autorole); 

    const embed = new Discord.RichEmbed()
        .setColor("#FFBF00")
        .setAuthor(``, `${member.user.displayAvatarURL}`)
        .setDescription(`Welkom @${member.user.tag} op de WysternMC discord server!\nHeeft u vragen? Contacteer dan een van onze medewerkers.`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .addBlankField(true)
        .setTimestamp()
        .setFooter(`© WysternMC - Alle rechten voorbehouden`)
    channel.send({ embed });

}); 
	
	bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
   
}); 
	
	bot.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name', 'welkom');
    if (!channel) return;
    const embed = new Discord.RichEmbed()
        .setColor("#FFBF00")
        .setAuthor(``, `${member.user.displayAvatarURL}`)
        .setDescription(`Totziens @${member.user.tag} ! Hopelijk zien we je de volgende keer `)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .addBlankField(true)
        .setTimestamp()
        .setFooter(`© MysternMC - Alle rechten voorbehouden`)
    channel.send({ embed });
}); 
bot.login(botSettings.token); 