/**
 * このファイルの内容を変更してはいけません。
 */
import { resolve } from 'path';
import { defineConfig } from 'vite';
//import svgr from 'vite-plugin-svgr';
import { glob } from 'glob'; // version 10.5.0
//import topLevelAwait from 'vite-plugin-top-level-await';
import { yieldInserterPlugin } from './vite-plugin-yield-inserter';

// ルートとするディレクトリー
const root = resolve(__dirname, './src/')

// ビルド対象のディレクトリーをすべて取得( src の下の index.htmlがあるディレクトリー)
const entries = glob.sync('./src/**/index.html');
const targetDir = []
for(const entry of entries) {
    const directory = entry.replace('./src/', '').replace(/\/index\.html$/,'')
    targetDir.push(directory)
}
const rollupOpsionsInput:{[key : string]: string} = {}
for(const target of targetDir){
    rollupOpsionsInput[target] = resolve(root, target, 'index.html')
}
// ビルド結果を出力する先
const outDir = resolve(__dirname, 'docs');

export default defineConfig({
    build: {
        target: "esnext",
        outDir, // ビルド結果を格納する先
        rollupOptions: {
            input: rollupOpsionsInput,
        },
        sourcemap: 'inline' // ビルド時用
    },
    css: {
        devSourcemap: true
    },
    optimizeDeps:{
        esbuildOptions: {
            target: "esnext",
        }
    },
    root: resolve(__dirname, './src'),
    plugins: [
        //svgr(),
        //topLevelAwait()
        yieldInserterPlugin()
    ],
    resolve: {
        alias: {
            "@Type": resolve(__dirname, './node_modules/@tscratch3/typescratcher/Type'),
            "@Assets": resolve(__dirname, './assets'),
        }
    }

})