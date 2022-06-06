import * as vscode from 'vscode';
import { WebViewController, WebViewInstance } from './webViewController';
import * as Handlebars from 'handlebars';

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
        initialHtml: generateWebviewContent(filename),
        messageHandler: (message) => {
            console.log('got message:');
            console.log(message);
        }
    };
    webViewController.establishWebviewPanel(myWebViewInstance);
}

const webViewController = new WebViewController();

function generateWebviewContent(filename: string): string {

    let htmlHeadTemplate = Handlebars.compile(`
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML title</title>
    </head>`);

    const htmlBodyTemplate = Handlebars.compile(`
    <body>
        <h1>Oh hello there</h1>
        <p>Filename: {{filename}}</p>
        <button id="file-open-button">Click to open</button>
    </body>
    `);

    const scriptTemplate = Handlebars.compile(`
    <script>
        (function() {
            const vscode = acquireVsCodeApi();
            const openButton = document.getElementById('file-open-button');

            openButton.onclick = () => {
                vscode.postMessage({
                    command: 'open',
                    filename: '{{filename}}',
                })
            }
        }())
    </script>
    `);

    return `<!DOCTYPE html>
    <html lang="en">
    ` + htmlHeadTemplate({}) + htmlBodyTemplate({filename: filename}) + scriptTemplate({filename: filename}) + `
    </html>`;
}