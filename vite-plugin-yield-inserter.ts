import { createYieldTransformer } from "./node_modules/@tscratch3/typescratcher/src/vite/transformers/yield-transformer.ts";
import { Plugin } from 'vite';
import ts from 'typescript';

export function yieldInserterPlugin(): Plugin {
    return {
        name: 'vite-plugin-yield-inserter',
        enforce: 'pre', 
    
        transform(code, id) {
            if ((!id.endsWith('.ts') && !id.endsWith('.js')) || id.includes('node_modules') || id.includes('vite')) {
                return null;
            }
            console.log('id=',id)
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