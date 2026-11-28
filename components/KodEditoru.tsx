"use client";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { useMemo, useState } from "react";

type Props = {
  deger: string;
  degisince: (v: string) => void;
  /** Ctrl+Enter ile çalıştırma */
  calistir?: () => void;
  enAz?: number;
};

export default function KodEditoru({ deger, degisince, calistir, enAz = 3 }: Props) {
  const eklentiler = useMemo(
    () => [
      python(),
      EditorView.lineWrapping,
      Prec.highest(
        keymap.of([
          {
            key: "Mod-Enter",
            run: () => {
              calistir?.();
              return true;
            },
          },
        ])
      ),
    ],
    [calistir]
  );
  const [kopyalandi, setKopyalandi] = useState(false);
  async function kopyala() {
    try {
      await navigator.clipboard.writeText(deger);
    } catch {
      // Eski tarayıcılar ve izin verilmeyen durumlar için yedek yöntem
      const alan = document.createElement("textarea");
      alan.value = deger;
      alan.style.position = "fixed";
      alan.style.opacity = "0";
      document.body.appendChild(alan);
      alan.select();
      document.execCommand("copy");
      alan.remove();
    }
    setKopyalandi(true);
    setTimeout(() => setKopyalandi(false), 1500);
  }
  return (
    <div className="editor" style={{ ["--en-az-satir" as string]: enAz }}>
      <button type="button" className={kopyalandi ? "kopyala tamam" : "kopyala"} onClick={kopyala} title={kopyalandi ? "Kopyalandı" : "Kodu kopyala"} aria-label={kopyalandi ? "Kopyalandı" : "Kodu kopyala"}>
        {kopyalandi ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </button>
      <CodeMirror
        value={deger}
        onChange={degisince}
        extensions={eklentiler}
        basicSetup={{ foldGutter: false, highlightActiveLine: true, autocompletion: false, tabSize: 4 }}
        indentWithTab
        onCreateEditor={(v) => { document.fonts?.ready.then(() => v.requestMeasure()); }}
      />
    </div>
  );
}
