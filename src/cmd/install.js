import config from "../api/config.js";
import game from "../api/game.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const installCommand = async function () {
    console.log('Installation started.');

    let token = config.get('token');
    if (!token) {
        token = await _getUserInput('Enter your Wortal API token: ');

        if (!token || typeof token !== 'string') {
            console.error(`Invalid token: ${token}`);
            process.exit(1);
        }

        config.set('token', token);
        console.log('Token saved.');
    } else {
        console.log('Token loaded from config.');
    }

    const gameID = await _getUserInput('Enter your game ID: ');

    const gameIDInt = parseInt(gameID);
    if (isNaN(gameIDInt)) {
        console.error(`Invalid game ID: ${gameID}`);
        process.exit(1);
    }

    game.set('gameID', gameIDInt);
    console.log('Game ID saved.');

    console.log('Installation complete.');
    process.exit(0);
}

function _getUserInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

export default installCommand;
