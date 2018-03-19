const Discord = require(`discord.js`)

const TOKEN = `${process.env.BOT_TOKEN}`;
const MOTTO = `Just Some BOT`;
const OWNER = `<@290159952784392202> | Hazmi53#1855`;
const DEVELOPER = `<@290159952784392202> | User1907#3936`;
const PREFIX = `.`;

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log(`Aku sudah siap, Komandan!`)
    bot.user.setUsername(`Bot Test 1907`)

    bot.user.setActivity(`${PREFIX}help | ${MOTTO}`);
})

bot.on("guildMemberAdd", member => {
    var guild = member.guild;
    bot.channels.get(`425219523247865870`).send(`Selamat datang ${member.user} di ${member.guild} server, disini adalah server dimana para bot nya ${OWNER} di uji coba.`)
});
bot.on("guildMemberRemove", member => {
    var guild = member.guild;
    bot.channels.get(`425219523247865870`).send(`Selamat tinggal ${member.user.username}, semoga kamu betah diluar sana :cry:.`)
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
           var Latency_Ping = `${Date.now() - message.createdTimestamp}`

           var API_Ping = (bot.ping).toFixed(2)

           var embed = new Discord.RichEmbed()
           .setColor(`RANDOM`)
           .setFooter(`© Hazmi35 | ${MOTTO}`)
           .setTitle(`:ping_pong: **PONG!**`)
           .addField(":signal_strength: | Latency:", Latency_Ping + "ms.", true)
           .addField(":joystick: | API:", API_Ping + "ms.", true)
           message.channel.send(embed);
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
            
    case "say":
        if (args[1]) {
           var say = args.slice(1).join(` `)
           message.delete()
           message.channel.send(say)
        }
        if (!args[1]) {
           message.channel.send(`:x: | **Usage :** ${PREFIX}say <kata-kata mu>`)
        }
        break;
            
    case "tanya": 
            if (args[1]) {
                 message.channel.send(jawaban[Math.floor(Math.random() * jawaban.length)]);
            }
            if (!args[1]) {
                message.channel.send(`:x: | **Usage :** ${PREFIX}tanya <pertanyaan>`);
            }
    break;
    }
});

bot.login(TOKEN)