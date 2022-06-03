"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const contentExample_1 = require("./contentExample");
const sayHello_1 = require("./sayHello");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "revision" is now active!');
    context.subscriptions.push(vscode.commands.registerCommand('revision.helloWorld', sayHello_1.sayHello));
    context.subscriptions.push(vscode.commands.registerCommand('revision.contextExample', contentExample_1.exampleContextCommand));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map