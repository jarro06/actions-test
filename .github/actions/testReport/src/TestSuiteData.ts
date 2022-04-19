import {TestCaseData} from "./TestCaseData";

export class TestSuiteData {
    name: string;
    numberOfTest: number;
    numberOfSuccessful: number;
    numberOfFailures: number;
    numberOfErrors: number;
    testCasesData: TestCaseData[];


    constructor(name: string, numberOfTest: number, numberOfFailures: number, numberOfErrors: number,  numberOfSuccessful: number, testCasesData: TestCaseData[]) {
        this.name = name;
        this.numberOfTest = numberOfTest;
        this.numberOfFailures = numberOfFailures;
        this.numberOfErrors = numberOfErrors;
        this.numberOfSuccessful = numberOfSuccessful;
        this.testCasesData = testCasesData;
    }

    allSuccessful(): boolean {
        return this.numberOfErrors == 0 && this.numberOfFailures == 0;
    }
}