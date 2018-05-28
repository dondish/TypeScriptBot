import {Guild, GuildChannel, PrivateChannel, TextChannel, User} from "eris";

const typesName = ["Mute", "Kick", "Ban", "Unmute", "Unban"];
const typesColor = [0xffff30, 0xffff30, 0xfc0f0f, 0x0fff3f, 0x0fff3f];

export function formatToLog(user: User, mod: User, type: number, reason: string) {
    const name: string = typesName[type];
    const color: number = typesColor[type];

    const embed = {
        color,
        title: name,
        fields: [
            {name: "User", value: `${user.username}#${user.discriminator}`},
            {name: "Moderator", value: `${mod.username}#${mod.discriminator}`}
        ]
    }
    if (reason != null)
        embed.fields.push({name:"Reason", value:reason});
    return embed;
}

export async function executeAction(type: number, user: User, mod: User, reason: string, guild: Guild) {
    switch (type) {
        case 0:
            // implement mute later
            break;
        case 1:
            guild.kickMember(user.id, !reason ? "" : reason);
            break;
        case 2:
            guild.banMember(user.id, 7, !reason ? "" : reason);
            break;
        case 3:
            // implement unmute later
            break;
        case 4:
            guild.unbanMember(user.id, !reason ? "" : reason);
    }
    const log: TextChannel = guild.channels.find((channel) => channel.name=="mod-log"&&channel.type==0) as TextChannel;
    const dm: PrivateChannel = await user.getDMChannel();
    const message: object = formatToLog(user, mod, type, reason);
    dm.createMessage({embed:message});
    log.createMessage({embed:message})
}