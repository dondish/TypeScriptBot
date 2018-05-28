import CommandParams from "./CommandParams";
import {executeAction} from "../utils/ModerationUtils";
import {User, Member} from "eris";
import Command from "./Command";

export default abstract class ModCommand extends Command {
    abstract type: number;

    async execute(params: CommandParams) {
        if (params.args.split(" ").length == 0) {
            params.channel.createMessage(`Correct usage: ${params.bot.prefixes[0]}${this.usage}`)
            return;
        }
        let member: User | string;
        if (params.msg.mentions.length > 1&&!(params.msg.mentions[0].id==params.client.user.id&&params.msg.mentions.length == 1)) {
            member = params.msg.mentions[0];
        } else {
            member = params.args.split(" ")[0];
        }
        executeAction(this.type, member, params.author.user, params.args.split(" ").slice(1).join(" "), params.guild, params.bot)
        .then(()=>params.channel.createMessage(":heavy_check_mark:")).catch(()=>params.channel.createMessage(":heavy_multiplication_x:"));
    }
}