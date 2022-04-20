"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportData = void 0;
class ReportData {
    constructor(heroldUrl, header1, header2, header3, listWithFailedTestProjects) {
        this.heroldUrl = heroldUrl;
        this.header1 = header1;
        this.header2 = header2;
        this.header3 = header3;
        this.listWithFailedTestProjects = listWithFailedTestProjects;
    }
}
exports.ReportData = ReportData;
