import CommandParams from "./CommandParams";
import { TSBot } from "../TSBot";

export default abstract class Command {
    abstract name: string;
    abstract desc: string;
    abstract usage: string;
    hidden: boolean = false;
    ownerOnly: boolean = false;
    abstract async execute(args: CommandParams): Promise<void>;
}