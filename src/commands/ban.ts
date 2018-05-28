import ModCommand from "../structs/ModCommand";

export default class BanCommand extends ModCommand {
    name: string = "ban";
    desc: string = "Bring down the ban hammer!";
    usage: string = "ban <mention/id> <reason>";
    type: number = 2;
}