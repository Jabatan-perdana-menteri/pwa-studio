import * as vscode from "vscode";
import { maniHoverValues } from "../../manifest-utils";

class ManiHoverProvider implements vscode.HoverProvider {
    public provideHover(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.Hover | undefined> {
        const lineOfText = document.lineAt(position);

        // search through maniHoverValues for lineOfText.text
        const hoverInfo = maniHoverValues.find(
            (hoverValue) => {
                if (lineOfText.text.toLowerCase().includes(hoverValue.member.toLowerCase())) {
                    return hoverValue;
                }
            });
        if (!hoverInfo) {
            return new Promise(() => { });
        }
        else {
            return new Promise(resolve => {
                resolve(new vscode.Hover(new vscode.MarkdownString(`**PWA Studio**: ${hoverInfo.infoString} [Learn More](${hoverInfo.docsLink})`)));
            });
        }
    }
}

export function hoversActivate(ctx: vscode.ExtensionContext): void {
    ctx.subscriptions.push(
        vscode.languages.registerHoverProvider(
            { language: 'json', scheme: 'file' }, new ManiHoverProvider()));
}