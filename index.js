const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { Token } = require("./config.json");
const { promisify } = require("util");
const Ascii = require("ascii-table");
const { glob } = require("glob");
const PG = promisify(glob);

client.commands = new Collection();

require("./Systems/GiveawaySys")(client);

require("./Structures/Handlers/Events")(client);
require("./Structures/Handlers/Commands")(client);

client.login(Token);