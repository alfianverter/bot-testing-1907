const Discord = require(`discord.js`);
const Cuaca = require(`weather-js`);
const moment = require("moment");
const momentDurationFormat = require("moment-duration-format");
const random = require(`random-animal`);
var request = require("request");
const {get} = require("snekfetch");
const snekfetch = require('snekfetch');

const TOKEN = `${process.env.BOT_TOKEN}`;
const MOTTO = `Just Some BOT`;
const OWNER = `<@290159952784392202> | Hazmi53#1855`;
const DEVELOPER = `<@424183630491942913> | User1907#3936`;
const PREFIX = `.`;

var bot = new Discord.Client();

var jawaban = [
    "Ya",
    "Tidak",
    "Mungkin",
    "Gak Tau",
    "Iya",
    "Enggak",
    "Mana gua tau!",
    "Ya enggak lah!",
    "Ya iyalah!",
    "Menurutku sih, tidak",
    "Menurutku sih, ya",
    "Maaf, gua gak tau",
    "Maaf, saya gak tau",
    "Maaf, aku gak tau",
    "Menurut saya sih, tidak",
    "Menurut saya sih, ya",
    "Menurut gua sih, tidak",
    "Menurut gua sih, ya"
]

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
            .addField(`Utilitas`, "``help`` ``ping`` ``cuaca`` ``stats`` ``avatar`` ``userinfo`` ``serverinfo``")
            .addField(`Fun`, "``say`` ``tanya`` ``kirimpesan`` ``ratewaifu`` ``ratehusbando``")
            .addField(`Moderation`, "``kick`` ``ban``")
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
            
        case "ban":
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(':x: **Anda tidak memiliki izin untuk itu!**');
            var member = message.mentions.members.first();
            if (!member) return message.channel.send(`:x: | **Usage :** ${PREFIX}ban <@member>`)
            member.ban()
                message.channel.send(`:white_check_mark: **${member.user} Berhasil di ban**`)
        break;
        
        case "kick":
            if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(':x: **Anda tidak memiliki izin untuk itu!**');
            var member = message.mentions.members.first();
            if (!member) return message.channel.send(`:x: | **Usage :** ${PREFIX}kick <@member>`)
            member.kick()
                message.channel.send(`:white_check_mark: **${member.user} Berhasil di kick**`)
        break;
 
         case "stats":
            var uptime = moment.duration(bot.uptime).format(" D [Hari], H [Jam], m [Menit], s [Detik]");
            var embed = new Discord.RichEmbed()
                .addField(`📂 Guilds / Servers :`, `${bot.guilds.size} Guilds / Servers`)
                .addField(`👥 Users :`, `${bot.users.size} Users`)
                .addField(`🕘 Uptime :`, `${uptime}`)
                .addField(`💾 Ram used :`, `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)
                .addField(`👑 Owner : `, `${OWNER}`)
                .addField(`⚙ Developer :`, `${DEVELOPER}`)
                .setColor(`RANDOM`)
                .setFooter(`© Hazmi35 | ${MOTTO}`)
            message.channel.send(embed)
        break;
            
         case "ratewaifu":
            var waifu = args.slice(1).join(' ')
            if (!waifu) {
                return message.channel.send(`:x: | **Usage :** ${PREFIX}ratewaifu <Waifu>`)
            }

             var ranking = ["0/10", "1/10", "2/10", "3/10", "4/10", "5/10", "6/10", "7/10", "8/10", "9/10", "10/10"]
             var rating = ranking[Math.floor(Math.random() * ranking.length)];

             message.channel.send(`:thinking: | **${message.author.username}**, Saya berikan ${rating} kepada ${waifu}`)
        break;
            
        case "ratehusbando":
            var husbando = args.slice(1).join(' ')
            if (!husbando) {
                return message.channel.send(`:x: | **Usage :** ${PREFIX}ratehusbando <Husbando>`)
            }

             var ranking = ["0/10", "1/10", "2/10", "3/10", "4/10", "5/10", "6/10", "7/10", "8/10", "9/10", "10/10"]
             var rating = ranking[Math.floor(Math.random() * ranking.length)];

             message.channel.send(`:thinking: | **${message.author.username}**, Saya berikan ${rating} kepada ${husbando}`)
        break;
 
        case "serverinfo":
            var embed = new Discord.RichEmbed()
                .setTitle(`${message.guild}`)
                .setColor(`RANDOM`)
                .setDescription(`Server info untuk: ${message.guild}`)
                .setThumbnail(message.guild.iconURL)
                .setFooter(`© Hazmi35 | ${MOTTO}`)

                .addField("Channels:", `${message.guild.channels.size}`, true)
                .addField("Members:", `**[${message.guild.members.size}]**`, true)
                .addField("Roles:", `${message.guild.roles.size}`, true)
                .addField("Region:", `${message.guild.region}`, true)
                .addField("ID:", `${message.guild.id}`, true)
                .addField("Created At:", `${message.guild.createdAt}`, true)
            message.channel.send(embed)
        break;
            
        case "avatar":
           var member = message.mentions.members.first()
              if (!member) {
                var embed = new Discord.RichEmbed()
                .setTitle(`${message.author.tag}`)
                .setDescription(`[Direct link](${message.author.avatarURL})`)
                .setColor(`RANDOM`)
                .setFooter(`© Hazmi35 | ${MOTTO}`)
                .setImage(message.author.avatarURL)
                return message.channel.send(embed)
           }
           var embed = new Discord.RichEmbed()
               .setTitle(`${member.user.tag}`)
               .setDescription(`[Direct Link](${member.user.avatarURL})`)
               .setColor(`RANDOM`)
               .setFooter(`© Hazmi35 | ${MOTTO}`)
               .setImage(member.user.avatarURL)
            message.channel.send(embed)
        break;
            
         case "userinfo":
        var member = message.mentions.members.first();
           if (!member) {
             var embed = new Discord.RichEmbed()
             .setColor(`RANDOM`)
             .setTitle(`**User Info untuk : ${message.author.tag}**`)
             .setFooter(`© Hazmi35 | ${MOTTO}`)
             .setThumbnail(message.author.avatarURL)
             .addField("ID :", `${message.author.id}`)
             .addField("Status :", `${message.author.presence.status}`)
             .addField("Mention :", `${message.author}`)
             .addField("Account created at:", `${message.author.createdAt}`)
             .addField(`Joined ${message.guild.name} at :`, `${message.member.joinedAt}`)
             .addField("Roles :", message.member.roles.map(r => r.name).join(", "))
             .addField("Guild nickname :", `${message.member.displayName}`)
             return message.channel.send(embed)
        }
        var embed = new Discord.RichEmbed()
         .setColor(`RANDOM`)
         .setTitle(`**User Info untuk: ${member.user.tag}**`)
         .setFooter(`© Hazmi35 | ${MOTTO}`)
         .setThumbnail(member.user.avatarURL)
         .addField("ID :", `${member.id}`)
         .addField("Status :", `${member.presence.status}`)
         .addField("Mention :", `${member.user}`)
         .addField("Account created at :", `${member.user.createdAt}`)
         .addField(`Joined ${message.guild.name} at :`, `${member.joinedAt}`)
         .addField("Roles :", member.roles.map(r => r.name).join(", "))
         .addField("Guild nickname :", `${member.displayName}`)
        message.channel.send(embed)
        break;    
            
        case "kirimpesan":
        var tujuan = message.mentions.members.first();
           if (!tujuan) {
               return message.channel.send(`:x: | Tolong mention member yang akan di DM. | **Usage :** ${PREFIX}kirimpesan <@member> <pesan>`)
           }
        var pesan = args.slice(2).join(` `)
        if (!pesan) {
           return message.channel.send(`:x: | Tolong tulis pesan yang akan dikirim ke ${tujuan} | **Usage :** ${PREFIX}kirimpesan <@member> <pesan>`)
        }
        var embed = new Discord.RichEmbed()
        .setTitle(`Pesan`)
        .setColor(`RANDOM`)
        .addField(`Dari :`, `${message.author}`)
        .addField(`Dari Server / Guild :`, `${message.guild}`)
        .addField(`Pesan :`, `${pesan}`)
        .setFooter(`© Hazmi35 | ${MOTTO}`)
        tujuan.user.send(embed)
        message.delete()
        message.channel.send(`:white_check_mark: | ${message.author} | Aku sudah mengirim pesanmu ke DM's nya ${tujuan.user.tag}`)
        break;
            
        case "test":
        try {
			get('https://aws.random.cat/meow').then(response => {
                message.channel.send(":cat: | Here is your random cat.", {files: [{attachment: response.body.file, name: `cat.${response.body.file.split('.')[2]}`}]});
            })
	}
            
        case "cuaca":
        Cuaca.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
            if (err) message.channel.send(err);

            if (result.length === 0) {
                message.channel.send(`:x: | **Usage :** ${PREFIX}cuaca <nama lokasi>`) 
                return; 
            }
            var current = result[0].current;
            var lokasi = result[0].location;

            var embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Cuaca untuk ${current.observationpoint}`) 
                .setThumbnail(current.imageUrl)
                .setColor(`RANDOM`) 
                .addField('Zona Waktu',`UTC${lokasi.timezone}`, true) 
                .addField('Suhu',`${current.temperature}°C`, true)
                .addField('Terasa seperti', `${current.feelslike}°C`, true)
                .addField('Angin',current.winddisplay, true)
                .addField('Kelembaban', `${current.humidity}%`, true)
                .setFooter(`© Hazmi35 | ${MOTTO}`)
                message.channel.send(embed);
        });           
    }
});

bot.login(TOKEN)
