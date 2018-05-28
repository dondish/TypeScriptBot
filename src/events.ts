import {Guild, Message, TextChannel} from "eris";
import {executeAction} from "./utils/ModerationUtils";
import CommandParams from "./structs/CommandParams";

export async function onReady() {
    console.log(`$Successfully logged in, ${this.user.username}#${this.user.discriminator}`);
    this.editStatus('online', {name: " Discord Bots", type:2})
}

export async function onMessageCreate(msg: Message) {
    // Some auto modding
    if (msg.channel.type != 0)
        return;

    const channel: TextChannel = msg.channel as TextChannel;
    const guild: Guild = channel.guild;

    if (!msg.member.permission.has("MANAGE_SERVER")) {
        if (msg.mentions.length > 7) {
            executeAction(2, msg.author, this.user, "Mass pinging", guild)
        } else if (msg.content.match(new RegExp("https://discord.gg/"))) {
            executeAction(2, msg.author, this.user, "ads", guild)
        }
        return;
    }

    if (!msg.content.startsWith("%")||!msg.content.startsWith(this.user.mention))
        return;

    const effectivePrefix: number = msg.content.startsWith("%") ? 1 : this.user.mention.length;

    const command: string = msg.content.split(" ")[0].substring(effectivePrefix);

    const args: string = msg.content.split(" ").slice(1).join(" ");

    if (this.commands.has(command)) {
        this.commands.get(command).execute({client: this, args: args, msg: msg, author: msg.member, guild: guild} as CommandParams)
    }
}
