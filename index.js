#!/usr/bin/env node

let useAG = process.argv.includes('--ag');

if (useAG) {
  await import('./with-ag.js');
} else {
  await import('./no-ag.js');
}
