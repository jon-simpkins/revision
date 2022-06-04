import * as vscode from 'vscode';

/**
 * Demo link provider. Any line that matches "link: <local file path>"
 * will be turned into a link to that file
 */
export class DemoLinkProvider implements vscode.DocumentLinkProvider {

	provideDocumentLinks(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.DocumentLink[] {
		let documentLinks: vscode.DocumentLink[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            if (document.lineAt(i).text.includes('link:')) {
                let linkTarget = vscode.Uri.joinPath(
                    vscode.workspace.workspaceFolders![0].uri,
                    document.lineAt(i).text.replace('link:', '').trim()
                );

                documentLinks.push(
                    new vscode.DocumentLink(
                        new vscode.Range(i, 0, i, document.lineAt(i).text.length),
                        linkTarget
                    )
                );
            }
        }
        
        return documentLinks;
	}
}