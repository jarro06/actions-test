"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const TestReport_1 = require("./TestReport");
const heroldUrl = (0, core_1.getInput)("heroldUrl");
const path = (0, core_1.getInput)("path");
const header1 = (0, core_1.getInput)("header1");
const header2 = (0, core_1.getInput)("header2");
const header3 = (0, core_1.getInput)("header3");
const failedTestProjects = (0, core_1.getInput)("failedTestProjects");
generateReport(heroldUrl, path, header1, header2, header3, failedTestProjects);
function generateReport(heroldUrl, path, header1, header2, header3, failedTestProjects) {
    console.log(`'Path to report xml files: ${path}'`);
    let listOfFailedTestProjects = failedTestProjects.length === 0 ? [] : failedTestProjects.split(",");
    let html = (0, TestReport_1.formatHtmlReport)(heroldUrl, path, header1, header2, header3, listOfFailedTestProjects);
    console.log(html);
}
