import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

// ensure you have a `test.json` file for this test!
await pipeline
(
  createReadStream('test.json'),
  createGzip(),
  createWriteStream('test.json.gz')
);

// run with `node streams.mjs`