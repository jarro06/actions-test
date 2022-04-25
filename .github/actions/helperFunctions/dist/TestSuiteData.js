"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuiteData = void 0;
class TestSuiteData {
    constructor(name, numberOfTest, numberOfFailures, numberOfErrors, numberOfSuccessful, testCasesData) {
        this.name = name;
        this.numberOfTest = numberOfTest;
        this.numberOfFailures = numberOfFailures;
        this.numberOfErrors = numberOfErrors;
        this.numberOfSuccessful = numberOfSuccessful;
        this.testCasesData = testCasesData;
    }
    allSuccessful() {
        return this.numberOfErrors == 0 && this.numberOfFailures == 0;
    }
}
exports.TestSuiteData = TestSuiteData;
