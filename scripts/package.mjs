import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { zipSync } from "fflate";
import path from "node:path";
if (!existsSync("dist/index.html")) throw new Error("Build output not found");
const files = {};
function collect(directory) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) collect(full);
    else
      files[path.relative("dist", full).split(path.sep).join("/")] =
        new Uint8Array(readFileSync(full));
  }
}
collect("dist");
mkdirSync("release", { recursive: true });
writeFileSync(
  "release/fernanda-santos-hostinger.zip",
  zipSync(files, { level: 6 }),
);
console.log("Pacote Hostinger: release/fernanda-santos-hostinger.zip");
