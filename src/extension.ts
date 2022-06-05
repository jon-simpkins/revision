// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { askFavoriteColor } from './codelens/askFavoriteColor';
import { MetadataCodeLensProvider } from './codelens/metadataCodeLensProvider';
import { exampleContextCommand } from './contentExample';
import { DemoLinkProvider } from './documentLink/demoLinkProvider';
import { sayHello } from './sayHello';
import { StatusBarController } from './StatusBarController';

let statusBarController: StatusBarController | null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "revision" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand(
		'revision.helloWorld', sayHello));
	context.subscriptions.push(vscode.commands.registerCommand(
		'revision.contextExample', exampleContextCommand));

	context.subscriptions.push(vscode.commands.registerCommand(
		'revision.askFavoriteColor', askFavoriteColor));

	let metadataSelector: vscode.DocumentSelector = {
		language: 'revision_metadata',
		scheme: 'file',
	};

	context.subscriptions.push(vscode.languages.registerCodeLensProvider(
		metadataSelector,
		new MetadataCodeLensProvider()
	));

	context.subscriptions.push(vscode.languages.registerDocumentLinkProvider(
		metadataSelector,
		new DemoLinkProvider()
	));

	// Set up event listeners
	vscode.workspace.onDidSaveTextDocument(event => {
		console.log('save event');
		console.log(event.fileName);
	});

	statusBarController = new StatusBarController();
	statusBarController.updateMessage('$(preview) 15% complete', 'this is my tooltip', 'revision.helloWorld');
}

// this method is called when your extension is deactivated
export function deactivate() {
	statusBarController?.tearDown();
}
