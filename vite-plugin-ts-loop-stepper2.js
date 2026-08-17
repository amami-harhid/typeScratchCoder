import { Plugin } from 'vite';
import ts from 'typescript';
import MagicString from 'magic-string';
// 外だしした関数群をインポート
import { collectTargets, createVisitor } from './vite/traverser.js';

export function vitePluginTsLoopStepper() {
    return {
        name: 'vite-plugin-ts-loop-stepper',
        transform(code, id) {
            if (!id.includes('.ts') && !id.includes('.tsx')) return null;

            if (
                id.includes('.test.') || 
                id.includes('.spec.') || 
                id.includes('vite.config.') || 
                id.includes('node_modules') ||
                id.includes('vite-plugin-ts-loop-stepper') ||
                id.includes('traverser') // ロジックファイル自身も除外
            ) {
                return null;
            }

            const ms = new MagicString(code);
            const compilerOptions = { target: ts.ScriptTarget.Latest, allowJs: true };
            const host = ts.createCompilerHost(compilerOptions);
            
            const originalGetSourceFile = host.getSourceFile;
            host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
                if (fileName === id) {
                    return ts.createSourceFile(id, code, languageVersion, true);
                }
                return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
            };

            const program = ts.createProgram([id], compilerOptions, host);
            const typeChecker = program.getTypeChecker();
            const sourceFile = program.getSourceFile(id);

            //console.log('sourceFile=',sourceFile)

            if (!sourceFile) return null;
            //console.log('sourceFile=',sourceFile);

            // 1. 対象となる関数ノードのストック
            const targetFunctionNodes = new Set();

            // 2. 【パス1】対象関数の抽出ロジックを実行
            collectTargets(sourceFile, typeChecker, targetFunctionNodes);

            // 3. 【パス2】Viteのプラグインコンテキスト（this）を渡しつつビジターを生成して実行
            const context = { error: this.error.bind(this) };
            const visit = createVisitor(context, sourceFile, code, ms, targetFunctionNodes);
            ts.forEachChild(sourceFile, visit);

            // 4. コードの変換とMonaco Editor用ソースの埋め込み
            console.log('ms.hasChanged()=',ms.hasChanged())
            if (ms.hasChanged()) {
                console.log('ms=',ms.toString());
                //const escapedRawCode = JSON.stringify(code);
                //ms.append('\nif(typeof window !== "undefined") { window._rawSource = ' + escapedRawCode + '; }\n');
                return {
                    code: ms.toString(),
                    map: ms.generateMap({
                        source: id,
                        file: id + '.map',
                        includeContent: true
                    })
                };
            }

            return null;
        }
    };
}