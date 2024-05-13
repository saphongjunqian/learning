import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const hasher = createHash('sha1');
hasher.setEncoding('hex');

// ensure you have a `test.json` file for this test!
hasher.write(await readFile('test.json'));
hasher.end();

const fileHash = hasher.read();
console.log(fileHash);

// Run with: node crypto.mjs
