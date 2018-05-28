import {Guild, GuildChannel, PrivateChannel, TextChannel, User} from "eris";

const typesName = ["Mute", "Kick", "Ban", "Unmute", "Unban"];
const typesColor = [0xffff30, 0xffff30, 0xfc0f0f, 0x0fff3f, 0x0fff3f];

export function formatToLog(user: User | string, mod: User, type: number, reason: string) {
    const name: string = typesName[type];
    const color: number = typesColor[type];

    const u = typeof user == "string" ? user : user.id

    const embed = {
        color,
        title: name,
        fields: [
            {name: "User", value: `<@${u}>`},
            {name: "Moderator", value: `${mod.username}#${mod.discriminator}`}
        ]
    }
    if (reason != null)
        embed.fields.push({name:"Reason", value:reason});
    return embed;
}

export async function executeAction(type: number, user: User | string, mod: User, reason: string, guild: Guild) {
    const log: TextChannel = guild.channels.find((channel) => channel.name=="mod-log"&&channel.type==0) as TextChannel;
    const message: object = formatToLog(user, mod, type, reason);
    if (typeof user != "string") 
    {
        const dm: PrivateChannel = await user.getDMChannel();
        dm.createMessage({embed:message});
    }
    log.createMessage({embed:message})
    switch (type) {
        case 0:
            // implement mute later
            break;
        case 1:
            user = user as User;
            guild.kickMember(user.id, !reason ? "" : reason);
            break;
        case 2:
            user = user as User;
            guild.banMember(user.id, 7, !reason ? "" : reason);
            break;
        case 3:
            // implement unmute later
            break;
        case 4:
            user = user as string
            guild.unbanMember(user, !reason ? "" : reason);
    }
}