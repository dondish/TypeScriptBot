import CommandParams from "./CommandParams";
import {executeAction} from "../utils/ModerationUtils";
import {User} from "eris";

export default class ModCommand {
    type: number;

    async execute(params: CommandParams) {
        let member: User;
        if (params.msg.mentions.length > 0&&params.msg.mentions[0].id!=params.client.user.id) {
            member = params.msg.mentions[0];
        }
        executeAction(this.type, member, params.author.user, params.args.split(" ").slice(1).join(" "), params.guild);
    }
}