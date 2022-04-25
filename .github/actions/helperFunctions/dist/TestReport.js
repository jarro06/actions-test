"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHtmlReport = void 0;
const ReportTemplate_1 = require("./ReportTemplate");
const ReportData_1 = require("./ReportData");
const TestSuiteData_1 = require("./TestSuiteData");
const TestCaseData_1 = require("./TestCaseData");
const fs_1 = __importDefault(require("fs"));
function formatHtmlReport(heroldUrl, pathToTeamResult, header1, header2, header3, listWithFailedTestProjects) {
    const DOMParser = require('xmldom').DOMParser;
    const parser = new DOMParser();
    //TODO - take files from param
    let resultPath = "C:\\Users\\ADMIN\\IdeaProjects\\ts-action\\testResults";
    let fileNames = fs_1.default.readdirSync(resultPath);
    //get "whole report" data
    let reportData = new ReportData_1.ReportData(heroldUrl, header1, header2, header3, listWithFailedTestProjects);
    //iterate through files/test suites/test cases to get suite/case data needed for report
    let testSuitesData = [];
    fileNames.forEach((file) => {
        //read xml files, get test suite nodes
        let content = fs_1.default.readFileSync(resultPath + "/" + file, "utf8");
        let xmlContent = parser.parseFromString(content);
        let testSuites = xmlContent.getElementsByTagName("testsuite");
        for (let i = 0; i < testSuites.length; i++) {
            let testCasesData = [];
            //get test suite specific data
            let testSuite = testSuites[i];
            let name = testSuite.getAttribute("name");
            let numberOfTests = testSuite.getAttribute("tests");
            let numberOfFailures = testSuite.getAttribute("failures");
            let numberOfErrors = testSuite.getAttribute("errors");
            let numberOfSuccessful = numberOfTests - numberOfFailures - numberOfErrors;
            //get test case nodes under specific test suite
            let testCases = testSuite.getElementsByTagName("testcase");
            for (let j = 0; j < testCases.length; j++) {
                //get test case specific data
                let testCase = testCases[j];
                let name = testCase.getAttribute("name");
                let time = testCase.getAttribute("time");
                let failures = testCase.getElementsByTagName("failure");
                let errors = testCase.getElementsByTagName("error");
                let failureReason = "";
                if (failures.length > 0) {
                    failureReason = failures[0].childNodes[0].nodeValue;
                }
                else if (errors.length > 0) {
                    failureReason = errors[0].childNodes[0].nodeValue;
                }
                testCasesData.push(new TestCaseData_1.TestCaseData(name, time, failureReason));
            }
            testSuitesData.push(new TestSuiteData_1.TestSuiteData(name, numberOfTests, numberOfFailures, numberOfErrors, numberOfSuccessful, testCasesData));
        }
    });
    return new ReportTemplate_1.ReportTemplate(reportData, testSuitesData).getTemplate();
}
exports.formatHtmlReport = formatHtmlReport;
