"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../node_modules/eris/index.d.ts" />
const eris_1 = require("eris");
const Config_1 = require("./Config");
const events_1 = require("./events");
const fs_1 = require("fs");
class TSBot extends eris_1.Client {
    constructor(config) {
        super(config.token);
        this.commands = new Map();
        config.prefixes.push(`<@${config.id}> `);
        this.prefixes = config.prefixes;
        this.name = config.name;
        this.desc = config.desc;
        this.ownerid = this.ownerid;
        this.run();
    }
    async run() {
        this.loadCommands();
        this.on("ready", events_1.onReady);
        this.on("messageCreate", events_1.onMessageCreate);
        await this.connect();
    }
    loadCommands() {
        fs_1.readdir(__dirname + "/commands", (err, filenames) => {
            if (err) {
                console.error(err.message);
                return;
            }
            filenames.forEach((name, index, names) => {
                if (name.endsWith(".map"))
                    return;
                let command = new (require(`./commands/${name}`).default)();
                this.commands.set(command.name, command);
            });
        });
    }
}
exports.TSBot = TSBot;
new TSBot(new Config_1.Config());
//# sourceMappingURL=TSBot.js.map