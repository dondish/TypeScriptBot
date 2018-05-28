import ModCommand from "../structs/ModCommand";

export default class MuteCommand extends ModCommand {
    name: string = "mute";
    desc: string = "Mute those who talk too much";
    usage: string = "mute <mention/id> <reason>"
    type: number = 2;
}