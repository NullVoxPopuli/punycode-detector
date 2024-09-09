#!/usr/bin/env node

import { exec } from "node:child_process";
import { promisify } from "node:util";
import assert from "node:assert";

let $exec = promisify(exec);

async function hasAG() {
  try {
    // Default shell, sh, doesn't have the `type` util
    const result = await $exec(`type ag`, { shell: "bash" });
    return result.stdout.includes("ag");
  } catch (e) {
    return false;
  }
}

let isAGAvailable = await hasAG();

assert(
  isAGAvailable,
  `ag was not found. This tool requires ag (the_silver_searcher) -- which can be installed by following the istructions here: https://github.com/ggreer/the_silver_searcher`,
);

async function punycodeUsages() {
  async function findPuny(text) {
    try {
      let { stdout } = await $exec(
        `ag --files-with-matches --file-search-regex ".js$" --unrestricted --literal ${text}`,
        { shell: "bash" },
      );

      return stdout.split("\n");
    } catch (e) {
      // AG did not find anything
      if (e.code === 1) {
        return [];
      }
      throw e;
    }
  }

  let results = await Promise.all([
    findPuny(`"require('punycode')"`),
    findPuny(`'require("punycode")'`),
    findPuny(`"import('punycode')"`),
    findPuny(`'import("punycode")'`),
    findPuny(`"import 'punycode'"`),
    findPuny(`'import "punycode"'`),
  ]);
  let lines = results.flat();
  let notUs = lines
    .filter((line) => !line.includes("punycode-detector"))
    .filter(Boolean);
  let unique = new Set(notUs);

  return unique;
}

let usages = await punycodeUsages();

if (usages.size === 0) {
  console.log(" 🎉 No usage of 'punycode' found");
  process.exit(0);
}

console.log(
  `There are ${usages.size} imports/requires of 'punycode' : The node builtin (which is deprecated) and not the 'punycode/' userland package.`,
);
console.log(usages);
