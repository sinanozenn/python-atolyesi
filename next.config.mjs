/** @type {import('next').NextConfig} */
const statik = process.env.STATIK === "1";

const nextConfig = {
  // Site bir alt klasörde yayınlanacaksa (ör. siteniz.com/python) burayı "/python" yapın
  // ve aynı değeri NEXT_PUBLIC_BASE_PATH ortam değişkenine de verin.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // STATIK=1 npm run build → "out" klasörüne sunucusuz, düz HTML çıktısı üretir
  ...(statik
    ? { output: "export", trailingSlash: true }
    : {
        async headers() {
          return [
            {
              // IDE'de canlı input() için gerekli (SharedArrayBuffer)
              source: "/:path*",
              headers: [
                { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
              ],
            },
            {
              // Python motoru dosyaları büyük ve sürümü sabit: tarayıcı önbelleğinde uzun süre tutulsun
              source: "/pyodide/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
            },
          ];
        },
      }),
};

export default nextConfig;
