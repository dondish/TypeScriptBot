"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesName = ["Mute", "Kick", "Ban", "Unmute", "Unban"];
const typesColor = [0xffff30, 0xffff30, 0xfc0f0f, 0x0fff3f, 0x0fff3f];
function formatToLog(user, mod, type, reason) {
    const name = typesName[type];
    const color = typesColor[type];
    const embed = {
        color,
        title: name,
        fields: [
            { name: "User", value: `${user.username}#${user.discriminator}` },
            { name: "Moderator", value: `${mod.username}#${mod.discriminator}` }
        ]
    };
    if (reason != null)
        embed.fields.push({ name: "Reason", value: reason });
    return embed;
}
exports.formatToLog = formatToLog;
async function executeAction(type, user, mod, reason, guild) {
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
    const log = guild.channels.find((channel) => channel.name == "mod-log" && channel.type == 0);
    const dm = await user.getDMChannel();
    const message = formatToLog(user, mod, type, reason);
    dm.createMessage({ embed: message });
    log.createMessage({ embed: message });
}
exports.executeAction = executeAction;
//# sourceMappingURL=ModerationUtils.js.map