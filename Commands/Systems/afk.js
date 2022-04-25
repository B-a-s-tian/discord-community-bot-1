const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../Structures/Schemas/AFKSystem");
const { execute } = require("./suggest");

module.exports = {
    name: "afk",
    description: "Setze deinen AFK Status",
    options: [
        {
            name: "set",
            type: "SUB_COMMAND",
            description: "Setze deinen AFK Status",
            options: [
                {
                    name: "status",
                    description: "Setze deinen Status",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "return",
            type: "SUB_COMMAND",
            description: "Entferne deinen AFK Status"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options, user, createdTimestamp } = interaction;
    
        const Embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({dynamic: true}));

        const afkStatus = options.getString("status");

        try {
            switch(options.getSubcommand()) {
                case "set" : {
                    await DB.findOneAndUpdate(
                        {GuildID: guild.id, UserID: user.id},
                        {Status: afkStatus, Time: parseInt(createdTimestamp / 1000)},
                        {new: true, upsert: true}
                    )

                    Embed.setColor("GREEN").setDescription(`Dein Status wurde zu ${afkStatus} aktualisiert.`)
                    return interaction.reply({embeds: [Embed], ephemeral: true})
                }
                case "return" : {
                    await DB.deleteOne({GuildID: message.guild.id, UserID: user.id});

                    Embed.setColor("RED").setDescription(`Dein Status wurde entfernt.`)
                    return interaction.reply({embeds: [Embed], ephemeral: true})
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
}
