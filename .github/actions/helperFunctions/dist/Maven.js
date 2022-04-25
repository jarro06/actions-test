"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multilineTest = exports.newProject = exports.zip = exports.testUnit = exports.run = exports.runWithMavenOpts = exports.runWithName = exports.runWithPath = exports.buildOffline = exports.buildWithSettings = exports.build = exports.validate = void 0;
const ShUtils_1 = require("./ShUtils");
function validate(settings) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn -e -s ${settings} validate
    `);
}
exports.validate = validate;
function build() {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
	    mvn -e -f pom.xml -Dmaven.test.failure.ignore=true package -DjvmArgs='-Xmx4096m -Xms512m -XX:PermSize=512m -XX:MaxPermSize=4096m'
    `);
}
exports.build = build;
function buildWithSettings(settings) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn -e -f pom.xml -s ${settings} compile -Pcommon,client,test -Dstyle.color=always -DjvmArgs='-Xmx4096m -Xms512m -XX:PermSize=512m -XX:MaxPermSize=4096m'
    `);
}
exports.buildWithSettings = buildWithSettings;
function buildOffline(settings) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn --offline -e -f pom.xml -s ${settings} -Dstyle.color=always -DskipTests compile
    `);
}
exports.buildOffline = buildOffline;
function runWithPath(settings, pathToPom, target) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn -e -f ${pathToPom} -s ${settings} -Dstyle.color=always ${target}
    `);
}
exports.runWithPath = runWithPath;
function runWithName(settings, pomName, target) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn -e -f ${pomName} -s ${settings} -Dstyle.color=always ${target}
    `);
}
exports.runWithName = runWithName;
function runWithMavenOpts(settings, target, profile, extraParamaters = "", mavenOpts = "") {
    (0, ShUtils_1.execInShell)(`
        export MAVEN_OPTS=${mavenOpts}
        export JAVA_TOOL_OPTIONS=
		mvn -e -f pom.xml -s ${settings} -Dstyle.color=always ${target} -P${profile} ${extraParamaters}
    `);
}
exports.runWithMavenOpts = runWithMavenOpts;
function run(settings, target) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn -e -f pom.xml -s ${settings} -Dstyle.color=always ${target}
    `);
}
exports.run = run;
function testUnit(settings) {
    (0, ShUtils_1.execInShell)(`
        export JAVA_TOOL_OPTIONS=
		mvn -f pom.xml -s ${settings} integration-test -Ptest -Dstyle.color=always -Dmaven.test.failure.ignore=true -Dabs.config=ata0
    `);
}
exports.testUnit = testUnit;
function zip() {
    (0, ShUtils_1.execInShell)(`
        cd target/repository
        zip -rv updatesite.zip .
        cd ../..
    `);
}
exports.zip = zip;
function newProject(projectName, groupId) {
    (0, ShUtils_1.execInShell)(`
        mvn -B archetype:generate -DgroupId=${groupId} -DartifactId=${projectName} -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4
    `);
}
exports.newProject = newProject;
function multilineTest() {
    (0, ShUtils_1.execInShell)(`
        pwd
        ls
        echo multilineTest
    `);
}
exports.multilineTest = multilineTest;
