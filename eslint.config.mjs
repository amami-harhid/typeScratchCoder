"use strict";
import { eslint_S3_config } from "@tscratch3/typescratcher/eslint-plugin/index.js";
import { typescracher_eslint_config } from "@tscratch3/typescratcher/eslint/typesscratcher.eslint.config.mjs";

const build_eslint_config = [
    ...eslint_S3_config,
    {
        ignores: [ "**/*.d.ts" ],
    },
    ...typescracher_eslint_config,
];
export default build_eslint_config;
