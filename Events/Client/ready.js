const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../config.json")

/**
 * @param {Client} client
 */
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("Der Bot ist nun Bereit!")
        client.user.setActivity("/help | .gg/TfCckKCQmS", {type: "WATCHING"});

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Der Bot ist nun mit der Datenbank verbunden!")
        }).catch((err) => {
            console.log(err)
        });
    }
}