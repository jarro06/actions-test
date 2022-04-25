"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUpBranchesMatchingPattern = exports.deleteBranch = exports.getAllBranchesNames = exports.createBranch = exports.createFile = exports.initFlow = exports.cleanUpSynchPullRequests = exports.updateCommitStatusSuccess = exports.updateCommitStatusFailure = exports.updateCommitStatusPending = exports.updateCommitStatusError = exports.createPullRequest = exports.validateCommitMessages = exports.setLabels = exports.writeCommentToPr = exports.getAllOpenPullRequests = void 0;
const github_1 = require("@actions/github");
// ghe file
async function getAllOpenPullRequests(ghToken) {
    console.log('get all open pull requests');
    return await (0, github_1.getOctokit)(ghToken).rest.pulls.list({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        state: 'open'
    });
}
exports.getAllOpenPullRequests = getAllOpenPullRequests;
function writeCommentToPr(ghToken, prNumber, message) {
    console.log(`write comment to pr number: ${prNumber}`);
    (0, github_1.getOctokit)(ghToken).rest.issues.createComment({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        issue_number: prNumber,
        body: message,
    });
}
exports.writeCommentToPr = writeCommentToPr;
function setLabels(ghToken, prNumber, labels) {
    console.log(`set labels: ${labels} to pr number: ${prNumber}`);
    (0, github_1.getOctokit)(ghToken).rest.issues.setLabels({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        issue_number: prNumber,
        labels: labels
    });
}
exports.setLabels = setLabels;
async function validateCommitMessages(ghToken, pattern, prNumber) {
    console.log(`validate commit message with pattern: ${pattern}`);
    let messages = await (0, github_1.getOctokit)(ghToken).rest.pulls.listCommits({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        pull_number: prNumber,
    }).then(r => r.data.map(e => e.commit.message));
    let validCommitMessage = true;
    let reg = new RegExp(pattern);
    messages.forEach((message) => {
        if (!reg.test(message)) {
            validCommitMessage = false;
            console.log(`Message: ${message} does no match pattern: ${pattern}`);
        }
    });
    if (validCommitMessage) {
        console.log('all commits are valid');
    }
    console.log(messages);
}
exports.validateCommitMessages = validateCommitMessages;
function createPullRequest(ghToken, title, head, base, body, maintainer, draft) {
    console.log(`create pull request with title: ${title} from branch: ${head} to: ${base}`);
    (0, github_1.getOctokit)(ghToken).rest.pulls.create({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        head: head,
        base: base,
        title: title,
        maintainer_can_modify: maintainer,
        draft: draft
    });
}
exports.createPullRequest = createPullRequest;
function updateCommitStatusError(ghToken, commitSha, description) {
    updateCommitStatus(ghToken, commitSha, description, 'error');
}
exports.updateCommitStatusError = updateCommitStatusError;
function updateCommitStatusPending(ghToken, commitSha, description) {
    updateCommitStatus(ghToken, commitSha, description, 'pending');
}
exports.updateCommitStatusPending = updateCommitStatusPending;
function updateCommitStatusFailure(ghToken, commitSha, description) {
    updateCommitStatus(ghToken, commitSha, description, 'failure');
}
exports.updateCommitStatusFailure = updateCommitStatusFailure;
function updateCommitStatusSuccess(ghToken, commitSha, description) {
    updateCommitStatus(ghToken, commitSha, description, 'success');
}
exports.updateCommitStatusSuccess = updateCommitStatusSuccess;
function updateCommitStatus(ghToken, commitSha, description, state) {
    console.log(`update status to: ${state} for commit with sha: ${commitSha}`);
    (0, github_1.getOctokit)(ghToken).rest.repos.createCommitStatus({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        sha: commitSha,
        state: state,
        description: description
    });
}
function cleanUpSynchPullRequests(ghToken) {
    (0, github_1.getOctokit)(ghToken).rest.pulls.list({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        state: 'open'
    }).then(r => r.data.forEach(openPullRequest => {
        let title = openPullRequest.title;
        let prNumber = openPullRequest.number;
        if (title.includes("update from SAVI in")) {
            let updatedAt = new Date(openPullRequest.updated_at);
            let dateNow = new Date();
            let diff = dateNow.getTime() - updatedAt.getTime();
            let diffInDays = Math.ceil(diff / (1000 * 3600 * 24));
            if (diffInDays > 10) {
                console.log(`PR with title ${title} will be closed`);
                (0, github_1.getOctokit)(ghToken).rest.pulls.update({
                    owner: github_1.context.repo.owner,
                    repo: github_1.context.repo.repo,
                    pull_number: prNumber,
                    state: 'closed'
                });
            }
        }
    }));
}
exports.cleanUpSynchPullRequests = cleanUpSynchPullRequests;
// git file
async function initFlow(ghToken) {
    let content = "\nHello Repo, you are now a git flow project";
    let path = "README.md";
    let message = "init gitflow";
    let branches = await getAllBranchesNames(ghToken);
    createFile(ghToken, branches, "develop", content, path, message);
    createFile(ghToken, branches, "main", content, path, message);
}
exports.initFlow = initFlow;
async function createFile(ghToken, branches, branch, content, path, message) {
    if (!branches.includes(branch)) {
        await createBranch(ghToken, branch);
    }
    await (0, github_1.getOctokit)(ghToken).rest.repos.createOrUpdateFileContents({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        branch: branch,
        path: path,
        message: message,
        content: Buffer.from(content, 'binary').toString('base64'),
        committer: {
            name: "Octokit bot",
            email: "example@example.com"
        },
        author: {
            name: "Octokit bot",
            email: "example@example.com"
        }
    });
}
exports.createFile = createFile;
async function createBranch(ghToken, branch) {
    console.log(`create branch: ${branch}`);
    await (0, github_1.getOctokit)(ghToken).rest.git.createRef({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
        sha: github_1.context.sha,
        ref: `refs/heads/${branch}`
    });
}
exports.createBranch = createBranch;
async function getAllBranchesNames(ghToken) {
    return await (0, github_1.getOctokit)(ghToken).rest.repos.listBranches({
        owner: github_1.context.repo.owner,
        repo: github_1.context.repo.repo,
    }).then(resp => resp.data.map(el => el.name));
}
exports.getAllBranchesNames = getAllBranchesNames;
async function deleteBranch(ghToken, branchName) {
    console.log(`delete branch with name: ${branchName}`);
    let branchExists = await getAllBranchesNames(ghToken).then(r => r.includes(branchName));
    if (branchExists) {
        (0, github_1.getOctokit)(ghToken).rest.git.deleteRef({
            owner: github_1.context.repo.owner,
            repo: github_1.context.repo.repo,
            ref: `heads/${branchName}`
        });
    }
    else {
        console.log(`branch: ${branchName} does not exists`);
    }
}
exports.deleteBranch = deleteBranch;
async function cleanUpBranchesMatchingPattern(ghToken, pattern) {
    let branches = await getAllBranchesNames(ghToken);
    let reg = new RegExp(pattern);
    branches.forEach(async (branch) => {
        let lastUpdate = await (0, github_1.getOctokit)(ghToken).request(`GET /repos/${github_1.context.repo.owner}/${github_1.context.repo.repo}/commits/${branch}`)
            .then(r => r.data.commit.committer.date);
        console.log(lastUpdate);
        let updatedAt = new Date(lastUpdate);
        let dateNow = new Date();
        let diff = dateNow.getTime() - updatedAt.getTime();
        let diffInDays = Math.ceil(diff / (1000 * 3600 * 24));
        if (diffInDays > 10 && reg.test(branch)) {
            console.log(`Branch with name ${branch} will be closed`);
            deleteBranch(ghToken, branch);
        }
    });
}
exports.cleanUpBranchesMatchingPattern = cleanUpBranchesMatchingPattern;
