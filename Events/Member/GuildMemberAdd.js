const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        const Welcomer = new WebhookClient({
// https://discordapp.com/api/webhooks/964283295661707284/PvUxBvj0Fss6TbgwiTkpDUJL4Nw2FyQS8iIBkPuKUN1jCeYBXlgxbNZ1XWPaxH_BAewI
// https://discordapp.com/api/webhooks/964283295661707284/PvUxBvj0Fss6TbgwiTkpDUJL4Nw2FyQS8iIBkPuKUN1jCeYBXlgxbNZ1XWPaxH_BAewI
            id: "964283295661707284",
            token: "PvUxBvj0Fss6TbgwiTkpDUJL4Nw2FyQS8iIBkPuKUN1jCeYBXlgxbNZ1XWPaxH_BAewI"
        });

        const Welcome = new MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`Willkommen ${member} auf **${guild.name}**.\n
        Account erstellt: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMember Count: **${guild.memberCount}**`)


        Welcomer.send({embeds: [Welcome]})
    }
}