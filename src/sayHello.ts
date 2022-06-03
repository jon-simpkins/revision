import * as vscode from 'vscode';

// Demo method to say hello (top-level command)
export function sayHello(): void {
	vscode.window.showInformationMessage(trivialMethod());
}

export function trivialMethod(): string {
    return 'Oh, hi Mark';
}