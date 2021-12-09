import command_line_and_log from '../core/command_line_and_log.js';
import directory_firebase_deploy_get from '../core/directory_firebase_deploy_get.js';
import git_acp from '../core/git_acp.js';
import file_copy from '../core/file_copy.js';
let directory_firebase_deploy = directory_firebase_deploy_get();
git_acp();
command_line_and_log(`rm -R ${directory_firebase_deploy}`)
command_line_and_log(`node ../c/r file_js_deploy ui_bible_root ${ directory_firebase_deploy }`);
file_copy('./package.json', `${directory_firebase_deploy}/package.json`);
command_line_and_log(`cd ${directory_firebase_deploy} && npm i`)
command_line_and_log(`firebase deploy`);