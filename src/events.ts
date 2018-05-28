import {Guild, Message, TextChannel} from "eris";
import {executeAction} from "./utils/ModerationUtils";
import CommandParams from "./structs/CommandParams";
import Command from "./structs/Command";
import { TSBot } from "./TSBot";

export async function onReady() {
    console.log(`Successfully logged in, ${this.user.username}#${this.user.discriminator}\nCommands:\n${stringifyMap(this.commands)}`);
    this.editStatus('online', {name: " Discord Bots", type:2})
}

export async function onMessageCreate(msg: Message) {
    // Some auto modding
    if (msg.channel.type != 0)
        return;

    const channel: TextChannel = msg.channel as TextChannel;
    const guild: Guild = channel.guild;

    if (!msg.member.permission.has("manageGuild")) {
        if (msg.mentions.length > 7) {
            executeAction(2, msg.author, this.user, "Mass pinging (over 7 mentions)", guild)
        } else if (msg.content.match(new RegExp("https://discord.gg/"))) {
            executeAction(2, msg.author, this.user, "ads in " + channel.mention, guild)
        }
        return;
    }

    if (msg.author.bot) return;

    // Command handling responds to admins only

    let effectivePrefix: number = 0;

    for (let prefix of this.prefixes) {
        if (msg.content.startsWith(prefix))
        {
            effectivePrefix = prefix.length;
        }
    }

    if (effectivePrefix == 0)
        return;

    const command: string = msg.content.split(" ")[0].substring(effectivePrefix);

    const args: string = msg.content.split(" ").slice(1).join(" ");

    if (this.commands.has(command)) {
        const comm: Command = this.commands.get(command);
        if (comm.ownerOnly&&msg.author.id!=this.ownerid) return;
        comm.execute({client: this, args: args, msg: msg, author: msg.member, guild: guild, channel: channel, bot: this})
    }
}

function stringifyMap(map: Map<string, Command>) {
    let str: string = "";

    for (const [commname, comm] of map) {
        str += `${commname}: ${comm.desc}\n`
    }
    return str;
}
