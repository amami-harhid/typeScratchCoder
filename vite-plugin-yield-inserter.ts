import { Plugin } from 'vite';
import ts from 'typescript';
import { createYieldTransformer } from './vite/transformers/yield-transformer';

export function yieldInserterPlugin(): Plugin {
    return {
        name: 'vite-plugin-yield-inserter',
        enforce: 'pre', 
    
        transform(code, id) {
            if ((!id.endsWith('.ts') && !id.endsWith('.js')) || id.includes('node_modules') || id.includes('commonJs')) {
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
                // TODO デバグ用, 後で消す
                console.log('transpileResult.outputText=', transpileResult.outputText)
                return {
                    code: transpileResult.outputText,
                    map: transpileResult.sourceMapText ? JSON.parse(transpileResult.sourceMapText) : null
                };

            } catch (error: unknown) {
                if (error instanceof Error) {
                    this.error(error.message);
                } else {
                    this.error(String(error));
                }
            }
        }
    };
}