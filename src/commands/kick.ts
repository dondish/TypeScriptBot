import ModCommand from "../structs/ModCommand";

export default class KickCommand extends ModCommand {
    name: string = "kick";
    desc: string = "Kick someone off the server";
    usage: string = "kick <mention/id> <reason>"
    type: number = 1;
}