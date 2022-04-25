const { MessageEmbed, WebhookClient, GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        const Welcomer = new WebhookClient({
// https://discordapp.com/api/webhooks/964283019596824586/sLTJzPDwgHjrd7xbgteeoFZUsqgMVbqCQwVlJj2VZBoQpUOH1MZdcXbitDgKmhFAVMRC
            id: "964283019596824586",
            token: "sLTJzPDwgHjrd7xbgteeoFZUsqgMVbqCQwVlJj2VZBoQpUOH1MZdcXbitDgKmhFAVMRC"
        });

        const Welcome = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
        .setDescription(`Tschüss ${member}\n
        Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nMember Count: **${guild.memberCount}**`)


        Welcomer.send({embeds: [Welcome]})
    }
}