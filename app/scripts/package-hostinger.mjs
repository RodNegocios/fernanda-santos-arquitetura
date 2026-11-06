import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { zipSync } from "fflate";
import path from "node:path";

const production = fileURLToPath(
  new URL("../../public_html/", import.meta.url),
);
const artifacts = fileURLToPath(new URL("../../artifacts/", import.meta.url));
if (!existsSync(path.join(production, "index.html"))) {
  throw new Error("Execute o build antes de empacotar public_html.");
}
const files = {};
function collect(directory) {
  for (const item of readdirSync(directory, { withFileTypes: true }).sort(
    (a, b) => a.name.localeCompare(b.name),
  )) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) collect(full);
    else if (item.isFile()) {
      const name = path.relative(production, full).split(path.sep).join("/");
      files[name] = [
        new Uint8Array(readFileSync(full)),
        { mtime: new Date("2020-01-01T00:00:00Z") },
      ];
    }
  }
}
collect(production);
mkdirSync(artifacts, { recursive: true });
writeFileSync(
  path.join(artifacts, "fernanda-santos-hostinger.zip"),
  zipSync(files, { level: 6 }),
);
console.log("Site pronto: public_html/");
console.log("ZIP para upload: artifacts/fernanda-santos-hostinger.zip");
