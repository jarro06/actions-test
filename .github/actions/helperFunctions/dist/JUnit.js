"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeExecutions = exports.injectCredentaislIntoConfig = exports.injectTestsIntoPom = void 0;
const fs_1 = require("fs");
// needs test configuraiton yaml file to test it properly
function injectTestsIntoPom(releaseTests) {
    let data = (0, fs_1.readFileSync)("pom.xml").toString();
    let startIncludesBlock = data.indexOf("<includes>\n");
    let endIncludesBlock = data.indexOf("</includes>\n");
    endIncludesBlock += "</includes>".length;
    let subString = data.substring(startIncludesBlock, endIncludesBlock);
    let mergedExecutions = mergeExecutions(releaseTests);
    let newData = data.replace(subString, mergedExecutions);
    (0, fs_1.writeFileSync)("pom.xml", newData);
}
exports.injectTestsIntoPom = injectTestsIntoPom;
function injectCredentaislIntoConfig(configFileName, user, password) {
    let data = (0, fs_1.readFileSync)(configFileName).toString();
    data = data.replace("JUNIT-TU/USER=\"\"", `JUNIT-TU/USER="${user}"`);
    data = data.replace("JUNIT-TU/PWD=\"\"", `JUNIT-TU/PWD="${password}"`);
    (0, fs_1.writeFileSync)(configFileName, data);
}
exports.injectCredentaislIntoConfig = injectCredentaislIntoConfig;
function mergeExecutions(releaseTests) {
    let mergedExecutions = "<includes>\n";
    releaseTests.forEach(testCase => {
        mergedExecutions += `<include>${testCase.junitSuite}</include>\n`;
    });
    mergedExecutions += "</includes>\n";
    return mergedExecutions;
}
exports.mergeExecutions = mergeExecutions;
