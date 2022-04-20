import {ReportTemplate} from "./ReportTemplate";
import {ReportData} from "./ReportData";
import {TestSuiteData} from "./TestSuiteData";
import {TestCaseData} from "./TestCaseData";
import fs from "fs";

export function formatHtmlReport(heroldUrl: string, pathToTeamResult: string, header1: string, header2: string, header3: string, listWithFailedTestProjects: string[]) {
    const DOMParser = require('xmldom').DOMParser;
    const parser = new DOMParser();

    let fileNames: string[] = fs.readdirSync(pathToTeamResult);

    //get "whole report" data
    let reportData: ReportData = new ReportData(heroldUrl, header1, header2, header3, listWithFailedTestProjects);

    //iterate through files/test suites/test cases to get suite/case data needed for report
    let testSuitesData: TestSuiteData[] = [];
    fileNames.forEach((file: string) => {

        //read xml files, get test suite nodes
        let content = fs.readFileSync(pathToTeamResult + "/" + file, "utf8");
        let xmlContent = parser.parseFromString(content);
        let testSuites: any[] = xmlContent.getElementsByTagName("testsuite");

        for (let i = 0; i < testSuites.length; i++) {
            let testCasesData: TestCaseData[] = [];

            //get test suite specific data
            let testSuite: any = testSuites[i];
            let name: string = testSuite.getAttribute("name");
            let numberOfTests: number = testSuite.getAttribute("tests");
            let numberOfFailures: number = testSuite.getAttribute("failures");
            let numberOfErrors: number = testSuite.getAttribute("errors");
            let numberOfSuccessful: number = numberOfTests - numberOfFailures - numberOfErrors;

            //get test case nodes under specific test suite
            let testCases = testSuite.getElementsByTagName("testcase");

            for (let j = 0; j < testCases.length; j++) {
                //get test case specific data
                let testCase: any = testCases[j];
                let name: string = testCase.getAttribute("name");
                let time: number = testCase.getAttribute("time");
                let failures: any[] = testCase.getElementsByTagName("failure");
                let errors: any[] = testCase.getElementsByTagName("error");

                let failureReason: string = "";
                if (failures.length > 0) {
                    failureReason = failures[0].childNodes[0].nodeValue
                } else if (errors.length > 0) {
                    failureReason = errors[0].childNodes[0].nodeValue
                }
                testCasesData.push(new TestCaseData(name, time, failureReason));
            }

            testSuitesData.push(new TestSuiteData(
                name,
                numberOfTests,
                numberOfFailures,
                numberOfErrors,
                numberOfSuccessful,
                testCasesData
            ));
        }
    });

    return new ReportTemplate(reportData, testSuitesData).getTemplate();
}