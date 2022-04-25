"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTeamPayload = exports.writePayload = exports.uploadJunitResult = exports.uploadMavenLog = void 0;
const ShUtils_1 = require("./ShUtils");
const fs_1 = require("fs");
function uploadMavenLog(mavenLogUrl, pathToPayload, pathToLogFile) {
    sendResults("text/plain", pathToLogFile, pathToPayload, mavenLogUrl);
}
exports.uploadMavenLog = uploadMavenLog;
function uploadJunitResult(mavenLogUrl, pathToPayload, pathToJunitXml) {
    sendResults("application/xml", pathToJunitXml, pathToPayload, mavenLogUrl);
}
exports.uploadJunitResult = uploadJunitResult;
function sendResults(contentType, pathToResult, pathToEnvFile, url, proxyUrl = "http://surf.cc.azd.cloud.allianz:8080") {
    (0, ShUtils_1.execInShell)(`curl -x ${proxyUrl} -H "Content-Type:multipart/form-data" -F "file=@${pathToResult};type=${contentType}" -F "env=@${pathToEnvFile};type=application/json" ${url}`);
}
function writePayload(company, fileName, testCase, branch = "develop") {
    let timestamp = new Date().toLocaleString('en_EU', { timeZone: 'Europe/Paris' });
    let payload = createPayload(testCase, timestamp, branch, company);
    if (!fileName.endsWith(".json")) {
        fileName += ".json";
    }
    writeJson(fileName, payload);
}
exports.writePayload = writePayload;
function writeTeamPayload(company, fileName, testCases, branch = "develop") {
    let timestamp = new Date().toLocaleString('en_EU', { timeZone: 'Europe/Paris' });
    let testObjectIds = [];
    let jiraIds = [];
    let testObjectName = [];
    let testCase = null;
    testCases.forEach(testCaseElement => {
        if (testCase == null) {
            testCase = testCaseElement;
        }
        if (testObjectIds.includes(testCaseElement.testObjectId) != null && !testObjectIds.includes(testCaseElement.testObjectId)) {
            testObjectIds.push(testCaseElement.testObjectId);
        }
        if (jiraIds.includes(testCaseElement.jiraID) != null && !jiraIds.includes(testCaseElement.jiraID)) {
            jiraIds.push(testCaseElement.jiraID);
        }
        if (testObjectName.includes(testCaseElement.testObjectName) != null && !testObjectName.includes(testCaseElement.testObjectName)) {
            testObjectName.push(testCaseElement.testObjectName);
        }
    });
    let payload = createPayload(testCase, timestamp, branch, company);
    if (!fileName.endsWith(".json")) {
        fileName += ".json";
    }
    writeJson(fileName, payload);
}
exports.writeTeamPayload = writeTeamPayload;
function createPayload(testCase, timestamp, branch, company) {
    return `{
    "teststufe": "${testCase.testStufe}",
    "testart": "${testCase.testUtil}",
    "businessArea": "${testCase.businessArea}",
    "tribe": "${testCase.tribe}",
    "team": "${testCase.team}",
    "release": "${testCase.release}",
    "testEnvironment": "${testCase.environment}",
    "branch": "${branch}",
    "company": "${company}",
    "application": "${testCase.application}",
    "testObjectId": "${testCase.testObjectId}",
    "toscaWorkspace": "${testCase.toscaWorkspace}",
    "toscaUniqueId": "${testCase.toscaUniqueId}",
    "soapUiPath": "${testCase.soapUiPath}",
    "jUnitSuitePath": "${testCase.junitSuite}",
    "jiraID": "${testCase.jiraID}",
    "testObjectName": "${testCase.testObjectName}",
    "timestamp": "${timestamp}",
    }`;
}
function writeJson(fileName, json) {
    let prettyJson = JSON.stringify(JSON.parse(json), undefined, 4);
    (0, fs_1.writeFile)(fileName, prettyJson, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}
