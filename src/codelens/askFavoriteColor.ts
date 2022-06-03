import * as vscode from 'vscode';

export async function askFavoriteColor(replaceLine: number) {
    if (!replaceLine) {
        replaceLine = 0; // Fallback, if used from command palette
    }

    let favoriteColor = await vscode.window.showInputBox({
      prompt: 'Favorite color?',
    });
  
    if (!favoriteColor) {
        return;
    }
  
    let insertionLocation = new vscode.Range(replaceLine, 0, replaceLine + 1, 0);
    let snippet = new vscode.SnippetString('Favorite color: ' + favoriteColor + '\n');
  
    vscode.window.activeTextEditor?.insertSnippet(snippet, insertionLocation);
  }