import {TestSuiteData} from "./TestSuiteData";

export class TestCaseData {
    name: string;
    time: number;
    failureReason: string;

    constructor(name: string, time: number, failureReason: string) {
        this.name = name;
        this.time = time;
        this.failureReason = failureReason;
    }

    passed(): boolean {
        return this.failureReason.trim().length === 0;
    }
}