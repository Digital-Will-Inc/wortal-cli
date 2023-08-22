import game from "../../api/game.js";

const setGameCommand = (key, value) => {
    if (!key || typeof key !== 'string') {
        throw new Error('Key is required');
    }

    if (key === 'gameID') {
        value = parseInt(value);
        if (isNaN(value) || value < 0) {
            throw new Error('GameID must be a valid number.');
        }
    }

    game.set(key, value);
};

export default setGameCommand;
