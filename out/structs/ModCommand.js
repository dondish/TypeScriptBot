"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModerationUtils_1 = require("../utils/ModerationUtils");
class ModCommand {
    async execute(params) {
        let member;
        if (params.msg.mentions.length > 0 && params.msg.mentions[0].id != params.client.user.id) {
            member = params.msg.mentions[0];
        }
        ModerationUtils_1.executeAction(this.type, member, params.author.user, params.args.split(" ").slice(1).join(" "), params.guild);
    }
}
exports.default = ModCommand;
//# sourceMappingURL=ModCommand.js.map