"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestEventXml = exports.createConfigFile = void 0;
const fs_1 = require("fs");
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
