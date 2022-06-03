import * as vscode from 'vscode';

export class MetadataCodeLensProvider implements vscode.CodeLensProvider {
    async provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.CodeLens[]> {

        let codeLenses = [
            buildColorCodeLensForLine(document.lineCount - 1), // Very end of file
        ];

        for (let i = 0; i < document.lineCount; i++) {
            let text = document.lineAt(i).text;
            if (text.includes('color?')) {
                codeLenses.push(
                    buildColorCodeLensForLine(i)
                );
            }
            if (text.includes('purple')) {
                codeLenses.push(
                    buildLabelForPurple(i)
                );
            }
        }

        return codeLenses;
    }
}

function buildColorCodeLensForLine(lineNum: number): vscode.CodeLens {
    return new vscode.CodeLens(
        new vscode.Range(lineNum, 0, lineNum, 0),
        {
            command: 'revision.askFavoriteColor',
            title: 'Ask for the favorite color',
            arguments: [lineNum],
        }
    );
}

function buildLabelForPurple(lineNum: number): vscode.CodeLens {
    return new vscode.CodeLens(
        new vscode.Range(lineNum, 0, lineNum, 0),
        {
            command: '',
            title: 'This says purple!!!',
        }
    );
}