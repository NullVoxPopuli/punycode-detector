#!/usr/bin/env node

import { glob, readFile, stat } from 'node:fs/promises';

const phrases = [
  "require('punycode')",
  'require("punycode")',
  "import('punycode')",
  'import("punycode")',
  "from 'punycode'",
  'from "punycode"',
  // side-effects -- hopefully these are very rare
  "import 'punycode'",
  'import "punycode"',
];

async function punycodeUsages() {
  console.info('Scanning for punycode usages, this may take a moment.');

  const allJsFilesIterator = await glob(['**/*.js', '**/*.cjs', '**/*.mjs'], {
    exclude: () => false
  });

  const filesWithPunycode = new Set();

  for await (const file of allJsFilesIterator) {
    if (file.includes('punycode-detector')) {
      continue;
    }

    const fileStats = await stat(file);

    if (fileStats.isDirectory()) {
      continue;
    }

    console.clear();

    console.info('Scanning for punycode usages, this may take a moment.');

    console.info(`Scanning file: ${file}`);

    const content = await readFile(file, 'utf-8');
    const doesContentContainPunycode = phrases.find((phrase) => content.includes(phrase));

    if (doesContentContainPunycode) {
      filesWithPunycode.add(file);
    }
  }

  return filesWithPunycode;
}

const usages = await punycodeUsages();

console.clear();

if (usages.size === 0) {
  console.log(" 🎉 No usage of 'punycode' found");
  process.exit(0);
}

console.log(
  `There are ${usages.size} imports/requires of 'punycode' : The node builtin (which is deprecated) and not the 'punycode/' userland package.`,
);
console.log(usages);
console.log(
  `\nTo learn more about punycode, checkout their README: \n\n\thttps://github.com/mathiasbynens/punycode.js`,
);
