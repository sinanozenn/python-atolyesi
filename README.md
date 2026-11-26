# 🐍 Python Atölyesi

Lise hazırlık sınıfları için Türkçe, etkileşimli Python dersleri. Python, **Pyodide** sayesinde doğrudan
öğrencinin tarayıcısında çalışır: sunucuya yük binmez, öğrencinin hiçbir şey kurması gerekmez.

## Özellikler
- 12 ders: "Programlamaya Giriş ve Algoritma" ders kitabı 3. Ünite sırasıyla (3.1–3.6) + ünite değerlendirmesi
- Her derste düzenlenip çalıştırılabilen örnekler, “Düşün bakalım” soruları ve **otomatik kontrol edilen alıştırmalar** (toplam 31; kitaptaki uygulama, etkinlik ve ölçme soruları dâhil)
- Python hata mesajlarının **Türkçe açıklamaları** ve hatalı satır numarası
- Kademeli ipuçları; çözüm yalnızca 2 denemeden sonra açılır
- `input()` desteği (Girdiler kutusu), sonsuz döngülerin 5 saniyede otomatik durdurulması
- İlerleme ve öğrenci kodları tarayıcıda saklanır (hesap yok, kişisel veri yok)
- 👩‍🏫 Her derste katlanabilir **öğretmen notu**
- **IDE**: dosya sekmeleri, örnek programlar, .py aç/indir ve canlı `input()` destekli konsol
- Her örnekte **IDE'de aç** düğmesi
- Oyun haritası: her ders bir seviye; görev başına 20, ilk denemede doğru soru başına 5 puan, seviye yıldızları

## Çalıştırma
Node.js 18.18 veya üstü gerekir.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Yayınlama
```bash
npm install
npm run build
npm start        # varsayılan port 3000; değiştirmek için: npm start -- -p 8080
```
Vercel, Netlify veya Node.js destekleyen herhangi bir sunucuda standart bir Next.js projesi gibi çalışır.

**Canlı input():** IDE'nin konsolda canlı cevap alabilmesi için site şu başlıklarla sunulmalıdır (next.config.mjs'de hazır; `npm start` ile otomatik gelir):
`Cross-Origin-Opener-Policy: same-origin` ve `Cross-Origin-Embedder-Policy: require-corp`. Başlıklar yoksa IDE otomatik olarak “Girdiler kutusu” moduna geçer.

Site bir alt klasörde yayınlanacaksa (ör. `siteniz.com/python`) derlemeden önce
`NEXT_PUBLIC_BASE_PATH=/python` ortam değişkenini ayarlayın.

## Yeni ders / alıştırma eklemek
1. `content/dersler/` içindeki bir dersi kopyalayın (ör. `06-listeler.ts`) ve içeriği değiştirin.
2. `content/index.ts` dosyasında import edip listeye ekleyin.
3. Blok türleri `content/tipler.ts` içinde açıklanmıştır: `metin` (Markdown), `ornek`, `ipucu`, `soru`, `alistirma`.
4. Her alıştırmanın `id` değeri benzersiz olmalı. Testler, kodu verilen `girdiler` ile çalıştırıp çıktıyı `beklenen` ile karşılaştırır
   (`input()` istemleri kontrol sırasında çıktıya karışmaz).
5. Yazdığınız örnek çözümlerin testleri geçtiğini doğrulayın:
   ```bash
   npm test
   ```

## Klasör yapısı
```
app/                  sayfalar (ana sayfa, harita, dersler, IDE)
components/           editör, çıktı paneli, alıştırma, soru vb.
content/              ders içerikleri  ← en çok burayı düzenleyeceksiniz
lib/                  Python çalıştırıcı, kontrolcü, Türkçe hata mesajları, ilerleme kaydı
python-motoru/        Python çalıştırıcı (worker.mjs + runner-core.mjs)
app/motor/            Python motoru dosyalarını doğru dosya türüyle sunan yol (Pyodide, npm paketinden)
tests/                çözümleri doğrulayan test betiği
```
