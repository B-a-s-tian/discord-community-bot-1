const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "help",
    description: "Zeigt dir alle vorhandenen Commands an.",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setTitle("**BASTIANS COMMUNITY | COMMANDS**")
        .setDescription("__**Der Bot benutzt /-Commands.**__")
        .addFields(
            {
                name: "``/status``",
                value: `Zeigt dir Uptime & Ping vom Bot`
            },
            
            {
                name: "``/suggest``",
                value: `Erstelle einen Wunsch.`
            },
            {
                name: "``/help``",
                value: `Zeigt dir diese Box.`
            },
            {
                name: "``/serverinfo``",
                value: `Zeigt dir Informationen vom Server.`
            },
            {
                name: "``Userinfo``",
                value: 
                `
                Zeigt dir Informationen von einem User
                *(Rechtsklick auf einen User => Apps => 'User Info')*
                `
            },
            {
                name: "``/embed``",
                value: 
                `
                Erstelle eine eigene Embed-Nachricht.
                `
            },
            {
                name: "``/twitch``",
                value: 
                `
                Zeigt dir Bastians Twitch an
                `
            },
            {
                name: "``/socials``",
                value: 
                `
                Zeigt dir Bastians Socials an
                `
            },
        )
        .setTimestamp()

        interaction.reply({embeds: [Embed]})
    }
}