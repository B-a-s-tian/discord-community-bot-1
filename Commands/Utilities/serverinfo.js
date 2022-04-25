const { CommandInteraction, MessageEmbed, GuildEmoji } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Shows Informations about the Server.",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interaction) {
        const { guild } = interaction;

        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;
        
        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addFields(
            {
                name: "🥇 | GENERAL",
                value:
                `
                **- Name**: ${guild.name}
                **- Erstellt**: <t:${parseInt(createdTimestamp / 1000)}:R>
                
                **- Beschreibung**: ${description}
                `
            },
            {
                name: "🧑 | MITGLIEDER",
                value: 
                `
                **- Mitglieder**: ${members.cache.filter((m) => !m.user.bot).size}
                **- Bots**: ${members.cache.filter((m) => m.user.bot).size}

                **- Insgesamt**: ${memberCount}
                `
            },
            {
                name: "📃 | KANÄLE",
                value: 
                `
                **- Text**: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                **- Sprache**: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                **- Kategorien**: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
                **- Stages**: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
                **- Announcement**: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}

                **- Insgesamt**: ${channels.cache.size}
                `
            },
            {
                name: "🤨 | EMOJIS",
                value:
                `
                **- Animiert**: ${emojis.cache.filter((e) => e.animated).size}
                **- Statisch**: ${emojis.cache.filter((e) => !e.animated).size}
                **- Sticker**: ${stickers.cache.size}

                **- Insgesamt**: ${stickers.cache.size + emojis.cache.size}
                `
            },
            {
                name: "⭐ | NITRO STATISTICS",
                value: 
                `
                **- Tier**: ${guild.premiumTier.replace("TIER_", "")}
                **- Boosts**: ${guild.premiumSubscriptionCount}
                **- Boosters**: ${members.cache.filter((m) => m.premiumSince).size}
                `
            }
        )
        interaction.reply({embeds: [Embed]})
    }
}