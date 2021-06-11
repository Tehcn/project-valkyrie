const Discord = require("discord.js");
const { token, prefix } = require("../config.json");
const { Player } = require('./skyblock');
const { NotImplementedError } = require('./errors');

let client = new Discord.Client();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

function toTitleCase(s="") {
    var sArr = s.split(" ");
    var output = "";
    var i = 0;
    sArr.forEach(element => {
        var firstChar = element.slice(0, 1).toUpperCase();
        var lastBit = element.substr(1, s.length);
        if(i==sArr.length) {
            output += firstChar + lastBit;
        } else {
            output += firstChar + lastBit + " ";
        }
        i++;
    });

    return output;
}

client.on("message", async message => {
    var channel = message.channel;
    if(message.content.startsWith(`${prefix}sblevel`)) {
        var skill = message.content.split(" ")[2]
        var playerName = message.content.split(" ")[1];

        // Dungeons / Catacombs
        if(skill.toLowerCase() == "catacombs") {
            
            var player = new Player(playerName);
            await player.Init();
            channel.send(`Getting ${skill} for player ${playerName}`);
            var skillLvl = await player.GetSkillLevel(skill.toLowerCase());
            
            var skillEmbed = new Discord.MessageEmbed();

            skillEmbed.setTitle(`${playerName}'s ${toTitleCase(skill)} Level`);
            skillEmbed.addField("Level", skillLvl.level);
            skillEmbed.addField(`Progress to level  ${Number.parseInt(skillLvl.level) + 1}`, `\t${skillLvl.xpCurrent}/${skillLvl.xpForNext}\n\t${Math.trunc(Number.parseFloat(skillLvl.progress)*10000)/100}%`);

            channel.send(skillEmbed);

            return;
        }

        var player = new Player(playerName);
        await player.Init();
        channel.send(`Getting ${skill} for player ${playerName}`);
        var skillLvl = await player.GetSkillLevel(skill.toLowerCase());
        
        var skillEmbed = new Discord.MessageEmbed();

        skillEmbed.setTitle(`${playerName}'s ${toTitleCase(skill)} Level`);
        skillEmbed.addField("Level", skillLvl.level);
        skillEmbed.addField(`Progress to level  ${Number.parseInt(skillLvl.level) + 1}`, `\t${skillLvl.xpCurrent}/${skillLvl.xpForNext}\n\t${Math.trunc(Number.parseFloat(skillLvl.progress)*10000)/100}%`);

        channel.send(skillEmbed);
    }
})

client.login(token);