import {RichEmbed, User} from "discord.js";

const typesName = ["Mute", "Kick", "Ban", "Unmute", "Unban"];
const typesColor = [0xffff30, 0xffff30, 0xfc0f0f, 0x0fff3f, 0x0fff3f];

export function formatToLog(user: User, mod: User, type: number, reason: string) {
    const name = typesName[type];
    const color = typesColor[type];

    const embed = new RichEmbed().setTitle(name)
        .addField("User", `${user.username}#${user.discriminator}`)
        .addField("Moderator", `${mod.username}#${mod.discriminator}`)
        .setColor(color);
    if (reason != null)
        embed.addField("Reason", reason);
    return embed;
}