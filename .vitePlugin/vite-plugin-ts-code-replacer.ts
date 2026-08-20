import { createYieldTransformer } from "./transformers/yield-transformer.ts";
import { Plugin } from 'vite';
import ts from 'typescript';

interface PluginError extends Error {
    loc?: {
        file: string;
        line: number;
        column: number;
    };
    frame?: string;
}
function isPluginError(error: unknown): error is PluginError {
    return error instanceof Error && 'loc' in error;
}

export function TsCodeReplacer(): Plugin {
    return {
        name: 'vite-plugin-ts-code-replacer',
        enforce: 'pre', 
    
        transform(code, id) {
            if (!id.endsWith('.ts') || id.includes('node_modules') || id.includes('docs') || id.includes('vitePlugin')) {
                return null;
            }
            try {
                const transpileResult = ts.transpileModule(code, {
                    compilerOptions: {
                        target: ts.ScriptTarget.Latest,
                        module: ts.ModuleKind.ESNext,
                        sourceMap: true,
                    },
                    fileName: id,
                    transformers: {
                        before: [
                            (context) => createYieldTransformer(id, context)
                        ]
                    }
                });
                console.log(transpileResult.outputText)
                return {
                    code: transpileResult.outputText,
                    map: transpileResult.sourceMapText ? JSON.parse(transpileResult.sourceMapText) : null
                };

            } catch (error: unknown) {
                if (isPluginError(error) && error.loc) {
                    // 🌟 Viteのブラウザオーバーレイに表示するための特殊な形式でエラーを報告
                    const paddedFrame = error.frame 
                        ? `\n\n  > ${error.frame}\n` 
                        : '';
                    this.error({
                        message: `[vite-plugin-ts-code-replacer] ${error.message}${paddedFrame}`,
                        id: error.loc.file,
                        loc: {
                            line: error.loc.line,
                            column: error.loc.column
                        },
                        frame: error.frame
                    });
                } else if (error instanceof Error) {
                    this.error(error.message);
                } else {
                    this.error(String(error));
                }
            }
        }
    };
}