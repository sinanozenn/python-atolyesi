"use client";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { useMemo } from "react";

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
  return (
    <div className="editor" style={{ ["--en-az-satir" as string]: enAz }}>
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
