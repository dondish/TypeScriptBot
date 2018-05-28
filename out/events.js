"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModerationUtils_1 = require("./utils/ModerationUtils");
async function onReady() {
    console.log(`Successfully logged in, ${this.user.username}#${this.user.discriminator}\nCommands:\n${stringifyMap(this.commands)}`);
    this.editStatus('online', { name: " Discord Bots", type: 2 });
}
exports.onReady = onReady;
async function onMessageCreate(msg) {
    // Some auto modding
    if (msg.channel.type != 0)
        return;
    const channel = msg.channel;
    const guild = channel.guild;
    if (!msg.member.permission.has("manageGuild")) {
        if (msg.mentions.length > 7) {
            ModerationUtils_1.executeAction(2, msg.author, this.user, "Mass pinging (over 7 mentions)", guild);
        }
        else if (msg.content.match(new RegExp("https://discord.gg/"))) {
            ModerationUtils_1.executeAction(2, msg.author, this.user, "ads in " + channel.mention, guild);
        }
        return;
    }
    if (msg.author.bot)
        return;
    // Command handling responds to admins only
    let effectivePrefix = 0;
    for (let prefix of this.prefixes) {
        if (msg.content.startsWith(prefix)) {
            effectivePrefix = prefix.length;
        }
    }
    if (effectivePrefix == 0)
        return;
    const command = msg.content.split(" ")[0].substring(effectivePrefix);
    const args = msg.content.split(" ").slice(1).join(" ");
    if (this.commands.has(command)) {
        const comm = this.commands.get(command);
        if (comm.ownerOnly && msg.author.id != this.ownerid)
            return;
        comm.execute({ client: this, args: args, msg: msg, author: msg.member, guild: guild, channel: channel, bot: this });
    }
}
exports.onMessageCreate = onMessageCreate;
function stringifyMap(map) {
    let str = "";
    for (const [commname, comm] of map) {
        str += `${commname}: ${comm.desc}\n`;
    }
    return str;
}
//# sourceMappingURL=events.js.map