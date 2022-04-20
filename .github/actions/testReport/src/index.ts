import { getInput } from "@actions/core"
import {formatHtmlReport} from "./TestReport";

const heroldUrl: string = getInput("heroldUrl")
const path: string = getInput("path")
const header1: string = getInput("header1")
const header2: string = getInput("header2")
const header3: string = getInput("header3")
const failedTestProjects: string = getInput("failedTestProjects")

generateReport(heroldUrl, path, header1, header2, header3, failedTestProjects)

function generateReport(heroldUrl: string, path: string, header1: string, header2: string, header3: string, failedTestProjects: string) {
    console.log(`'Path to report xml files: ${path}'`)
    let listOfFailedTestProjects = failedTestProjects.length === 0 ? [] : failedTestProjects.split(",");
    let html:string = formatHtmlReport(heroldUrl, path, header1, header2, header3, listOfFailedTestProjects)
    console.log(html);
}