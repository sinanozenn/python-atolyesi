// Pyodide dosyalarını public/pyodide klasörüne kopyalar (npm install sonrası otomatik çalışır).
// Böylece Python motoru harici bir CDN'e ihtiyaç duymadan kendi sitenizden yüklenir.
import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "node_modules", "pyodide");
const dest = join(process.cwd(), "public", "pyodide");
mkdirSync(dest, { recursive: true });
for (const f of ["pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"]) {
  cpSync(join(src, f), join(dest, f));
}
console.log("Pyodide dosyaları public/pyodide klasörüne kopyalandı.");
