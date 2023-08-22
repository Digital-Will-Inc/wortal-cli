import uploadAPI from "../../api/upload.js";
import fs from "fs";

/**
 * Arguments that can be passed to the upload command.
 *
 * - `--bundle` - The path to the bundle file. Must be a .zip file.
 * - `--notes` - Notes to be added to the upload.
 */
const uploadArgs = ['--bundle', '--notes'];

/**
 * Uploads a game to Wortal.
 * @param args {string[]} - Arguments passed to the command. See: {@link uploadArgs}
 * @returns {Promise<*>} - Promise that resolves when the upload is complete, or rejects if the upload fails.
 */
const uploadCommand = async function (args) {
    const bundle = args['bundle'];
    const notes = args['notes'];

    if (!bundle || !_isZipFile(bundle)) {
        console.error(`Invalid bundle file: ${bundle}. Must be a .zip file.`);
        process.exit(1);
    }

    return await uploadAPI(bundle, notes);
}

function _isZipFile(filePath) {
    // Check the magic number of the file.
    const buffer = Buffer.alloc(4);
    try {
        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, 4, 0);
        fs.closeSync(fd);

        return (
            buffer[0] === 0x50 &&
            buffer[1] === 0x4b &&
            buffer[2] === 0x03 &&
            buffer[3] === 0x04
        );
    } catch (error) {
        return false;
    }
}

export default uploadCommand;
