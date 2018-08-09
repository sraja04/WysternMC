exports.run = async (client, message, args, level) => { 
  const msg = await message.channel.send(":ping_pong: Ping!");
  msg.edit(':stopwatch: Command laadde in: `' + `${msg.createdTimestamp - message.createdTimestamp}` + 'ms`' + ' \n :heartbeat: Snelheid bot: `' + `${client.ping}` + 'ms`');
};

module.exports.help = {
  name: "ping"
} 