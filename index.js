const Discord = require(`discord.js`)

const TOKEN = `NDI1MTgzODQ1NjY3ODMxODA4.DZDwbA.jPGPzKFUNpKQDneqWJp2o2KiE8w`;
const MOTTO = `Just Some BOT`;
const OWNER = `<@290159952784392202> | Hazmi53#1855`;
const PREFIX = `.`;

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log(`Aku sudah siap, Komandan!`)
    bot.user.setUsername(`Bot Test 1907`)

    bot.user.setActivity(`${PREFIX}help | ${MOTTO}`);
})

bot.on("guildMemberAdd", member => {
    var guild = member.guild;
    bot.channels.get(`425204222204575767`).send(`Selamat datang ${member} di ${member.guild} server, disini adalah server dimana para bot nya ${OWNER} di uji coba.`)
});
bot.on("message", function(message) {
    if (message.channel.type === `dm`) return;

    if (message.author.bot) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ")

    switch (args[0].toLocaleLowerCase()) {
        default:
          message.channel.send(`:x: | **Command tidak di ketahui tulis ${PREFIX}help untuk help**`)
        break;

        case "ping":
          message.channel.send(":ping_pong: **Pong!** " + `${Date.now() - message.createdTimestamp}ms`)
        break;

        case "help":
          var embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`HELP MENU`)
            .addField(`Utilitas`, "``help`` ``ping``")
            .addBlankField()
            .setFooter(`© Hazmi35 | Just Some BOT`)
          message.channel.send(embed)
        break;

        case "shutdown":
          if (message.author.id == `290159952784392202`) {
              message.channel.send(`:white_check_board: | Ok, i will shutdown my system`)
              .then(process.exit(1))
          }
          if (message.author.id !== `290159952784392202`) {
              return message.reply(`**Sorry**, but it's seems like you are not the bot owner.`)
          }
        break;
    }
});

bot.login(TOKEN)