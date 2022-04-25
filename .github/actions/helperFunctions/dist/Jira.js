"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewProject = void 0;
const http_1 = require("http");
function createNewProject(url, credentailsId, projectName, projectKey, email) {
    let body = `
        {
            "key": "${projectKey}",
            "name": "${projectName}",
            "projectTypeKey": "business",
            "projectTemplateKey": "com.atlassian.jira-core-project-templates:jira-core-project-management",
            "description": "This is project ${projectName} on JMP dev04",
            "lead": "${email}",
            "url": "http://atlassian.com",
            "assigneeType": "PROJECT_LEAD",
            "avatarId": 10200
        }`;
    var post_options = {
        host: url,
        path: '/rest/api/2/project',
        method: 'POST',
        headers: {
            // what about auth? jenkins is using auth param, from key=value gloabl storage?
            // here we should probably use just 'Basic **' as github.secret and pass it to function as parameter
            // 'Authorization: Basic cm9ubmllOlRhdGVyYnVnMTIj'
            'Content-Type': 'application/json',
        }
    };
    let post = (0, http_1.request)(post_options, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            console.log(`Content: ${chunk}`);
        });
        console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
    });
    post.write(body);
    post.end();
}
exports.createNewProject = createNewProject;
