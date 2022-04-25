const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "User Info",
    type: "USER",
    permissions: "ADMINISTRATOR",
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const Response = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(target.user.tag, target.user.avatarURL({dynamic: true, size: 512}))
        .setThumbnail(target.user.avatarURL({dynamic: true, size: 512}))
        .addField("ID", `${target.user.id}`)
        .addField("Rollen", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
        .addField("Member seit", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord User seit", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({embeds: [Response], ephemeral: true})
    }
}