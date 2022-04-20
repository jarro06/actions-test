import { getInput } from "@actions/core"
import {formatHtmlReport} from "./TestReport";

const inputName: string = getInput("name")

greet(inputName)

async function greet(name: string) {
    console.log(`'Hello ${name}!'`)
    let html:string = formatHtmlReport("localhost:8080", "path", "header1", "header2", "header3", ["1","2","3"])
    console.log(html);
}


