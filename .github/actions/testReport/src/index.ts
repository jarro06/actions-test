import { getInput } from "@actions/core"
import {formatHtmlReport} from "./TestReport";

const inputName: string = getInput("path")

generateReport(inputName)

async function generateReport(path: string) {
    console.log(`'Path to report xml files: ${path}!'`)
    let html:string = formatHtmlReport("localhost:8080", path, "header1", "header2", "header3", ["1","2","3"])
    console.log(html);
}


