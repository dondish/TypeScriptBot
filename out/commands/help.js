"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../structs/Command");
class HelpCommand extends Command_1.default {
    constructor() {
        super(...arguments);
        this.name = "help";
        this.desc = "Help Command";
        this.usage = "help <command|all>";
    }
    ;
    async execute(args) {
        if (args.args == "") {
            args.channel.createMessage(args.bot.desc);
            return;
        }
        if (args.args.split(" ")[0] == "all") {
            let message = `${args.bot.name}'s Commands:\n\n`;
            args.bot.commands.forEach((command, key, map) => {
                if (!command.hidden) {
                    message += `\`${command.name}\`: ${command.desc}\n`;
                }
            });
            message += "\nFor any support contact dondish#7155 or send here";
            await args.channel.createMessage(message);
            return;
        }
        if (args.bot.commands.has(args.args.split(" ")[0])) {
            const command = args.bot.commands.get(args.args.split(" ")[0]);
            if (command.hidden) {
                args.channel.createMessage("Lol this command is developer only.");
            }
            await args.channel.createMessage({ embed: {
                    title: `Command: ${command.name}`,
                    description: command.desc,
                    fields: [{
                            name: "Usage:",
                            value: args.bot.prefixes[0] + command.usage
                        }],
                    color: 0x0fff3f
                } });
            return;
        }
        await args.channel.createMessage(`Unknown command, use \`${args.bot.prefixes[0]}help all\` to see all of the commands`);
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=help.js.map