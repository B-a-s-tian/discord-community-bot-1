const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton, } = require("discord.js");
const { OPENTICKET } = require("../../config.json");

module.exports = {
    name: "ticket",
    description: "Gib eine Ticket Nachricht an",
    permission: "ADMINISTRATOR", 

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild } = interaction;

        const Embed = new MessageEmbed() 
        .setAuthor(guild.name + " || Ticket System", guild.iconURL({ dynamic: true }))
        .setDescription("Klicke unten auf den Button um ein Ticket zu erstellen.")
        .setColor("YELLOW");

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton()
            .setCustomId("support")
            .setLabel("Support Ticket")
            .setStyle("PRIMARY")
            .setEmoji("🎫"),
            new MessageButton()
            .setCustomId("bug")
            .setLabel("Bug Ticket")
            .setStyle("SECONDARY")
            .setEmoji("🐛")
        );

        await guild.channels.cache
        .get(OPENTICKET)
        .send({ embeds: [Embed], components: [Buttons] });

        interaction.followUp({ content: "Erfolgreich", ephemeral: true });
    },
};