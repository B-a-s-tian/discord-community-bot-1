const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "linktree",
    description: "Zeigt dir Bastians soziale Medien an",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setTitle("**BASTIANS SOCIALS**")
        .setDescription("https://linktr.ee/probably_a_bastian1")
        .addFields(
            {
                name: "``DISCORD``",
                value:
                `
                https://discord.com/TfCckKCQmS
                `
            },
            {
                name: "``TWITCH``",
                value:
                `
                https://www.twitch.tv/probably_a_bastian1
                `
            },
            {
                name: "``YOUTUBE``",
                value:
                `
                https://www.youtube.com/channel/UCmLCRIJWGPWwyjUGZlR4Wmw?sub_confirmation=1
                `
            },
            {
                name: "``TWITTER``",
                value:
                `
                https://twitter.com/KnuddelGHG
                `
            },
        )
        interaction.reply({embeds: [Embed]})
    }
}