export class ReportData {
    heroldUrl: string
    header1: string;
    header2: string;
    header3: string;
    listWithFailedTestProjects: string[];

    constructor(heroldUrl: string, header1: string, header2: string, header3: string, listWithFailedTestProjects: string[]) {
        this.heroldUrl = heroldUrl;
        this.header1 = header1;
        this.header2 = header2;
        this.header3 = header3;
        this.listWithFailedTestProjects = listWithFailedTestProjects;
    }
}