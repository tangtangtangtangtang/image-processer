/*
 * @Author: xiaozhuo
 * @Date: 2020-05-12 10:49:32
 * @LastEditTime: 2020-05-12 12:10:16
 * @LastEditors: xiaozhuo
 * @Description: 
 * @Enuma Elish
 */
import * as vscode from 'vscode';

const fs = require('fs')
const path = require('path')
const gm = require('gm')

export function activate(context: vscode.ExtensionContext) {
	console.log("activate -> context", context)

	context.subscriptions.push(vscode.commands.registerCommand('imageproducer.helloWorld', (params) => {
		console.log("activate -> params", params)
		const pwd = process.cwd()
		console.log("activate -> pwd", pwd)
		const options = {
			prompt: "请输入组件名: ",
			placeHolder: "组件名"
		}
		vscode.window.showInputBox(options).then(value => {
			if (!value) return;
			const fullPath = path.resolve('/Users/tangxiaozhuo/work/test', value)
			console.log("activate -> fullPath", fullPath)
			const fn = (filepath: string) => {
				gm(filepath)
					.resizeExact(4, 4)
					.write('./test2.jpeg', (error: any) => {
						if (!error) console.log('done')
						else console.warn(error)
					})
			}
			fn(value)
			// fs.readFile(value, (err, data) => {
			// 	if (!!err) console.warn
			// 	else 
			// })

		});
		vscode.window.showInformationMessage('Hello World from imageproducer!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('imageproducer.getCurrentFilePath', (uri) => {
		vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
	}));
}

export function deactivate() { }
