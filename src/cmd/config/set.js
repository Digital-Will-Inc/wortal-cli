import config from "../../api/config.js";

const setConfigCommand = (key, value) => {
    if (typeof key !== 'string') {
        throw new Error('Key must be a string.');
    }

    if (typeof value !== 'string') {
        throw new Error('Value must be a string.');
    }

    config.set(key, value);
};

export default setConfigCommand;
