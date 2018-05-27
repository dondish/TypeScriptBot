import {Client, Guild, Member, Message} from "eris";

export default interface CommandParams {
    client: Client;
    args: string;
    msg: Message;
    author: Member;
    guild: Guild;
}