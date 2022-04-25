"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execInShell = void 0;
const child_process_1 = require("child_process");
function execInShell(command) {
    console.log(`sh command: ${command}`);
    (0, child_process_1.exec)(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
exports.execInShell = execInShell;
