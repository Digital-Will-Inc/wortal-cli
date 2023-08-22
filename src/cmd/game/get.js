import game from "../../api/game.js";

const getGameCommand = (key) => {
    if (!key || typeof key !== 'string') {
        throw new Error('Key is required');
    }

    const value = game.get(key);
    if (value === undefined) {
        throw new Error('Key does not exist.')
    }

    return value;
};

export default getGameCommand;
