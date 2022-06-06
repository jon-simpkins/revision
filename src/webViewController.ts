import * as vscode from 'vscode';

export class WebViewController {
    webviewPanels: Map<string, vscode.WebviewPanel> = new Map<string, vscode.WebviewPanel>();
    messageSubscriptions: Map<string, vscode.Disposable> = new Map<string, vscode.Disposable>();

    establishWebviewPanel(instance: WebViewInstance): void {
        let panel: vscode.WebviewPanel;
        if (this.webviewPanels.has(instance.id)) {
            panel = this.webviewPanels.get(instance.id)!;
            
        } else {
            panel = vscode.window.createWebviewPanel(
                instance.type,
                instance.title,
                vscode.ViewColumn.Beside,
                {
                    enableScripts: !!instance.messageHandler,
                }
            );
            panel.onDidDispose(() => this.onDispose(instance.id));
            if (!!instance.messageHandler) {
                this.messageSubscriptions.set(
                    instance.id,
                    panel.webview.onDidReceiveMessage(instance.messageHandler)
                );
            }
            this.webviewPanels.set(instance.id, panel);
        }
        panel.title = instance.title;
        panel.webview.html = instance.initialHtml;
        panel.reveal();
    }

    onDispose(id: string) {
        this.webviewPanels.delete(id);
        this.messageSubscriptions.get(id)?.dispose();
        this.messageSubscriptions.delete(id);
    }
}

export interface WebViewInstance {
    id: string,
    type: string,
    title: string,
    initialHtml: string,
    messageHandler?: (message: any) => void,
}
