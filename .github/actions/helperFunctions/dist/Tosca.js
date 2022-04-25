"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestEventXml = exports.createConfigFile = exports.runToscaTestForSingleEntity = exports.runToscaTestForSpecificEntity = exports.runParallel = exports.downloadJar = void 0;
const fs_1 = require("fs");
const ShUtils_1 = require("./ShUtils");
function downloadJar(ciClientUrl) {
    console.log(`download jar from ${ciClientUrl}`);
    (0, ShUtils_1.execInShell)(`wget -O ToscaCIJavaClient.jar ${ciClientUrl} --proxy=no`);
}
exports.downloadJar = downloadJar;
function runParallel() {
    // only 1 worker per step, maybe on our own infrastracture it's possible?
}
exports.runParallel = runParallel;
function runToscaTestForSpecificEntity(dexUrl, aoServicePort) {
    let testCases = []; // read from yaml file latter
    testCases.forEach(testCase => {
        createConfigFile(dexUrl, aoServicePort, testCase.toscaWorkspace);
        createTestEventXml("", testCase.toscaUniqueId); // where is this 'folderName' param?
        runToscaTestForSingleEntity(testCase.toscaUniqueId);
        let pathToJunitXml = testCase.toscaUniqueId + ".xml";
        // Send data to Harold
        // to be implemented
    });
}
exports.runToscaTestForSpecificEntity = runToscaTestForSpecificEntity;
function runToscaTestForSingleEntity(toscaUniqueId) {
    (0, ShUtils_1.execInShell)(`export JAVA_TOOL_OPTIONS=
                java -jar ToscaCIJavaClient.jar -m distributed -c nodes.xml -r ${toscaUniqueId}.xml`);
}
exports.runToscaTestForSingleEntity = runToscaTestForSingleEntity;
function createConfigFile(dexUrl, aoServicePort, toscaWorkspace) {
    let content = `address=${dexUrl}/DistributionServerService/ManagerService.svc
        username=
        password=
        considerexecutionresult=false
        resulttype=junit
        pollinginterval=60000
        ciclienttimeout=36000000
        reportintermediateresults=true
        workspacelessexecution=true
        aoserviceaddress=${dexUrl}:${aoServicePort}/
        workspacerootname=${toscaWorkspace}`;
    (0, fs_1.writeFile)("config.properties", content, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("Tosca configuration file created");
    });
}
exports.createConfigFile = createConfigFile;
function createTestEventXml(folderName, toscaUniqueId) {
    let optionalResultFolder = "";
    if (folderName) {
        optionalResultFolder = `resultfolder="${folderName}"`;
    }
    let content = `<?xml version="1.0" encoding="utf-16" ?>
                <testConfiguration>
                    <TestEvents>
                        <TestEvent ${optionalResultFolder}>${toscaUniqueId}</TestEvent>
                    </TestEvents>
                </testConfiguration>`;
    (0, fs_1.writeFile)("nodes.xml", content, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("Test event configuration file created");
    });
}
exports.createTestEventXml = createTestEventXml;
