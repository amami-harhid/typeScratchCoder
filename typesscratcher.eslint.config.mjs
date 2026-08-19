"use strict";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
const typescracher_eslint_config = [
    {
        plugins: {
            "@stylistic": stylistic
        },
        files: [ "src/**/*.ts" ],
        rules: {
            // 型定義のコロンの前後にスペース1つを強制する
            "@stylistic/type-annotation-spacing": [
                "error",
                {
                    "before": true,
                    "after": true,
                }
            ],
            // カンマの「前は無し」「後ろはスペース1つ」に強制
            "@stylistic/comma-spacing": [ "error", { "before": false, "after": true } ],
            // function* () の形式を強制する
            "generator-star-spacing": [ "error", { "before": false, "after": true } ],
            // インデントを4にする
            "indent": [ "error", 4, { "SwitchCase": 1 } ],
            // セミコロン強制
            "semi": [ "error", "always" ],
            //  改行コードをLFに強制
            "linebreak-style": [ "error", "unix" ],
            // 1行の最大文字数を80文字に制限（コメントやURLは除外）
            //"max-len": ["error", { "code": 80, "ignoreComments": true, "ignoreUrls": true }],
            // 丸括弧の内側のスペースを禁止
            "space-in-parens": [ "error", "always" ],
            // オブジェクトの内側にスペースを強制
            "object-curly-spacing": [ "error", "always" ],
            // 配列の内側のスペースを禁止
            "array-bracket-spacing": [ "error", "always" ],
            // 不要はスペース連続を禁止
            "no-multi-spaces": "error",
            // Switch禁止
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'SwitchStatement',
                    message: 'Switch statements are prohibited in this project.',
                }

            ],
        },
    },

];
export { typescracher_eslint_config };