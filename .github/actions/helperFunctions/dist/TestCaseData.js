"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseData = void 0;
class TestCaseData {
    constructor(name, time, failureReason) {
        this.name = name;
        this.time = time;
        this.failureReason = failureReason;
    }
    passed() {
        return this.failureReason.trim().length === 0;
    }
}
exports.TestCaseData = TestCaseData;
