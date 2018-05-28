import ModCommand from "../structs/ModCommand";

export default class UnmuteCommand extends ModCommand {
    name: string = "unmute";
    desc: string = "Now they can talk";
    usage: string = "unmute <mention/id> <reason>"
    type: number = 3;
}