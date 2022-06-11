import * as vscode from 'vscode';

/**
 * Link provider for 'fountain.write' files
 */
export class FountainLinkProvider implements vscode.DocumentLinkProvider {

	provideDocumentLinks(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.DocumentLink[] {
		let documentLinks: vscode.DocumentLink[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            let lineScrapLinks = findScrapLinksInLine(i, document.lineAt(i).text);

            if (lineScrapLinks.length) {
                documentLinks.push(...lineScrapLinks);
            }
        }
        
        return documentLinks;
	}
}

function scrapLinkBuilder(scrapName: string): vscode.Uri {
    return vscode.Uri.joinPath(
        vscode.workspace.workspaceFolders![0].uri,
        ...scrapName.split('/'),
        'fountain.write'
    );
}

// TODO: use regex, add unit tests, provide the scrapLinkBuilder (or the root folder at least)
function findScrapLinksInLine(lineNumber: number, lineText: string): vscode.DocumentLink[] {
    let documentLinks: vscode.DocumentLink[] = [];

    // Lazy approach for now, only allow scrap without other text
    if (lineText.trim().startsWith('{{') && lineText.trim().endsWith('}}')) {
        let scrapName = lineText.replace('{{', '').replace('}}', '').trim();
        documentLinks.push(
            new vscode.DocumentLink(
                new vscode.Range(lineNumber, 0, lineNumber, lineText.length),
                scrapLinkBuilder(scrapName)
            )
        );
    }

    return documentLinks;
}