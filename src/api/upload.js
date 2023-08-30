import config from "./config.js";
import game from "./game.js";
import fs from "fs";
import path from "path";

const uploadEndpoint = 'https://html5gameportal.com/api/v1/ofa/wortal/upload';

/**
 * Uploads a game to Wortal.
 * @param bundle - The path to the bundle file. Must be a .zip file.
 * @param notes - Notes to be added to the upload.
 * @param token - The token to use for authentication.
 * @param gameID - The ID of the game to upload to.
 * @returns {Promise<any>} - Promise that resolves when the upload is complete, or rejects if the upload fails.
 */
const uploadAPI = async (bundle, notes, token, gameID) => {
    if (!token) {
        token = config.get('token');
    }

    if (!gameID) {
        gameID = game.get('gameID');
    }

    const fileBuffer = fs.readFileSync(bundle);
    const blob = _bufferToBlob(fileBuffer);

    if (!token) {
        console.error(`token is missing or not set.`);
        process.exit(1);
    }

    if (!gameID) {
        console.error(`gameID is missing or not set.`);
        process.exit(1);
    }

    const headers = new Headers({
        'Authorization': `Token ${token}`
    });

    const formData = new FormData();
    formData.append('notes', notes || '');
    formData.append('archive', blob, path.basename(bundle));
    formData.append('game_id', gameID);

    return fetch(uploadEndpoint, {
        method: 'POST',
        headers: headers,
        body: formData
    })
        .then(response => response.json())
        .catch(error => {
            console.error("Failed to upload:", error.message);
        });
}

function _bufferToBlob(buffer) {
    return new Blob([buffer], { type: 'application/zip' });
}

export default uploadAPI;
