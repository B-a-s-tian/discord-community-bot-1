const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "twitch",
    description: "Zeigt dir Bastians Twitch an",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
        .setColor("PURPLE")
        .setThumbnail("https://cdn.discordapp.com/attachments/860239222803791913/967558902931669002/Twitch.png?size=4096")
        .setTitle("**BASTIANS TWITCH**")
        .setDescription("https://www.twitch.tv/probably_a_bastian1")

        interaction.reply({embeds: [Embed]})
    }
}