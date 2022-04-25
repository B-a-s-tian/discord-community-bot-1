const { CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "suggest",
    description: "Erstelle einen Wunsch",
    options: [
        {
            name: "type",
            description: "Wähle den Typ aus",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "FilmGHG",
                    value: "FilmGHG"
                },
                {
                    name: "Event",
                    value: "Event"
                },
                {
                    name: "Spiel",
                    value: "Spiel"
                },
            ]
        },
        {
            name: "name",
            description: "Gib einen Namen für den Wunsch ein.",
            type: "STRING",
            required: true
        },
        {
            name: "functionality",
            description: "Beschreibe die Funktionalität des Wunsches.",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const funcs = options.getString("functionality");

        const Response = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`${interaction.member} hat sich ${type} gewünscht.`)
        .addField("Name", `${name}`, true)
        .addField("Functionality", `${funcs}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("<:ja:964284873214935040>")
        message.react("<:nein:964284873193955339>")
    }
}