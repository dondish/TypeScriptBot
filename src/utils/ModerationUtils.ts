import {Guild, GuildChannel, PrivateChannel, TextChannel, User, Role} from "eris";
import { TSBot } from "../TSBot";

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
    if (reason != null&&reason!="") {
        embed.fields.push({name:"Reason", value:reason});
    }
    return embed;
}

export async function executeAction(type: number, user: User | string, mod: User, reason: string, guild: Guild, bot: TSBot) {
    if (typeof user == "string"&&guild.members.has(user)) {
        user = guild.members.get(user).user as User;
    }
    const log: TextChannel = guild.channels.find((channel) => channel.name=="mod-log"&&channel.type==0) as TextChannel;
    const message: object = formatToLog(user, mod, type, reason);
    if (typeof user != "string") 
    {
        const dm: PrivateChannel = await user.getDMChannel();
        dm.createMessage({embed:message}).catch(()=>{}); // Cannot DM no worries tho
    }
    log.createMessage({embed:message})
    switch (type) {
        case 0:
            if (typeof user == "string") return;
            let mutedrole: Role = guild.roles.find((role: Role)=>role.name=="Muted");
            if (mutedrole==null)
                mutedrole = await guild.createRole({name:"Muted", permissions: 0}, "Creating muted role");
                const myrole: Role = guild.roles.get(guild.members.get(bot.user.id).roles[0]);
                await mutedrole.editPosition(myrole.position-1);
            await guild.addMemberRole(user.id, mutedrole.id, reason)
            break;
        case 1:
            if (typeof user == "string") return;
            await guild.kickMember(user.id, !reason ? "" : reason);
            break;
        case 2:
            if (typeof user == "string") return;
            await guild.banMember(user.id, 7, !reason ? "" : reason);
            break;
        case 3:
            if (typeof user == "string") return;
            mutedrole = guild.roles.find((role: Role)=>role.name=="Muted");
            if (mutedrole==null||!guild.members.get(user.id).roles.includes(mutedrole.id)) return;
            await guild.removeMemberRole(user.id, mutedrole.id, reason)
            break;
        case 4:
            if (typeof user == "string") {
                await guild.unbanMember(user, !reason ? "" : reason);
            } else {
                await guild.unbanMember(user.id, !reason ? "" : reason)
            }
    }
}