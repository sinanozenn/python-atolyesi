// Python'un İngilizce hata mesajlarını öğrencinin anlayacağı Türkçe açıklamalara çevirir.

export type PythonHatasi = {
  tur: string;
  mesaj: string;
  satir: number | null;
  ayrinti: string;
};

type Kural = { tur: string | RegExp; desen?: RegExp; aciklama: (m: RegExpMatchArray | null, h: PythonHatasi) => string };

const kurallar: Kural[] = [
  {
    tur: "NameError",
    desen: /name '(\w+)' is not defined/,
    aciklama: (m) =>
      `**${m?.[1]}** adında bir değişken bulunamadı. Şunları kontrol et:\n` +
      `- Yazımı doğru mu? Python büyük/küçük harfe dikkat eder (\`Sayi\` ile \`sayi\` farklıdır).\n` +
      `- Bu değişkene kullanmadan **önce** bir değer atadın mı?\n` +
      `- Bir metin yazmak istediysen tırnak içine almayı unutmuş olabilirsin: \`"${m?.[1]}"\``,
  },
  {
    tur: "SyntaxError",
    desen: /expected ':'/,
    aciklama: () => "`if`, `elif`, `else`, `for` ve `while` satırlarının sonuna **iki nokta üst üste (:)** koymalısın.",
  },
  {
    tur: "SyntaxError",
    desen: /unterminated string literal|EOL while scanning/,
    aciklama: () => "Bir metnin tırnağını açtın ama kapatmadın. Metinler `\"böyle\"` iki tırnak arasında olmalı.",
  },
  {
    tur: "SyntaxError",
    desen: /'(\(|\[|\{)' was never closed/,
    aciklama: (m) => `Açtığın bir **${m?.[1]}** işaretini kapatmayı unuttun. Her açılan parantezin bir kapanışı olmalı.`,
  },
  {
    tur: "SyntaxError",
    desen: /unmatched '(\)|\]|\})'/,
    aciklama: (m) => `Fazladan bir **${m?.[1]}** var; açılmamış bir parantezi kapatıyorsun.`,
  },
  {
    tur: "SyntaxError",
    desen: /Maybe you meant '==' |cannot assign to/,
    aciklama: () =>
      "İki değeri **karşılaştırmak** için `==` (iki eşittir) kullanılır. Tek `=` sadece değişkene değer **atamak** içindir.",
  },
  {
    tur: "SyntaxError",
    desen: /invalid character/,
    aciklama: () =>
      "Kodda Python'un tanımadığı bir karakter var. Genelde Word gibi programlardan kopyalanan “eğik tırnaklar” bu soruna yol açar; tırnakları klavyeden yeniden yaz.",
  },
  {
    tur: "SyntaxError",
    aciklama: () =>
      "Python bu satırı anlayamadı (yazım hatası). Eksik tırnak, parantez, iki nokta (:) ya da yanlış yazılmış bir komut olabilir. `^` işaretinin gösterdiği yere bak.",
  },
  {
    tur: "IndentationError",
    desen: /expected an indented block/,
    aciklama: () =>
      "İki nokta (:) ile biten bir satırdan sonra gelen satırlar **içeriden (girintili)** başlamalı. Satırın başına 4 boşluk ya da Tab koy.",
  },
  {
    tur: "IndentationError",
    desen: /unexpected indent/,
    aciklama: () => "Bu satırın başında gereksiz boşluk var. Sadece `if`, `for`, `while` gibi blokların içindeki satırlar içeriden başlar.",
  },
  {
    tur: /IndentationError|TabError/,
    aciklama: () => "Satır başlarındaki boşluklar (girintiler) birbiriyle uyumlu değil. Aynı bloktaki satırlar aynı hizada olmalı.",
  },
  {
    tur: "TypeError",
    desen: /can only concatenate str \(not "(\w+)"\) to str/,
    aciklama: () =>
      "Bir **metni** bir **sayıyla** `+` kullanarak birleştiremezsin. İki çözüm var:\n" +
      "- Virgül kullan: `print(\"Yaşın:\", yas)`\n" +
      "- Sayıyı metne çevir: `print(\"Yaşın: \" + str(yas))`",
  },
  {
    tur: "TypeError",
    desen: /unsupported operand type\(s\).*'str' and 'int'|unsupported operand type\(s\).*'int' and 'str'|not supported between instances of 'str' and 'int'|not supported between instances of 'int' and 'str'/,
    aciklama: () =>
      "Bir **metin** ile bir **sayı** üzerinde işlem yapmaya çalışıyorsun. `input()` her zaman **metin** verir; sayı olarak kullanmak için `int(input())` yazmalısın.",
  },
  {
    tur: "TypeError",
    desen: /'(\w+)' object is not callable/,
    aciklama: (m) => `Bir **${m?.[1]}** değerini fonksiyon gibi çağırıyorsun. Belki bir değişkene \`print\` ya da \`input\` gibi bir isim verdin?`,
  },
  {
    tur: "ValueError",
    desen: /invalid literal for int\(\) with base 10: '(.*)'/,
    aciklama: (m) => `**"${m?.[1]}"** bir tam sayıya çevrilemez. \`int()\` sadece \`"42"\` gibi rakamlardan oluşan metinleri sayıya çevirebilir.`,
  },
  {
    tur: "ValueError",
    desen: /could not convert string to float: '(.*)'/,
    aciklama: (m) => `**"${m?.[1]}"** ondalıklı sayıya çevrilemez. Ondalık ayırıcı olarak virgül değil **nokta** kullan: \`3.5\``,
  },
  {
    tur: "ZeroDivisionError",
    aciklama: () => "Bir sayıyı **sıfıra bölmeye** çalıştın. Matematikte olduğu gibi Python'da da bu tanımsızdır.",
  },
  {
    tur: "EOFError",
    desen: /GIRDI_BITTI/,
    aciklama: () =>
      "Programın `input()` ile senden bir değer istedi ama **Girdiler** kutusunda yeterli satır yok. Her `input()` için kutuya bir satır yaz.",
  },
  {
    tur: "IndexError",
    aciklama: () => "Listede olmayan bir sıraya (indekse) ulaşmaya çalıştın. Unutma: sayma **0'dan** başlar; 3 elemanlı listenin son indeksi 2'dir.",
  },
  {
    tur: "ZamanAsimi",
    aciklama: () =>
      "Programın çok uzun sürdüğü için durduruldu. Büyük ihtimalle **sonsuz bir döngü** var: `while` koşulunun bir gün yanlış (False) olacağından emin ol — döngü değişkenini artırmayı unutmuş olabilirsin.",
  },
];

export function hatayiAcikla(h: PythonHatasi): string {
  for (const k of kurallar) {
    const turUyar = typeof k.tur === "string" ? k.tur === h.tur : k.tur.test(h.tur);
    if (!turUyar) continue;
    if (k.desen) {
      const m = h.mesaj.match(k.desen);
      if (!m) continue;
      return k.aciklama(m, h);
    }
    return k.aciklama(null, h);
  }
  return "Programın çalışırken bir hata oluştu. Aşağıdaki İngilizce mesaj ipucu verebilir; hata satırına dikkatle bak.";
}
