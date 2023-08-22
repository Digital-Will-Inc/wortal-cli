#!/usr/bin/env node

import uploadCommand from "../src/cmd/game/upload.js";
import installCommand from "../src/cmd/install.js";
import getConfigCommand from "../src/cmd/config/get.js";
import setConfigCommand from "../src/cmd/config/set.js";
import getGameCommand from "../src/cmd/game/get.js";
import setGameCommand from "../src/cmd/game/set.js";

/**
 * Commands that can be passed to the CLI.
 *
 * - `config` - Gets or sets configuration values.
 * - `install` - Installs the CLI.
 * - `upload` - Uploads a game to Wortal.
 * - `game` - Gets or sets game values.
 */
const commands = ['upload', 'install', 'config', 'game'];

const command = process.argv[2];
const args = process.argv.slice(3);
const parsedArgs = {};
let currentArg = null;

_parseArgs(args);
switch (command) {
    case 'upload':
        uploadCommand(parsedArgs).then(r => {
            console.log(r);
            process.exit(0);
        }).catch(e => {
            console.error(e);
            process.exit(1);
        });
        break;
    case 'install':
        installCommand().then(r => {
            console.log(r);
            process.exit(0);
        }).catch(e => {
            console.error(e);
            process.exit(1);
        });
        break;
    case 'config':
        const configGetterSetter = _parseGetterSetter();
        if (configGetterSetter === 'get') {
            console.log(getConfigCommand(args[1]));
            process.exit(0);
        } else if (configGetterSetter === 'set') {
            setConfigCommand(args[1], args[2]);
            process.exit(0);
        } else {
            console.error(`Invalid command. Config commands include: get, set`);
            process.exit(1);
        }
        break;
    case 'game':
        const gameGetterSetter = _parseGetterSetter();
        if (gameGetterSetter === 'get') {
            console.log(getGameCommand(args[1]));
            process.exit(0);
        } else if (gameGetterSetter === 'set') {
            setGameCommand(args[1], args[2]);
            process.exit(0);
        } else {
            console.error(`Invalid command. Game commands include: get, set`);
            process.exit(1);
        }
        break;
    default:
        console.error(`Invalid command: ${command} Commands include: ${commands.join(', ')}`);
        process.exit(1);
}

function _parseArgs(args) {
    for (const arg of args) {
        if (arg.startsWith('--')) {
            // This is a new argument name.
            currentArg = arg.slice(2);
            parsedArgs[currentArg] = '';
        } else if (currentArg !== null) {
            // This is the value for the current argument.
            parsedArgs[currentArg] = arg;
            // Reset to prepare for the next argument.
            currentArg = null;
        }
    }
}

function _parseGetterSetter() {
    if (args[0] === 'get') {
        return 'get';
    } else if (args[0] === 'set') {
        return 'set';
    } else {
        return null;
    }
}
