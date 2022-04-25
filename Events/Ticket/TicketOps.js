const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");
const { TRANSCRIPTSID } = require("../../config.json");
const DB = require("../../Structures/Schemas/Ticket");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {ButtonInteraction} interaction 
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;
        const { guild, customId, channel } = interaction;
        if(!["close", "lock", "unlock"].includes(customId)) return;

        const Embed = new MessageEmbed()
        .setColor("BLUE");

        DB.findOne({ChannelID: channel.id }, async(err, docs) => {
            if(err) throw err;
            if(!docs) return interaction.reply({ content: "Keine Daten für das Ticket gefunden - bitte manuell löschen", ephemeral: true });
            
            switch(customId) {
                case "lock" : 
                if(docs.Locked == true)
                return interaction.reply({ content: "Das Ticket ist schon gesperrt!", ephemeral: true});
                await DB.updateOne({ ChannelID: channel.id }, { Locked: true });
                Embed.setDescription("🔒 || Das Ticket ist nun gesperrt");
                channel.permissionOverwrites.edit(docs.MemberID, {
                    SEND_MESSAGES: false,
                });
                interaction.reply({ embeds: [Embed] });
                break;
                
                case "unlock" : 
                if(docs.Locked == false)
                return interaction.reply({ content: "Das Ticket ist schon entsperrt!", ephemeral: true});
                await DB.updateOne({ ChannelID: channel.id }, { Locked: false });
                Embed.setDescription("🔓 || Das Ticket ist nun entsperrt");
                channel.permissionOverwrites.edit(docs.MemberID, {
                    SEND_MESSAGES: true,
                });
                interaction.reply({ embeds: [Embed] });
                break;

                case "close" : 
                if(docs.Closed == true) 
                return interaction.reply({ content: "Das Ticket ist schon geschlossen, bitte warte darauf, das das Ticket gelöscht wird.", ephemeral: true});
                const attachament = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${docs.Type} - ${docs.TicketID}.html`
                });
                await DB.updateOne({ ChannelID: channel.id }, { Closed: true });

                const MEMBER = guild.members.cache.get(docs.MemberID);
                const Message = await guild.channels.cache.get(TRANSCRIPTSID).send({
                    embeds: [
                        Embed.setAuthor(
                            MEMBER.user.tag,
                            MEMBER.user.displayAvatarURL({ dynamic: true })
                        ).setTitle(`Transcript Typ: ${docs.Type}\nID: ${docs.TicketID}`),
                        ],
                        files: [attachament],
                });

                interaction.reply({embeds: [Embed.setDescription(`Das Ticket ist nun gesichert [TRANSCRIPT](${Message.url})`),
            ],
        });

        setTimeout(() => {
            channel.delete();
        }, 10 * 1000);
    }
    });
    }
}