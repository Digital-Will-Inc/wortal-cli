import os from "os";
import fs from "fs";

const configDir = `${os.homedir()}/.config/wortal-cli`;
const configName = 'config.json';
const configPath = `${configDir}/${configName}`;
const configKeys = ["token"];

let configData = {};
let isInitialized = false;

const get = (key, defaultValue) => {
    if (!isInitialized) {
        load();
        isInitialized = true;
    }

    if (!key) {
        return configData;
    }

    if (!(key in configData)) {
        return defaultValue;
    }

    return configData[key];
};

const set = (key, value) => {
    if (!isInitialized) {
        load();
        isInitialized = true;
    }

    if (configKeys.indexOf(key) === -1) {
        throw new Error(`Not a valid config key '${key}'`);
    }

    configData[key] = value;
    save();
};

const load = () => {
    try {
        configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        configData = {};
    }
};

const save = () => {
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir);
    }

    fs.writeFileSync(configPath, JSON.stringify(configData, null, 4));
};

const reset = () => isInitialized = false;

export default {
    get,
    set,
    reset,
};
