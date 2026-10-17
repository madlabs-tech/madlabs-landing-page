// Writes .br and .gz next to every text file in build/, for Caddy's `file_server { precompressed }`
// (see Caddyfile). Max-quality brotli costs seconds once here instead of CPU on every request.
// usage: node scripts/precompress.mjs [dir=build]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';

const dir = process.argv[2] ?? 'build';
const TEXT = /\.(html|js|css|svg|json|xml|txt)$/;

for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
	if (!entry.isFile() || !TEXT.test(entry.name)) continue;
	const file = join(entry.parentPath, entry.name);
	const raw = readFileSync(file);
	const br = brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_SIZE_HINT]: raw.length } });
	const gz = gzipSync(raw, { level: 9 });
	// Tiny files don't shrink; Caddy serves the original when no sibling exists.
	if (br.length < raw.length) writeFileSync(file + '.br', br);
	if (gz.length < raw.length) writeFileSync(file + '.gz', gz);
}
