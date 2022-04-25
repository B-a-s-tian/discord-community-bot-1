const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "announce",
  description: "Kündige etwas durch den Bot an",
  permission: "ADMINISTRATOR",
  options: [
      {
        name: 'titel',
        type: 'STRING',
        description: 'Schreib deinen Ankündigungs Titel hier rein',
        required: true,
      },
      {
        name: 'nachricht',
        type: 'STRING',
        description: 'Schreib deine Ankündigungs Nachricht hier rein',
        required: true,
      },
      {
        name: 'farbe',
        type: 'STRING',
        description: 'Passe deine Embed-Farbe an',
        required: false,
      },
      {
        name: 'footer',
        type: 'STRING',
        description: 'Füge einen Footer deinem Embed hinzu',
        required: false,
      },
      { 
        name: 'timestamp', 
        description: 'Timestamp oder aus?', 
        type: 'BOOLEAN',
        required: false,
      },
      {
        name: 'ping',
        description: 'An additional ping to your announcement message.',
        type: 'STRING',
        required: false,
        choices: [
                { name: "@everyone", value: "@everyone" },
                { name: "@here", value: "@here" }
            ]
      }
  ],
  /**
    *
    * @param {CommandInteraction} interaction
    */
  execute(interaction) {
    const { options, user } = interaction;
    const titel = options.getString("titel");
    const message = options.getString("nachricht");
    const color = options.getString("farbe");
    const footer = options.getString("footer");
    const timestamp = options.getBoolean("timestamp");
    const ping = options.getString("ping");
    const embed = new MessageEmbed()
    .setAuthor({name: `${user.tag}`, iconURL: `${user.displayAvatarURL({dynamic: true})}`})
    .setTitle(`${titel}`)
    .setDescription(`${message}`)

    if(color) embed.setColor(color.toUpperCase());
    if(footer) embed.setFooter({ text: footer });
    if(timestamp) embed.setTimestamp();

    if (!ping) {
      interaction.reply({
        embeds: [embed]
      });
    } else {
      interaction.reply({
        content: `${ping === "@everyone" ? "@everyone" : "@here"}`,
        embeds: [embed],
        allowedMentions: {
          parse: ['everyone']
        }
      });
    }
  }
}