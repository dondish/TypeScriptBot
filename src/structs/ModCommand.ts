import CommandParams from "./CommandParams";
import {executeAction} from "../utils/ModerationUtils";
import {User, Member} from "eris";
import Command from "./Command";

export default abstract class ModCommand extends Command {
    abstract type: number;

    async execute(params: CommandParams) {
        let member: Member;
        if (params.msg.mentions.length > 0&&params.msg.mentions[0].id!=params.client.user.id) {
            member = await params.guild.getRESTMember(params.msg.mentions[0].id);
        } else {
            params.guild.getRESTMember(params.args.split(" ")[0]).then((mem)=>member=mem).catch((or)=>{})
        }
        if (member == undefined) {
            
        }
        executeAction(this.type, member.user, params.author.user, params.args.split(" ").slice(1).join(" "), params.guild);
    }
}