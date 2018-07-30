import Command from "../structs/Command";
import CommandParams from "../structs/CommandParams";

export default class ReloadCommand extends Command {
    name: string = "reload";
    desc: string = "Pls kill me I hate living";
    usage: string = "reload";
    ownerOnly: boolean = true;
    hidden: boolean = true;
    aliases: Array<string> = ["refresh", "restart"];

    async execute(args: CommandParams) {
        await args.bot.reload();
    }

}