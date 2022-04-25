const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const DB = require("../../Structures/Schemas/Ticket");
const { PARENTID, EVERYONEID } = require("../../config.json");

module.exports = {
    name: "interactionCreate",
    
    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const { guild, member, customId } = interaction;

        if(!["support", "bug"].includes(customId)) return;

        const ID = Math.floor(Math.random() * 90000) + 1000;

        await guild.channels.create(`${customId + "-" + ID}`, {
            type: "GUILD_TEXT",
            parent: PARENTID,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
                {
                    id: EVERYONEID,
                    deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
                },
            ],
        }).then(async(channel) => {
            await DB.create({
                GuildID: guild.id,
                MemberID: member.id,
                TicketID: ID,
                ChannelID: channel.id,
                Closed: false,
                Locked: false,
                Type: customId,
            });

            const Embed = new MessageEmbed()
            .setAuthor(`${guild.name} || Ticket: ${ID}`, guild.iconURL({ dynamic: true }))
            .setDescription("Bitte warte auf jemanden, der dein Ticket bearbeitet. Beschreibe in dieser Zeit dein Anliegen oder Problem!")
            .setFooter("Die Buttons unten sind nur für unser Team.");
    
            const Buttons = new MessageActionRow();
            Buttons.addComponents(
                new MessageButton()
                .setCustomId("close")
                .setLabel("Schließen & Speichern")
                .setStyle("PRIMARY")
                .setEmoji("💾"),
                new MessageButton()
                .setCustomId("lock")
                .setLabel("Sperren")
                .setStyle("SECONDARY")
                .setEmoji("🔒"),
                new MessageButton()
                .setCustomId("unlock")
                .setLabel("Entsperren")
                .setStyle("SUCCESS")
                .setEmoji("🔓")
            );
            
            channel.send({embeds: [Embed], components: [Buttons]});
            
            await channel.send({ content: `${member} hier ist dein Ticket`}).then((m) => {
                setTimeout(() => {
                    m.delete().catch(() => {});
                }, 1 * 5000);
            });
        
            interaction.reply({ content: `${member} || Dein Ticket wurde erfolgreich erstellt: ${channel}`, ephemeral: true})
        });
    },
};