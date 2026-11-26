// Derslerde kullanılan akış diyagramları (SVG). Kitaptaki Görsel 3.8, 3.9, 3.10 ve 3.11'e karşılık gelir.

const stil = `
<defs>
  <marker id="ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill="#26272b"/>
  </marker>
</defs>
<style>
  .k { fill:#fff; stroke:#1d3178; stroke-width:2 }
  .bas { fill:#fbfbf8; stroke:#26272b; stroke-width:2 }
  .kar { fill:#fff06a; stroke:#26272b; stroke-width:2 }
  .c { stroke:#26272b; stroke-width:1.75; fill:none; marker-end:url(#ok) }
  text { font-family: "Atkinson Hyperlegible Next", system-ui, sans-serif; font-size:15px; fill:#26272b; text-anchor:middle; dominant-baseline:middle }
  .kod { font-family: "Atkinson Hyperlegible Mono", ui-monospace, Menlo, monospace; font-size:14px }
  .e { fill:#1f7a4a; font-weight:700; font-size:14px }
  .h { fill:#c8232f; font-weight:700; font-size:14px }
</style>`;

const kutu = (x: number, y: number, w: number, h: number, metin: string, sinif = "k", kod = false) =>
  `<rect class="${sinif}" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${sinif === "bas" ? h / 2 : 8}"/>` +
  `<text x="${x}" y="${y}" ${kod ? 'class="kod"' : ""}>${metin}</text>`;
const karar = (x: number, y: number, w: number, h: number, metin: string) =>
  `<polygon class="kar" points="${x},${y - h / 2} ${x + w / 2},${y} ${x},${y + h / 2} ${x - w / 2},${y}"/>` +
  `<text x="${x}" y="${y}" class="kod">${metin}</text>`;
const cizgi = (d: string) => `<path class="c" d="${d}"/>`;
const etiket = (x: number, y: number, m: string, s: "e" | "h") => `<text x="${x}" y="${y}" class="${s}">${m}</text>`;
const svg = (w: number, h: number, icerik: string, baslik: string) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${baslik}">${stil}${icerik}</svg>`;

/** if-else akış diyagramı (Görsel 3.8) */
export const ifElseAkis = svg(
  560,
  400,
  [
    kutu(280, 30, 120, 40, "Başla", "bas"),
    cizgi("M280,50 L280,88"),
    karar(280, 135, 220, 90, "koşul doğru mu?"),
    cizgi("M170,135 L110,135 L110,208"),
    etiket(140, 120, "Evet (True)", "e"),
    cizgi("M390,135 L450,135 L450,208"),
    etiket(420, 120, "Hayır (False)", "h"),
    kutu(110, 235, 170, 50, "if bloğu (1. işlem)"),
    kutu(450, 235, 170, 50, "else bloğu (2. işlem)"),
    cizgi("M110,260 L110,300 L268,300"),
    cizgi("M450,260 L450,300 L292,300"),
    cizgi("M280,300 L280,318"),
    kutu(280, 340, 170, 40, "3. işlem (her zaman)"),
    `<circle cx="280" cy="300" r="4" fill="#26272b"/>`,
    cizgi("M280,360 L280,372"),
    kutu(280, 385, 100, 26, "Bitir", "bas"),
  ].join(""),
  "if-else yapısının akış diyagramı"
);

/** if-elif-else akış diyagramı (Görsel 3.9) */
export const elifAkis = svg(
  620,
  470,
  [
    kutu(200, 28, 120, 40, "Başla", "bas"),
    cizgi("M200,48 L200,80"),
    karar(200, 125, 200, 86, "koşul 1?"),
    cizgi("M100,125 L60,125 L60,330"),
    etiket(80, 110, "Evet", "e"),
    cizgi("M300,125 L360,125 L360,178"),
    etiket(330, 110, "Hayır", "h"),
    karar(360, 222, 200, 86, "koşul 2? (elif)"),
    cizgi("M260,222 L210,222 L210,330"),
    etiket(232, 207, "Evet", "e"),
    cizgi("M460,222 L520,222 L520,330"),
    etiket(490, 207, "Hayır", "h"),
    kutu(60, 355, 100, 50, "1. işlem"),
    kutu(210, 355, 100, 50, "2. işlem"),
    kutu(520, 355, 150, 50, "3. işlem (else)"),
    cizgi("M60,380 L60,405 L278,405"),
    cizgi("M210,380 L210,405"),
    cizgi("M520,380 L520,405 L302,405"),
    `<circle cx="290" cy="405" r="4" fill="#26272b"/>`,
    cizgi("M290,405 L290,420"),
    kutu(290, 445, 120, 40, "4. işlem"),
  ].join(""),
  "if-elif-else yapısının akış diyagramı"
);

/** Döngü akış diyagramı (Görsel 3.10 / 3.11) */
export const donguAkis = svg(
  560,
  480,
  [
    kutu(220, 28, 120, 40, "Başla", "bas"),
    cizgi("M220,48 L220,78"),
    kutu(220, 100, 180, 44, "i = 0   (sayaç)", "k", true),
    cizgi("M220,122 L220,158"),
    karar(220, 205, 200, 90, "i &lt; 5 ?"),
    cizgi("M220,250 L220,290"),
    etiket(250, 270, "Evet", "e"),
    kutu(220, 315, 200, 46, 'print("Programlama")', "k", true),
    cizgi("M220,338 L220,368"),
    kutu(220, 392, 200, 46, "i = i + 1", "k", true),
    cizgi("M120,392 L50,392 L50,205 L118,205"),
    `<text x="50" y="300" class="e" transform="rotate(-90 50 300)">tekrar</text>`,
    cizgi("M320,205 L440,205 L440,428"),
    etiket(380, 190, "Hayır", "h"),
    kutu(440, 450, 140, 40, "Döngü biter", "bas"),
  ].join(""),
  "Döngü yapısının akış diyagramı"
);
