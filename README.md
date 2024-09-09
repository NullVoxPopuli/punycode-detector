# punycode-detector

Have you seen this deprecation?

> The version of the punycode module bundled in Node.js is being deprecated. In a future major version of Node.js this module will be removed. Users currently depending on the punycode module should switch to using the userland-provided Punycode.js module instead.



This tool tells you exactly which files need to update to use the [punycode module userland module](https://github.com/mathiasbynens/punycode.js).

## Usage


Step one: install your packages with npm/pnpm/yarn/bun/etc

Step two: run punycode-detector:

```bash
npx punycode-detector
```
or 
```bash 
pnpm dlx punycode-detector
```

Output:
```bash
There are 12 imports/requires of 'punycode' : The node builtin (which is deprecated) and not the 'punycode/' userland package.
Set(12) {
  'node_modules/.pnpm/markdown-it@12.3.2/node_modules/markdown-it/lib/index.js',
  'node_modules/.pnpm/markdown-it@13.0.2/node_modules/markdown-it/lib/index.js',
  'node_modules/.pnpm/markdown-it@8.4.2/node_modules/markdown-it/lib/index.js',
  'node_modules/.pnpm/markdown-it@8.4.2/node_modules/markdown-it/dist/markdown-it.js',
  'node_modules/.pnpm/normalize-url@2.0.1/node_modules/normalize-url/index.js',
  'node_modules/.pnpm/psl@1.9.0/node_modules/psl/index.js',
  'node_modules/.pnpm/psl@1.9.0/node_modules/psl/dist/psl.js',
  'node_modules/.pnpm/whatwg-url@5.0.0/node_modules/whatwg-url/lib/url-state-machine.js',
  'node_modules/.pnpm/tr46@2.1.0/node_modules/tr46/index.js',
  'node_modules/.pnpm/whatwg-url@8.7.0/node_modules/whatwg-url/dist/url-state-machine.js',
  'node_modules/.pnpm/tr46@3.0.0/node_modules/tr46/index.js',
  'node_modules/.pnpm/tr46@0.0.3/node_modules/tr46/index.js'
}

```


You can optionally use [`ag` / `the_silver_searcher`](https://github.com/ggreer/the_silver_searcher?tab=readme-ov-file#installing), if that performs better on your hardware.

```bash 
npx punycode-detector --ag
```

otherwise the default execution requires nothing other than node 22+.
