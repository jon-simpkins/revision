import * as vscode from 'vscode';

/**
 * Interface for establishing / updating the content of the status bar message / action.
 */
export class StatusBarController {
    private statusBarItem: vscode.StatusBarItem;

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    }

    // https://code.visualstudio.com/api/references/icons-in-labels#icon-listing for icons
    updateMessage(newMessage: string, newTooltip: string, newCommand: string): void {
        this.statusBarItem.text = newMessage;
        this.statusBarItem.tooltip = newTooltip;
        this.statusBarItem.command = newCommand;
        this.statusBarItem.show();
    }

    tearDown() {
        this.statusBarItem.dispose();
    }
}

