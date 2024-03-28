"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const fs = require("fs");
const path = require("path");
const mkdirp_1 = require("mkdirp");
const writeFile = async (filePath, data) => {
    await (0, mkdirp_1.mkdirp)(path.dirname(filePath));
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};
exports.writeFile = writeFile;
//# sourceMappingURL=writeFile.js.map