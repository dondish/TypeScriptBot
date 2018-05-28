import Command from "../structs/Command";
import CommandParams from "../structs/CommandParams";

export default class PrefixCommand extends Command {
    name = "prefix";
    desc = "Shows or edits the current prefix";
    usage = "prefix <prefix>";

    async execute(args: CommandParams) {
        if (args.args == "") {
            await args.channel.createMessage("Current prefixes: " + args.bot.prefixes.toString());
            return;
        }
        if (args.bot.prefixes.length > 1) {
            args.bot.prefixes[0] = args.args;
        } else {
            args.bot.prefixes.push(args.args);
            args.bot.prefixes.reverse();
        }
        await args.channel.createMessage("Prefix successfully changed!")
    }
}