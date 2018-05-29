/// <reference path="../node_modules/eris/index.d.ts" />
import {Client} from "eris";
import {Config} from "./Config";
import {onMessageCreate, onReady} from "./events";
import { readdir } from "fs";
import Command from "./structs/Command";

export class TSBot extends Client {
    commands: Map<string, Command> = new Map();
    prefixes: Array<string>;
    name: string;
    desc: string;
    ownerid: string;

    constructor(config: Config) {
        super(config.token);
        config.prefixes.push(`<@${config.id}> `);
        this.prefixes = config.prefixes;
        this.name = config.name;
        this.desc = config.desc;
        this.ownerid = this.ownerid;
        this.run()
    }

    async run() {
        this.loadCommands();
        this.on("ready", onReady);
        this.on("messageCreate", onMessageCreate);
        await this.connect();
    }

    async reload() {
        await this.disconnect({reconnect:false});
        this.commands.clear()
        await this.run()
    }

    async shutdown() {
        await this.disconnect({reconnect: false});
        process.exit(0);
    }

    loadCommands() {
        readdir(__dirname + "/commands", (err: NodeJS.ErrnoException, filenames: Array<string>) => {
            if (err) {
                console.error(err.message);
                return;
            }
            filenames.forEach((name: string, index: number, names: Array<string>)=>{
                if (name.endsWith(".map")) return;
                let command = new (require(`./commands/${name}`).default)();
                this.commands.set(command.name, command);
            })
        })
    }
}

new TSBot(new Config());