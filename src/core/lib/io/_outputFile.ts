/**
 * _outputFile - async/await wrapper for outputFile.
 */

import fs from "fs-extra";

export const _outputFile = async function(path: string, content: string): Promise<void> {
    try {
        await fs.outputFile(path, content);
    } catch (error) {
        console.error(`there was an error when writing file ${path}`);
        throw error;
    }
};
