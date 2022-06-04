import * as vscode from 'vscode';
import { writeNewFileSafely } from './util/fileUtils';

// Demo method to say hello (top-level command)
export async function sayHello(): Promise<void> {
	vscode.window.showInformationMessage(trivialMethod());

    let scrapName = await vscode.window.showInputBox({
        prompt: 'New scrap name?',
    });

    if (!scrapName) {
        return;
    }

    let filePath = [scrapName, 'metadata.write'];

    await writeNewFileSafely(filePath, getInitialMetadataFile(), true);
}

export function trivialMethod(): string {
    return 'Oh, hi Mark';
}

function getInitialMetadataFile(): string {
    return 'this is some stuff!\n\nand more';
}