/**
 * このファイルの内容を変更してはいけません。
 */
import { resolve, relative, posix } from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob'; // @10.5.0
import { TsCodeReplacer } from '@tscratch3/typescratcher/build/vitePlugins/index.js'
import checker from 'vite-plugin-checker';
import fs from 'fs';

// ルートとするディレクトリー
const root = resolve(import.meta.dirname, 'src')
const outDir = resolve(import.meta.dirname, 'docs');

// 1. カレントディレクトリを確実に固定(./src)して、src 以下のすべての index.html を取得
const entries = glob.sync('**/index.html', { cwd: root, posix: true });
const rollupOpsionsInput: { [key: string]: string } = {};

for (const entry of entries) {
    // 2. 実際のファイルパスを絶対パスに変換
    const absoluteEntryPath = resolve(root, entry);

    const htmlContent = fs.readFileSync(absoluteEntryPath, 'utf-8');
    if (!htmlContent.includes('.ts')) {
        continue; // .ts という文字列が含まれていない HTML はスキップ
    }

    // 3. root (./src/) からの「相対パス」を計算する
    const relativePathFromRoot = relative(root, absoluteEntryPath);
    
    // 4. キー名（エントリー名）を決める (例: "index" や "sub/index")
    const normalizedPath = relativePathFromRoot.replace(/\\/g, '/');
    const dir = posix.dirname(normalizedPath);
    // index.html を除いたディレクトリー構造をキーにする
    const key = (dir === '.' || dir === '') ? 'main' : dir;
    
    // 5. Viteには root からの相対パスを渡す(Windows対応)
    rollupOpsionsInput[key] = normalizedPath;
}

export default defineConfig({
    root, // ルートは ./src

    build: {
        target: "esnext",
        outDir, 
        rollupOptions: {
            input: rollupOpsionsInput,
        },
        sourcemap: true
    },
    css: {
        devSourcemap: true
    },
    plugins: [
        TsCodeReplacer(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: `eslint "${resolve(import.meta.dirname, './src/**/*.{ts,tsx}')}"`,
            }
        })
    ],
    resolve: {
        alias: {
            "@Assets": resolve(import.meta.dirname, './assets'),
        }
    }

})