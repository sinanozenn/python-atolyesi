// Python motoru (Pyodide) dosyalarını doğru dosya türüyle sunar.
// Bazı barındırma firmalarının önbellek sunucuları .mjs ve .wasm dosyalarını "text/plain" olarak
// gönderdiği için tarayıcı bunları çalıştırmaz; bu yol türü açıkça belirtir.
// Dosyalar derleme sırasında bir kez okunur (statik olarak üretilir).
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";
export const dynamicParams = false;

const JS = "text/javascript; charset=utf-8";
const DOSYALAR: Record<string, [string, string]> = {
  "worker.mjs": ["python-motoru/worker.mjs", JS],
  "runner-core.mjs": ["python-motoru/runner-core.mjs", JS],
  "pyodide.mjs": ["node_modules/pyodide/pyodide.mjs", JS],
  "pyodide.asm.mjs": ["node_modules/pyodide/pyodide.asm.mjs", JS],
  "pyodide.asm.wasm": ["node_modules/pyodide/pyodide.asm.wasm", "application/wasm"],
  "python_stdlib.zip": ["node_modules/pyodide/python_stdlib.zip", "application/zip"],
  "pyodide-lock.json": ["node_modules/pyodide/pyodide-lock.json", "application/json; charset=utf-8"],
};

export function generateStaticParams() {
  return Object.keys(DOSYALAR).map((dosya) => ({ dosya }));
}

export async function GET(_istek: Request, { params }: { params: Promise<{ dosya: string }> }) {
  const { dosya } = await params;
  const kayit = DOSYALAR[dosya];
  if (!kayit) return new Response("Bulunamadı", { status: 404 });
  const veri = await readFile(path.join(process.cwd(), kayit[0]));
  return new Response(new Uint8Array(veri), {
    headers: {
      "Content-Type": kayit[1],
      "Cache-Control": "public, max-age=604800",
      "Cross-Origin-Resource-Policy": "same-origin",
    },
  });
}
