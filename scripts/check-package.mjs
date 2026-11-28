import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { log } from "node:console";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const expected = [
  "LICENSE", "README.md", "dist/index.d.ts", "dist/index.js", "dist/int64.d.ts", "dist/int64.js", "package.json",
  "dist/exact-json.js", "dist/wire-schema.d.ts", "dist/generated/wire.js",
  "dist/http-transport.js", "dist/http-transport.d.ts", "dist/http-request.js", "dist/http-request.d.ts",
  "dist/http-response.js", "dist/http-response.d.ts", "dist/http-error.js", "dist/http-error.d.ts",
].sort();
const tsc = join(root, "node_modules/typescript/bin/tsc");
const npm = process.env.npm_execpath;
assert(npm, "Run this check using npm run check:pack");
assert.equal(manifest.private, true);
assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0);
assert.deepEqual(Object.keys(manifest.exports), ["."]);

const temp = mkdtempSync(join(tmpdir(), "vat-engine-pack-"));
const staging = join(temp, "package");
const consumer = join(temp, "consumer");
const capture = (file, args, cwd) => execFileSync(file, args, { cwd, encoding: "utf8" });
const runNpm = (args, cwd) => capture(process.execPath, [npm, ...args], cwd);

function compareBuild(actual, freshlyBuilt) {
  const files = readdirSync(actual, { recursive: true }).sort();
  assert.deepEqual(files, readdirSync(freshlyBuilt, { recursive: true }).sort());
  for (const path of files.filter((entry) => entry.endsWith(".js") || entry.endsWith(".d.ts"))) {
    assert.deepEqual(readFileSync(join(actual, path)), readFileSync(join(freshlyBuilt, path)), path);
  }
}

function checkPack(result) {
  const [item] = JSON.parse(result);
  assert.deepEqual(item.files.map(({ path }) => path).sort(), expected);
  return item.filename;
}

try {
  mkdirSync(staging);
  mkdirSync(consumer);
  const cleanBuild = join(temp, "clean-build");
  capture(process.execPath, [tsc, "-p", "tsconfig.json", "--outDir", cleanBuild], root);
  compareBuild(join(root, "dist"), cleanBuild);

  checkPack(runNpm(["pack", "--ignore-scripts", "--dry-run", "--json"], root));
  for (const path of ["package.json", "LICENSE", "README.md", ".npmignore", ".gitignore", "dist", "contract", "MD", "scripts"]) {
    cpSync(join(root, path), join(staging, path), { recursive: true });
  }
  for (const canary of [
    "AGENTS.md", "AGENTS.override.md", ".codex/config.toml", ".codex/memories/MEMORY.md",
    ".agents/config.toml", ".mcp.json", ".vscode/settings.json", ".npmrc", ".env", "dist/AGENTS.md",
  ]) {
    const path = join(staging, canary);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, "# Synthetic packaging canary\n");
  }

  checkPack(runNpm(["pack", "--ignore-scripts", "--dry-run", "--json"], staging));
  const tarball = join(staging, checkPack(runNpm(["pack", "--ignore-scripts", "--json"], staging)));
  const tarFiles = capture("tar", ["-tzf", tarball], staging).trim().split(/\r?\n/);
  assert.deepEqual(tarFiles.sort(), expected.map((path) => `package/${path}`).sort());

  writeFileSync(join(consumer, "package.json"), '{"name":"sdk-archive-consumer","private":true}\n');
  runNpm(["install", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", tarball], consumer);
  writeFileSync(join(consumer, "esm.mjs"), `
import assert from "node:assert/strict";
import { createHttpTransport, toInt64 } from "@vat-engine/sdk";
assert.equal(toInt64(9223372036854775807n), 9223372036854775807n);
assert.throws(() => toInt64(9007199254740992), RangeError);
const client = createHttpTransport({
  fetch: async (url, init) => {
    assert.equal(url, "https://api.vat-engine.app/health");
    assert.equal(init.redirect, "manual");
    return new Response('{"status":"ok"}', { headers: { "Content-Type": "application/json" } });
  },
});
const response = await client.request("GET /health");
assert.equal(response.kind, "json");
assert.equal(response.data.status, "ok");
`);
  writeFileSync(join(consumer, "cjs.cjs"), `
const assert = require("node:assert/strict");
const sdk = require("@vat-engine/sdk");
assert.equal(sdk.toInt64(42), 42n);
assert.throws(() => require("@vat-engine/sdk/dist/exact-json.js"), { code: "ERR_PACKAGE_PATH_NOT_EXPORTED" });
async function check() {
  const esm = await import("@vat-engine/sdk");
  assert.equal(sdk.toInt64, esm.toInt64);
  assert.equal(sdk.createHttpTransport, esm.createHttpTransport);
  const client = sdk.createHttpTransport({ fetch: async () => new Response("fixture", { status: 503 }) });
  await assert.rejects(client.request("GET /health"), {
    name: "VatTransportError", kind: "server", status: 503,
  });
}
check().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
`);
  writeFileSync(join(consumer, "esm.mts"), `
import { createHttpTransport, toInt64, type HttpTransportResponse, type Int64Input } from "@vat-engine/sdk";
const value: Int64Input = 9223372036854775807n;
const bigint: bigint = toInt64(value);
const response: Promise<HttpTransportResponse> = createHttpTransport().request("GET /health");
`);
  writeFileSync(join(consumer, "cjs.cts"), `
import sdk = require("@vat-engine/sdk");
const value: sdk.Int64Input = 42;
const bigint: bigint = sdk.toInt64(value);
const params: sdk.HttpRequestOptions = { query: { limit: 1 } };
const response: Promise<sdk.HttpTransportResponse> = sdk.createHttpTransport().request("GET /v1/transactions", params);
`);
  for (const entry of ["esm.mjs", "cjs.cjs"]) capture(process.execPath, [entry], consumer);
  capture(process.execPath, [
    tsc, "--strict", "--module", "NodeNext", "--target", "ES2022", "--noEmit", "esm.mts", "cjs.cts",
  ], consumer);
  log(`Reproducible build, ${expected.length} allowlisted package files and ESM/CJS/TypeScript consumers verified on Node ${process.versions.node}`);
} finally {
  rmSync(temp, { recursive: true, force: true });
}
