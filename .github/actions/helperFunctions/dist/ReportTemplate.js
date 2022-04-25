"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportTemplate = void 0;
class ReportTemplate {
    constructor(reportData, testSuitesData) {
        this.reportData = reportData;
        this.testSuitesData = testSuitesData;
    }
    //TODO - ADD TESTCASE PART!!!
    getTemplate() {
        return `
        <html>
          <head>
            <meta charset='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
            <title>Test Report</title>
          </head>
        
          <body style='margin: 0;' lang=DE link=blue vlink=purple>
            <div>
              <div style='box-shadow: 0 2px 2px 0 silver;'>
                <table border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none; width:100%'>
                  <tr>
                    <td colspan=4 valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;font-size:18.0pt;color:white;font-weight:bold'>TEST RESULTS</td>
                  </tr>
                  <tr>
                    <td width='33%' valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;color:white;font-weight:bold'>${this.reportData.header1}</td>
                    <td width='34%' valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;color:white;font-weight:bold'>${this.reportData.header2}</td>
                    <td width='33%' valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;color:white;font-weight:bold'>${this.reportData.header3}</td>
                  </tr>
                </table>
                <div>
                  <br />          
                  ${this.getTestStatistics()}      
                  ${this.getTestCaseDetails()}                
         
                </div>
          </body>
        </html>
`;
    }
    getTestStatistics() {
        if (this.testSuitesData.length === 0) {
            return "";
        }
        let statisticPart = this.tableHeader();
        this.testSuitesData.forEach((testSuite) => {
            statisticPart += ReportTemplate.suiteStatistics(testSuite);
        });
        this.reportData.listWithFailedTestProjects.forEach((failedProject) => {
            statisticPart += ReportTemplate.failedProject(failedProject);
        });
        statisticPart += "</table>";
        return statisticPart;
    }
    tableHeader() {
        return `
        <table border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none'>
          <tr>
            <td valign=top style='border-top:solid #FFFFFF 1.0pt;border-left:solid #FFFFFF 1.0pt;border-bottom:none #4F81BD 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Link to Herold-Report:</td>
            <td valign=top style='border-top:none;border-left:solid #FFFFFF 1.0pt;border-bottom:none #95B3D7 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'><a href="${this.reportData.heroldUrl}">LINK</a></td>
          </tr>
          <tr>
            <td>&#160;</td>
          </tr>
          <tr>
            <td>&#160;</td>
          </tr>
          <tr>
            <td colspan=5 valign=top style='border:solid #DBE5F1 1.0pt;border-bottom:solid #95B3D7 1.0pt;background:#DBE5F1;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Test Overview</td>
          </tr>
          <tr>
            <td valign=top style='border-top:solid #FFFFFF 1.0pt;border-left:solid #FFFFFF 1.0pt;border-bottom:solid #4F81BD 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Test Suite</td>
            <td valign=top style='border-top:solid #FFFFFF 1.0pt;border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Passed</td>
            <td valign=top style='border-top:solid #FFFFFF 1.0pt;border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Failed</td>
            <td valign=top style='border-top:solid #FFFFFF 1.0pt;border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Error</td>
            <td valign=top style='border-top:solid #FFFFFF 1.0pt;border-left:none;border-bottom:solid #4F81BD 1.0pt;border-right:solid #FFFFFF 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Total</td>
          </tr>
        `;
    }
    static suiteStatistics(testSuite) {
        let color = testSuite.allSuccessful() ? "#EAF1DD" : "#F2DBDB";
        return `
            <tr>
                <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;border-left:solid ${color} 1.0pt;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>${testSuite.name}</td>
                <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black'>${testSuite.numberOfSuccessful}</td>
                <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black'>${testSuite.numberOfFailures}</td>
                <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black'>${testSuite.numberOfErrors}</td>
                <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;border-right:solid ${color} 1.0pt;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black'>${testSuite.numberOfTest}</td>
            </tr>
            `;
    }
    static failedProject(failedProject) {
        return `
        <tr>
            <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;border-left:solid #F2DBDB 1.0pt;background:#F2DBDB;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>${failedProject}</td>
            <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;background:#F2DBDB;padding:0cm 5.4pt 0cm 5.4pt;color:black'></td>
            <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;background:#F2DBDB;padding:0cm 5.4pt 0cm 5.4pt;color:black'></td>
            <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;background:#F2DBDB;padding:0cm 5.4pt 0cm 5.4pt;color:black'></td>
            <td valign=top style='border:none;border-bottom:solid #4F81BD 1.0pt;border-right:solid #F2DBDB 1.0pt;background:#F2DBDB;padding:0cm 5.4pt 0cm 5.4pt;color:black'>Project not found under the registered path</td>
        </tr>
        `;
    }
    getTestCaseDetails() {
        if (this.testSuitesData.length === 0) {
            return "";
        }
        let testCasePart = "";
        this.testSuitesData.forEach((testSuite) => {
            testCasePart += ReportTemplate.testsCaseHeader(testSuite);
            testSuite.testCasesData.forEach((testCase) => {
                testCasePart += ReportTemplate.testCaseDetails(testCase);
            });
            testCasePart += "</table>";
        });
        return testCasePart;
    }
    static testsCaseHeader(testSuite) {
        return `
        <table border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none; width:100%'>
        <tr>
            <td colspan=4 valign=top style='border:solid #DBE5F1 1.0pt;border-bottom:solid #95B3D7 1.0pt;background:#DBE5F1;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>${testSuite.name}</td>
        </tr>
        <tr>
            <td valign=top style='border-top:none;border-left:solid #FFFFFF 1.0pt;border-bottom:solid #95B3D7 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold;width:120px'>Test Name</td>
            <td valign=top style='border-top:none;border-left:none;border-bottom:solid #95B3D7 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold;width:60px'>Result</td>
            <td valign=top style='border-top:none;border-left:none;border-bottom:solid #95B3D7 1.0pt;border-right:none;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold;width:100px'>Time</td>
            <td valign=top style='border-top:none;border-left:none;border-bottom:solid #95B3D7 1.0pt;border-right:solid #FFFFFF 1.0pt;padding:0cm 5.4pt 0cm 5.4pt;color:black;font-weight:bold'>Failure Reason</td>
        </tr>
        `;
    }
    static testCaseDetails(testCase) {
        let color = testCase.passed() ? "#EAF1DD" : "#F2DBDB";
        return `
        <tr>
            <td valign=top style='border-top:none;border-left:solid ${color} 1.0pt;border-bottom:solid #95B3D7 1.0pt;border-right:none;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black;width:120px'>${testCase.name}</td>
            <td valign=top style='border-top:none;border-left:none;border-bottom:solid #95B3D7 1.0pt;border-right:none;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black;width:60px'>${testCase.passed() ? "Passed" : "Failed"}</td>
            <td valign=top style='border-top:none;border-left:none;border-bottom:solid #95B3D7 1.0pt;border-right:none;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black;width:100px'>${testCase.time} sec</td>
            <td valign=top style='border-top:none;border-left:none;border-bottom:solid #95B3D7 1.0pt;border-right:solid ${color} 1.0pt;background:${color};padding:0cm 5.4pt 0cm 5.4pt;color:black'>${testCase.failureReason}</td>
        </tr>
        `;
    }
}
exports.ReportTemplate = ReportTemplate;
