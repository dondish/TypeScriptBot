import Command from "../structs/Command";
import CommandParams from "../structs/CommandParams";

export default class ShutdownCommand extends Command {
    name: string = "shutdown";
    desc: string = "Pls kill me I hate living";
    usage: string = "shutdown";
    ownerOnly: boolean = true;
    hidden: boolean = true;

    async execute(args: CommandParams) {
        args.bot.shutdown()
    }

}