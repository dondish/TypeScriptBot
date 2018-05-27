/// <reference path="../node_modules/discord.js/typings/index.d.ts"/>
/// <reference path="../node_modules/discord.js-commando/typings/index.d.ts"/>

import {CommandoClient} from "discord.js-commando";
import {Config} from "./Config";
import * as path from 'path';

const client = new CommandoClient({
    owner: '239790360728043520',
    commandPrefix: '%',
    unknownCommandResponse: false,

});

client.registry.registerGroups([
    ['general', 'General Commands'],
    ['moderation', 'Moderation Commands']
]).registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', ()=>{
    console.log(`Logged in successfully ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    client.user.setPresence({game:{name:" with Discord Bots"}});
});

client.login(new Config().token);