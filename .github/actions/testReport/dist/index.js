"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const TestReport_1 = require("./TestReport");
const inputName = (0, core_1.getInput)("name");
const ghToken = (0, core_1.getInput)("ghToken");
greet(inputName);
async function greet(name) {
    console.log(`'Hello ${name}!'`);
    let html = (0, TestReport_1.formatHtmlReport)("localhost:8080", "path", "header1", "header2", "header3", ["1", "2", "3"]);
    console.log(html);
}
