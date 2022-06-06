import * as vscode from 'vscode';

export class WebViewController {
    webviewPanels: Map<string, vscode.WebviewPanel> = new  Map<string, vscode.WebviewPanel>();

    establishWebviewPanel(instance: WebViewInstance): void {
        let panel: vscode.WebviewPanel;
        if (this.webviewPanels.has(instance.id)) {
            panel = this.webviewPanels.get(instance.id)!;
            
        } else {
            panel = vscode.window.createWebviewPanel(
                instance.type,
                instance.title,
                vscode.ViewColumn.Beside
            );
            panel.onDidDispose(() => this.onDispose(instance.id));
            this.webviewPanels.set(instance.id, panel);
        }
        panel.title = instance.title;
        panel.webview.html = instance.initialHtml;
        panel.reveal();
    }

    onDispose(id: string) {
        console.log('Got dispose from:');
        console.log(id);
        this.webviewPanels.delete(id);
    }
}

export interface WebViewInstance {
    id: string,
    type: string,
    title: string,
    initialHtml: string,
}
