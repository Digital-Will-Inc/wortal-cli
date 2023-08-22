import path from "path";
import fs from "fs";

const dataPath = path.join(process.cwd(), '.wortal.json');
const dataKeys = ["gameID"];

let gameData = {};
let isInitialized = false;

const get = (key, defaultValue) => {
    if (!isInitialized) {
        load();
        isInitialized = true;
    }

    if (!key) {
        return gameData;
    }

    if (!(key in gameData)) {
        return defaultValue;
    }

    return gameData[key];
};

const set = (key, value) => {
    if (!isInitialized) {
        load();
        isInitialized = true;
    }

    if (dataKeys.indexOf(key) === -1) {
        throw new Error(`Not a valid config key '${key}'`);
    }

    gameData[key] = value;
    save();
};

const load = () => {
    try {
        if (fs.existsSync(dataPath)) {
            const dataJson = fs.readFileSync(dataPath, 'utf-8');
            gameData = JSON.parse(dataJson);
            if (typeof gameData.gameID !== 'number' || gameData.gameID < 0) {
                console.error(`Invalid gameID: ${gameData.gameID}`);
            }
        } else {
            const defaultData = JSON.stringify({ gameID: 0 }, null, 4);
            fs.writeFileSync(dataPath, defaultData, 'utf-8');
            console.warn(`Created default .wortal.json file. Please fill in the gameID before using this utility.`);
        }
    } catch (e) {
        console.error(`Failed to load .wortal.json: ${e.message}`);
        process.exit(1);
    }
}

const save = () => {
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }

    fs.writeFileSync(dataPath, JSON.stringify(gameData, null, 4));
};

const reset = () => isInitialized = false;

export default {
    get,
    set,
    reset,
};
