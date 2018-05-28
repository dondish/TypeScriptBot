"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structs/Command");
class PrefixCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.name = "prefix";
        this.desc = "Shows or edits the current prefix";
        this.usage = "prefix <prefix>";
    }
    async execute(args) {
        if (args.args == "") {
            await args.channel.createMessage("Current prefixes: " + args.bot.prefixes.toString());
            return;
        }
        if (args.bot.prefixes.length > 1) {
            args.bot.prefixes[0] = args.args;
        }
        else {
            args.bot.prefixes.push(args.args);
            args.bot.prefixes.reverse();
        }
        await args.channel.createMessage("Prefix successfully changed!");
    }
}
exports.default = PrefixCommand;
//# sourceMappingURL=prefix.js.map