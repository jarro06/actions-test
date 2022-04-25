"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readValueFromIni = exports.checkIfFileExists = exports.writeContentToFile = exports.convertTestTypeId = void 0;
const fs_1 = require("fs");
// YAML example needed
// selectSpecificValuesFromYAMLToStack YAML example needed
// selectSpecificValuesFromYAMLToList YAML example needed
// createEvenLists ? needed? only 1 workrer per step
// createEvenListsWithNodeNames ?? no nodes in github actions
// readConfigurationYaml YAML example needed
// readFullConfiurationYaml YAML example needed
// findJunitTestResults YAML example needed
function convertTestTypeId(testTypeId) {
    switch (testTypeId) {
        case 1: return "tosca";
        case 2: return "soapui";
        default: return undefined;
    }
}
exports.convertTestTypeId = convertTestTypeId;
function writeContentToFile(content, pathToFile) {
    (0, fs_1.writeFile)(pathToFile, content, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}
exports.writeContentToFile = writeContentToFile;
function checkIfFileExists(filePath) {
    return (0, fs_1.existsSync)(filePath);
}
exports.checkIfFileExists = checkIfFileExists;
function readValueFromIni(fileName, key) {
    let data = (0, fs_1.readFileSync)(fileName).toString();
    let lines = data.split("\n");
    let value = "";
    lines.forEach(line => {
        let keyWithValue = line.split("=");
        let propKey = keyWithValue[0];
        if (propKey == key) {
            value = keyWithValue[1];
        }
    });
    console.log(data);
    console.log(`read value ${value} from file ${fileName}`);
    return value;
}
exports.readValueFromIni = readValueFromIni;
