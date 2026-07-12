/**
 * このファイルの内容を変更してはいけません。
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { glob } from 'glob'
//import topLevelAwait from 'vite-plugin-top-level-await';
import pkg from './package.json';
const name = JSON.stringify(pkg.name);

// ルートとするディレクトリー
const root = resolve(__dirname, './src/')

// ビルド対象のディレクトリーをすべて取得( src の下の index.htmlがあるディレクトリー)
const entries = glob.sync('./src/**/index.html');
const targetDir = []
for(const entry of entries) {
    //const directory = entry
    console.log(entry);
    const directory1 = entry.replace(/\\/g, '/')
    console.log(directory1);
    const directory2 = directory1.replace('src/', ''); //.replace(/\/index\.html$/,'')
    console.log(directory2);
    const directory3 = directory2.replace(/\/index\.html$/, '').replace(/index\.html$/, '');
    console.log(directory3);
    targetDir.push(directory3)
}
const rollupOpsionsInput = {}
for(const target of targetDir){
    if(target != '')
        rollupOpsionsInput[target] = resolve(root, target, 'index.html');
}
console.log(rollupOpsionsInput);
// ビルド結果を出力する先
const outDir = resolve(__dirname, 'docs');

export default defineConfig({
    build: {
        target: "esnext",
        // lib:{
        //     entry: resolve(__dirname, 'src/index.ts'),
        //     formats: ["es"],
        // },
        outDir, // ビルド結果を格納する先
        rollupOptions: {
            input : rollupOpsionsInput,
        },
    },
    esbuild: {
        supported: {
//            'top-level-await': true
        },
        target: "esnext",

    },
    optimizeDeps:{
        esbuildOptions: {
            target: "esnext",
        }
    },
    resolve: {
        alias: {
            "@Type": resolve(__dirname, './node_modules/@tscratch3/typescratcher/Type'),
            "@Assets": resolve(__dirname, './assets'),
        }
    }
    //root: resolve(__dirname, './src'),
})