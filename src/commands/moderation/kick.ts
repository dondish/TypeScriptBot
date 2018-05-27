/// <reference path="../../../node_modules/@types/common-tags/index.d.ts"/>
import {
    Command, CommandMessage, CommandoClient} from "discord.js-commando";
import {TextChannel} from "discord.js";
import {formatToLog} from "../../utils/ModerationUtils";

export default class KickCommand extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kick a member from the server',
            args: [{
                key: 'member',
                label: 'user',
                prompt: 'What user should I kick?',
                type: 'member'

            },
                {
                    key: 'reason',
                    prompt: 'no reason specified',
                    type: 'string',
                    infinite: true,
                    default: 'No Reason'
                }],
            guildOnly: true,
            examples: ['kick dondish', 'kick @dondish#7155'],
            userPermissions: ["KICK_MEMBERS"],
            clientPermissions: ["KICK_MEMBERS", "MANAGE_MESSAGES"]
        })
    }

    async run(msg: CommandMessage, args: any) {
        const member = args.member;
        const user = member.user;
        const reason = args.reason.join(" ");

        console.log(typeof reason);
        member.kick(args.reason).then().catch((reason: any)=>{console.log(reason + " " + typeof reason)});
        await msg.delete();
        console.log(msg.guild.channels.find("name", "mod-log"));
        const log = msg.guild.channels.find(value => value.name=="mod-log"&&value.type == "text") as TextChannel;
        if (log != null) {
            log.send(formatToLog(user, msg.author, 1, reason))
        }
        return msg.reply("Successfully Kicked User <@" + member.id + "> (" + user.username + ")")
    }
};