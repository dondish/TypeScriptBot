/// <reference path="../node_modules/eris/index.d.ts" />
import {Client} from "eris";
import {Config} from "./Config";
import {onMessageCreate, onReady} from "./events";

class TSBot extends Client {
    commands = new Map();

    constructor(token: string) {
        super(token);
        this.run()
    }

    async run() {
        this.on("ready", onReady);
        this.on("messageCreate", onMessageCreate);

        await this.connect();
    }
}

new TSBot(new Config().token);