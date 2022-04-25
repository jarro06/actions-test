"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHtmlReport = void 0;
const StringBuilder_1 = require("./StringBuilder");
// export function sendTestReportEmailByTeam(heroldUrl: string, pathToTeamResult: string, recipientsString: string, header1: string, header2: string, header3: string, listWithFailedTestProjects: string[]): Promise<any> {
//     console.log('create html report for team folder ' + pathToTeamResult)
//     let emailBody: string = formatHtmlReport(heroldUrl, pathToTeamResult, header1, header2, header3, listWithFailedTestProjects)
//     // if (recipientsString != null && recipientsString.includes("@")) {
//     //     sendHtmlEmail(emailBody, recipientsString, "Test-Results - " + header1 + " - " + header2 + " - " + header3)
//     // } else {
//     //     console.log('no email recipient defined. Test report is not sent');
//     // }
// }
function formatHtmlReport(heroldUrl, pathToTeamResult, header1, header2, header3, listWithFailedTestProjects) {
    const sb = new StringBuilder_1.StringBuilder();
    sb.write("<!DOCTYPE html>\n");
    sb.write("<html'>");
    sb.write("<head>");
    sb.write("<meta charset='utf-8'/>");
    sb.write("<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'/>");
    sb.write("<title>Test Report</title>");
    sb.write("</head>");
    sb.write("<body style='margin: 0;' lang=DE link=blue vlink=purple>");
    sb.write("<!--[if mso]>");
    sb.write("<style type='text/css'>");
    sb.write("body, table, td {font-family: Arial, Helvetica, sans-serif !important;}");
    sb.write("</style>");
    sb.write("<![endif]-->");
    sb.write("<div>");
    sb.write("<div style='box-shadow: 0 2px 2px 0 silver;'>");
    sb.write("<table border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none; width:100%'>");
    sb.write("<tr>");
    sb.write("<td colspan=4 valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;font-size:18.0pt;color:white;font-weight:bold'>TEST RESULTS</td>");
    sb.write("</tr>");
    sb.write("<tr>");
    sb.write("<td width='33%' valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;color:white;font-weight:bold'>" + header1 + "</td>");
    sb.write("<td width='34%' valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;color:white;font-weight:bold'>" + header2 + "</td>");
    sb.write("<td width='33%' valign=top style='border:solid #4F81BD;background:#4F81BD;padding:0cm 5.4pt 0cm 5.4pt;text-align:center;color:white;font-weight:bold'>" + header3 + "</td>");
    sb.write("</tr>");
    sb.write("</table>");
    sb.write("<div>");
    sb.write("<br/>");
    //more text depending on test suites
    sb.write("</div>");
    sb.write("</body>");
    sb.write("</html>");
    return sb.toString();
}
exports.formatHtmlReport = formatHtmlReport;
