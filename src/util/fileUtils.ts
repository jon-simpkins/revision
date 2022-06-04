import * as vscode from 'vscode';

/**
 *  Gets the Uri of the primary folder for the workspace.
 */
export function getPrimaryWorkspaceFolderUri(): vscode.Uri|null {
    let workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || !workspaceFolders?.length) {
        vscode.window.showErrorMessage('Please open a folder for your workspace to get started.');
        return null;
    }

    return workspaceFolders![0].uri;
}

/**
 *  Checks if a local file already exists.
 */
export async function checkIfFileExists(localPath: string[]): Promise<boolean> {
    let rootFolder = getPrimaryWorkspaceFolderUri();
    if (!rootFolder) {
        return false;
    }

    try {
        await vscode.workspace.fs.stat(vscode.Uri.joinPath(rootFolder, ...localPath));
    } catch {
        return false;
    }

    return true;
}

/**
 *  Writes initial contents to a new file, careful to not overwrite an existing file.
 */
export async function writeNewFileSafely(localPath: string[], initialContent: string, openWhenFinished = false): Promise<boolean> {
    let rootFolder = getPrimaryWorkspaceFolderUri();
    if (!rootFolder) {
        return false;
    }

    if (await checkIfFileExists(localPath)) {
        vscode.window.showErrorMessage('File ' + localPath.join('/') + ' already exists');
        return false;
    }

    await vscode.workspace.fs.writeFile(
        vscode.Uri.joinPath(rootFolder, ...localPath),
        Buffer.from(initialContent, 'utf8')
    );

    if (openWhenFinished) {
        return await showFile(localPath);
    }

    return true;
}

/**
 *  Opens a local file in the active editor.
 */
export async function showFile(localPath: string[]): Promise<boolean> {
    let rootFolder = getPrimaryWorkspaceFolderUri();
    if (!rootFolder) {
        return false;
    }

    await vscode.window.showTextDocument(vscode.Uri.joinPath(rootFolder, ...localPath));

    return true;
}