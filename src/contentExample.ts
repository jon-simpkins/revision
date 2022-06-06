import * as vscode from 'vscode';
import { WebViewController, WebViewInstance } from './webViewController';


// Demo method to be executed from a particular editor
export function exampleContextCommand() {
	let documentForEvent = vscode.window.activeTextEditor?.document;

    if (!documentForEvent) {
        vscode.window.showErrorMessage('No active document');
        return;
    }

    let filename = documentForEvent.fileName;

    if (!filename.endsWith('metadata.write')) {
        vscode.window.showErrorMessage('Not a Revision metadata file');
        return;
    }
	
	vscode.window.showInformationMessage('Metadata file has ' + documentForEvent!.lineCount + '!');

    const myWebViewInstance: WebViewInstance = {
        id: 'content-' + filename,
        type: 'example-revision-content', // Should be an enum
        title: 'Content example',
        initialHtml: generateWebviewContent(filename)
    };
    webViewController.establishWebviewPanel(myWebViewInstance);
}

const webViewController = new WebViewController();

function generateWebviewContent(filename: string): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML title</title>
    </head>
    <body>
        <h1>Oh hello there</h1>
        <p>Filename: ` + filename + `</p>
    </body>
    </html>`;
}