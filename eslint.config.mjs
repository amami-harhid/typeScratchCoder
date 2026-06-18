"use strict";
import { eslint_S3_config } from "@tscratch3/typescratcher/eslint-plugin/index.js";
const build_eslint_config = [
    ...eslint_S3_config,
    {
        ignores: ["**/*.d.ts", "lib/**/*.ts", "eslint-plugin/**/*.js"],
    },
    {
        plugins: {},
    },
];
export default build_eslint_config;
