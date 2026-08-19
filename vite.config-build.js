/**
 * このファイルの内容を変更してはいけません。
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { glob } from 'glob'
import { yieldInserterPlugin } from './vite-plugin-yield-inserter';

// ルートとするディレクトリー
const root = resolve(__dirname, './src/')

// ビルド対象のディレクトリーをすべて取得( src の下の index.htmlがあるディレクトリー)
const entries = glob.sync('./src/**/index.html');
const targetDir = []
for(const entry of entries) {
    const directory1 = entry.replace(/\\/g, '/')
    const directory2 = directory1.replace('src/', ''); //.replace(/\/index\.html$/,'')
    const directory3 = directory2.replace(/\/index\.html$/, '').replace(/index\.html$/, '');
    targetDir.push(directory3)
}
const rollupOpsionsInput = {}
for(const target of targetDir){
    if(target != '')
        rollupOpsionsInput[target] = resolve(root, target, 'index.html');
}
// ビルド結果を出力する先
const outDir = resolve(__dirname, 'docs');

export default defineConfig({
    build: {
        target: "esnext",
        outDir, // ビルド結果を格納する先
        chunkSizeWarningLimit: 200,
        rollupOptions: {
            input : rollupOpsionsInput,
            output: {
                manualChunks(id) {
                    console.log(id);
                    if(id.includes('node_modules/@tscratch3/typescratcher')){
                        return 'typescratcher';
                    }else if(id.includes('node_modules')){
                        return 'vender';
                    }
                },
            },
        },
        assetsInlineLimit: 0,
    },
    esbuild: {
        target: "esnext",

    },
    optimizeDeps:{
        esbuildOptions: {
            target: "esnext",
        }
    },
    plugins: [
        yieldInserterPlugin()
    ],
    resolve: {
        alias: {
            "@Type": resolve(__dirname, './node_modules/@tscratch3/typescratcher/Type'),
            "@Assets": resolve(__dirname, './assets'),
        }
    }
})