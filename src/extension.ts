/*
 * @Author: xiaozhuo
 * @Date: 2020-05-12 10:49:32
 * @LastEditTime: 2020-05-15 10:59:30
 * @LastEditors: xiaozhuo
 * @Description: 
 * @Enuma Elish
 */
import * as vscode from 'vscode';
const gm = require('gm')

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('imageproducer.compressFile', ({ fsPath }) => {
		if (!fsPath) {
			return vscode.window.showInformationMessage(`未监测到文件地址`);
		};
		const fullFileName = fsPath.split('/').slice(-1)[0]
		const suffix = fullFileName.split('.')[1]
		const fileName = fullFileName.split('.')[0]
		gm(fsPath)
			.resizeExact(4, 4)
			.write(`${fsPath.split('/').slice(0, -1).join('/')}/${fileName}-compressed.${suffix}`, (error: any) => {
				if (!error) vscode.window.showInformationMessage(`压缩成功`);
				else vscode.window.showInformationMessage(`压缩出错`);
			})
	}));
}

export function deactivate() { }
