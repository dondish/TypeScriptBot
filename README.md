# TypeScript Bot
A little bot I made in TypeScript to help run my server.
This bot's main goal is to manage a server, so it supports only one server. don't try and make it public!

# Installation
although this bot is not supposed to be self hosted all you have to do to run this is to make a Config.ts file with a class called config in it that looks like this: 


```javascript
export class Config {
    token: string;
    id: string;
    ownerid: string;
    prefixes: Array<string>;
    name: string;
    desc: string;
}
```