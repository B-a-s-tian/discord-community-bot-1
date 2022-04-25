const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports= {
    name: "giveaway",
    description: "Starte ein Gewinnspiel",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "start",
            description: "Starte ein neues Gewinnspiel.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "dauer",
                    description: "Gib eine Dauer an. (1m, 1h, 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "gewinner",
                    description: "Gib ein, wie viele Gewinner es geben soll.",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "preis",
                    description: "Gib ein, was man gewinnen kann.",
                    type: "STRING",
                    required: true
                },
                {
                    name: "kanal",
                    description: "Gib einen Kanal an, wo das Gewinnspiel stattfindet",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "aktionen",
            description: "Optionen für das Gewinnspiel",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "optionen",
                    description: "Wähle eine Option aus.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "beenden",
                            value: "beenden"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "löschen",
                            value: "löschen"
                        },
                    ]
                },
                {
                    name: "message_id",
                    description: "Gib die Nachrichten ID des Gewinnspiels ein.",
                    type: "STRING",
                    required: true
                },
            ],
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { options } = interaction;

        const Sub = options.getSubcommand();
        
        const ErrorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setColor("GREEN");

        switch(Sub) {
            case "start" : {
                const gchannel = options.getChannel("kanal") || interaction.channel;
                const duration = options.getString("dauer");
                const winnerCount = options.getInteger("gewinner");
                const preis = options.getString("preis");
                
                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize : preis,
                    messages: {
                        giveaway: "🎉 **NEUES GIVEAWAY WURDE GESTARTET** 🎉",
                        giveawayEnded: "🎉 **GIVEAWAY BEENDET** 🎉",
                        winMessage: "Herzlichen Glückwunsch {winners}! Bitte öffne ein Ticket für den Preis."
                    }
                }).then(async () => {
                    successEmbed.setDescription("Gewinnspiel wurde erfolgreich gestartet!")
                    return interaction.reply({embeds: [successEmbed], ephemeral: true});
                }).catch((err) => {
                    ErrorEmbed.setDescription(`Ein Fehler ist aufgetreten!\n${err}`)
                    return interaction.reply({embeds: [ErrorEmbed], ephemeral: true});
                })
            }
            break;

            case "aktionen" : {
                const choice = options.getString("optionen");
                const messageId = options.getString("message_id");
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

                if (!giveaway) {
                    ErrorEmbed.setDescription(`Ich konnte kein Gewinnspiel mit dieser Nachrichten ID: ${messageId} finden!`);
                    return interaction.reply({embeds: [ErrorEmbed], ephemeral: true})
                }

                switch(choice) {
                    case "beenden" : {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription(`Das Gewinnspiel wurde beendet!`)
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            ErrorEmbed.setDescription(`Ein Fehler ist aufgetreten!\n${err}`)
                            return interaction.reply({embeds: [ErrorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "pause" : {
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription(`Das Gewinnspiel wurde pausiert!`)
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            ErrorEmbed.setDescription(`Ein Fehler ist aufgetreten!\n${err}`)
                            return interaction.reply({embeds: [ErrorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "unpause" : {
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription(`Das Gewinnspiel ist nun nicht mehr pausiert!`)
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            ErrorEmbed.setDescription(`Ein Fehler ist aufgetreten!\n${err}`)
                            return interaction.reply({embeds: [ErrorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "reroll" : {
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription(`Das Gewinnspiel wurde nochmal ausgelost!`)
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            ErrorEmbed.setDescription(`Ein Fehler ist aufgetreten!\n${err}`)
                            return interaction.reply({embeds: [ErrorEmbed], ephemeral: true});
                        });
                    }
                    break;

                    case "löschen" : {
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription(`Das Gewinnspiel wurde gelöscht!`)
                            return interaction.reply({embeds: [successEmbed], ephemeral: true})
                        }).catch((err) => {
                            ErrorEmbed.setDescription(`Ein Fehler ist aufgetreten!\n${err}`)
                            return interaction.reply({embeds: [ErrorEmbed], ephemeral: true});
                        });
                    }
                    break;
                }
            }
            break;

            default : {
                console.log("Error beim Giveaway Command.")
            }
        }
    }
}