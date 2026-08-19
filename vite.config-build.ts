/**
 * このファイルの内容を変更してはいけません。
 */
import { resolve, relative, dirname } from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob'; // version 10.5.0
import { yieldInserterPlugin } from './vite-plugin-yield-inserter.ts';

// ルートとするディレクトリー
const root = resolve(import.meta.dirname, './src/')
const outDir = resolve(import.meta.dirname, 'docs');

// 1. glob で src 以下のすべての index.html を取得
const entries = glob.sync('./src/**/index.html');

const rollupOpsionsInput: { [key: string]: string } = {};

for (const entry of entries) {
    // 2. 実際のファイルパスを絶対パスに変換
    const absoluteEntryPath = resolve(import.meta.dirname, entry);
    
    // 3. root (./src/) からの「相対パス」を計算する
    const relativePathFromRoot = relative(root, absoluteEntryPath);
    
    // 4. キー名（エントリー名）を決める (例: "index" や "sub/index")
    // index.html を除いたディレクトリー構造をキーにする
    const key = dirname(relativePathFromRoot) === '.' ? 'main' : dirname(relativePathFromRoot);
    
    // 5. Viteには root からの相対パスを渡す
    rollupOpsionsInput[key] = relativePathFromRoot;
}



export default defineConfig({
    root, // ルートは ./src

    build: {
        target: "esnext",
        outDir, 
        rollupOptions: {
            input: rollupOpsionsInput,
        },
        sourcemap: 'inline'
    },
    css: {
        devSourcemap: true
    },
    plugins: [
        yieldInserterPlugin()
    ],
    resolve: {
        alias: {
            "@Type": resolve(import.meta.dirname, './node_modules/@tscratch3/typescratcher/Type'),
            "@Assets": resolve(import.meta.dirname, './assets'),
        }
    }

})