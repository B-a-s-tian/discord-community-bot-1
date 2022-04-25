const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandsInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription("⛔ An error occured while trying to execute this command.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }
    }
}