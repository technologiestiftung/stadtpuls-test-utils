/* eslint-disable jest/require-hook */
/* eslint-disable @typescript-eslint/no-var-requires */
//@ts-check

// multi package config taken from here
// https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const entryPoints = glob.sync("src/**/*.ts", {
  ignore: ["**/__tests__/**/*.ts", "**/__test-utils/**/*.ts", "**/*.test.ts"],
});
const esbuild = require("esbuild");
// process.exit(0);
// eslint-disable-next-line jest/require-hook
esbuild
  .build({
    platform: "node",
    sourcemap: true,
    banner: {
      // eslint-disable-next-line quotes
      js: '"use strict";',
    },
    target: ["esnext", "node16"],
    format: "esm",
    entryPoints,
    outdir: "dist/mjs",
    tsconfig: "tsconfig.json",
  })
  .then((result) => {
    console.info("Esbuild is processing these files:");
    console.info(entryPoints.join("\n"));
    if (result.outputFiles) console.info(result.outputFiles);
    if (result.warnings.length > 0) console.warn(result.warnings);
    if (result.errors.length > 0) console.error(result.errors);
    fs.writeFile(
      path.resolve(process.cwd() + "/dist/mjs/package.json"),
      JSON.stringify({ type: "module" }),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
    console.log("⚡ Esbuild is done");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

esbuild
  .build({
    platform: "node",
    sourcemap: true,
    banner: {
      // eslint-disable-next-line quotes
      js: '"use strict";',
    },
    target: ["es2020", "node14"],
    format: "cjs",
    entryPoints,
    outdir: "dist/cjs",
    tsconfig: "tsconfig-cjs.json",
  })
  .then((result) => {
    console.info("Esbuild is processing these files:");
    console.info(entryPoints.join("\n"));
    if (result.outputFiles) console.info(result.outputFiles);
    if (result.warnings.length > 0) console.warn(result.warnings);
    if (result.errors.length > 0) console.error(result.errors);
    fs.writeFile(
      path.resolve(process.cwd() + "/dist/cjs/package.json"),
      JSON.stringify({ type: "commonjs" }),
      (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
    console.log("⚡ Esbuild is done");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
