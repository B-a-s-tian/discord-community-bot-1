const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "twitchstats",
    description: "Zeigt dir die Twitch Stats von einem User an",
    options: [
        {
            name: "user",
            description: "Twitch Name vom User",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction) {
        const { options, member, guild, channel } = interaction;
        const channelName = options.getString("user");
        

        if(!channelName)
        return interaction.reply({content: "Bitte gib einen Channel Namen an", ephermeral: true});

        try {
            const Response = await  superagent.get(`https://api.crunchprank.net/twitch/followcount/${channelName.toLowerCase()}`);
            const upTime = await superagent.get(`https://api.crunchprank.net/twitch/uptime/${channelName.toLowerCase()}`);
            const totalViews = await superagent.get(`https://api.crunchprank.net/twitch/total_views/${channelName.toLowerCase()}`);
            const accountage = await superagent.get(`https://api.crunchprank.net/twitch/creation/${channelName.toLowerCase()}`);
            const lastGame = await superagent.get(`https://api.crunchprank.net/twitch/game/${channelName.toLowerCase()}`);


            const embed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`${channelName}'s Twitch Stats`)
            .setDescription(`❣️ **Followers**: ${Response.text} \n👀 **Views**: ${totalViews.text}\n ⬆ **Uptime**: ${upTime.text} \n📝 **Created at**: ${accountage.text}  \n⏮️ **Last Game**: ${lastGame.text} \n🔴 **Live**: ${upTime.text}`)
            .setFooter(`Angefragt von ${member.user.tag}`, member.user.displayAvatarURL())
            .addField(`ㅤ`, `[**Support here**](https://discord.com/channels/964260318568124488/964490370308276285)`)
            .setURL(`https://twitch.tv/${channelName}`)
            .setThumbnail("https://pngimg.com/uploads/twitch/twitch_PNG27.png")

            .setTimestamp()
            interaction.reply({embeds: [embed]});
            if (upTime.text === `${channelName} is offline`) {
                upTime.text = "Offline";
            }
            
        } catch (error) {
            console.error(error);
            return interaction.reply({content: "An error occured while fetching Twitch stats.", ephermeral: true});
        }
    }
}