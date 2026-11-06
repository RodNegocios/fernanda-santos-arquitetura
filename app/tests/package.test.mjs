import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { unzipSync } from "fflate";

const production = fileURLToPath(
  new URL("../../public_html/", import.meta.url),
);
const zip = fileURLToPath(
  new URL("../../artifacts/fernanda-santos-hostinger.zip", import.meta.url),
);
function readTree(directory, files = {}) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) readTree(full, files);
    else
      files[path.relative(production, full).split(path.sep).join("/")] =
        readFileSync(full);
  }
  return files;
}

test("Hostinger ZIP contains the exact production files at its root", () => {
  const files = readTree(production);
  const archive = unzipSync(readFileSync(zip));
  assert.deepEqual(Object.keys(archive).sort(), Object.keys(files).sort());
  for (const required of [
    "index.html",
    ".htaccess",
    "404.html",
    "robots.txt",
    "favicon.svg",
  ])
    assert.ok(archive[required], required);
  for (const [name, contents] of Object.entries(files))
    assert.deepEqual(Buffer.from(archive[name]), contents, name);
  assert.ok(
    !Object.keys(archive).some((name) =>
      /(^|\/)(app|src|references|node_modules|\.env|\.git)(\/|$)/.test(name),
    ),
  );
});

test("production entry points resolve to files shipped in public_html", () => {
  const files = readTree(production);
  const html = files["index.html"].toString();
  assert.ok(
    !html.includes("/src/main.jsx"),
    "development entry point must not be shipped",
  );
  const links = [...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)].map(
    (match) => match[1].slice(2),
  );
  assert.ok(
    links.some((name) => name.startsWith("assets/") && name.endsWith(".js")),
  );
  for (const link of links)
    assert.ok(files[link], `missing production asset: ${link}`);
  const apache = files[".htaccess"].toString();
  assert.match(apache, /DirectoryIndex index\.html/);
  assert.match(apache, /ErrorDocument 404 \/404\.html/);
});
