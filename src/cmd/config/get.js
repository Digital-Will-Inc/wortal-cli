import config from "../../api/config.js";

const getConfigCommand = (key) => {
    if (!key || typeof key !== 'string') {
        throw new Error('Key is required');
    }

    const value = config.get(key);
    if (value === undefined) {
        throw new Error('Key does not exist.')
    }

    return value;
};

export default getConfigCommand;
