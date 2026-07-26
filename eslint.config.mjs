"use strict";
import { eslint_S3_config } from "@tscratch3/typescratcher/eslint-plugin/index.js";
import eslintConfigPrettier from "eslint-config-prettier";
const build_eslint_config = [
    ...eslint_S3_config,
    eslintConfigPrettier,
    {
        ignores: ["**/*.d.ts", "lib/**/*.ts", "eslint-plugin/**/*.js"],
    },
    {
        plugins: {},
    },
    {
        files: ["src/**/*.ts"],
        rules: {
            "space-in-parens": ["error", "always"],
            "object-curly-spacing": ["error", "always"],
            "no-multi-spaces": "error"
        },
    },
];
export default build_eslint_config;
