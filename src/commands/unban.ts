import ModCommand from "../structs/ModCommand";

export default class UnbanCommand extends ModCommand {
    name: string = "unban";
    desc: string = "Appeal a ban";
    usage: string = "unban <mention/id> <reason>";
    type: number = 4;
}