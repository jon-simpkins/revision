import * as vscode from 'vscode';

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
}
