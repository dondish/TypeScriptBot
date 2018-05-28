import {Client, Guild, Member, Message, TextChannel} from "eris";
import { TSBot } from "../TSBot";

export default interface CommandParams {
    client: Client;
    args: string;
    msg: Message;
    author: Member;
    guild: Guild;
    channel: TextChannel;
    bot: TSBot;
}