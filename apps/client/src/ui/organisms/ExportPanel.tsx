import { useState } from "react";
import { classNames } from "../../shared/utils/classNames";
import styles from "./ExportPanel.module.css";
import type { Temperament, TypeInfo, TypeResult } from "../../shared/types/typer";

type ExportPanelProps = {
  finalType: TypeResult;
  typeInfo: TypeInfo;
  activeTemp: Temperament | null;
  labels: {
    rationalLabel: string | null;
    extroLabel: string | null;
    staticsLabel: string | null;
    posLabel: string | null;
    procLabel: string | null;
  };
  base: string | null;
  creative: string | null;
};

export default function ExportPanel({
  finalType,
  typeInfo,
  activeTemp,
  labels,
  base,
  creative,
}: ExportPanelProps) {
  const [copied, setCopied] = useState(false);

  const text = [
    `СОЦИОНИЧЕСКИЙ ТИП: ${finalType.c} — ${finalType.n}`,
    `${typeInfo.formula} · ${typeInfo.subtitle}`,
    `Квадра: ${typeInfo.quadra} · ${activeTemp?.desc ?? ""}`,
    "",
    typeInfo.desc,
    "",
    `Главное: ${typeInfo.main}`,
    `Инструмент: ${typeInfo.tool}`,
    "",
    "─────────────────────────",
    `Нальность:         ${labels.rationalLabel ?? "—"}`,
    `Вертность:         ${labels.extroLabel ?? "—"}`,
    `Темперамент:       ${activeTemp?.name ?? "—"}`,
    `Тальность:         ${labels.staticsLabel ?? "—"}`,
    `Позитивизм:        ${labels.posLabel ?? "—"}`,
    `Процесс/Результат: ${labels.procLabel ?? "—"}`,
    `Базовая:           ${base ?? "—"}`,
    `Творческая:        ${creative ?? "—"}`,
    "",
    `Подробнее: https://shaneri.ru/${typeInfo.slug}`,
  ].join("\n");

  const handleCopy = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>${finalType.c} — ${
      finalType.n
    }</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Mono&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:'Space Mono',monospace;background:#06060b;color:#ede8f5;padding:48px;line-height:1.8;}
      .hero{margin-bottom:40px;}
      .code{font-size:72px;font-family:'Syne',sans-serif;font-weight:900;color:#9d4edd;line-height:1;margin-bottom:8px;}
      .name{font-size:24px;font-family:'Syne',sans-serif;font-weight:700;color:#ede8f5;margin-bottom:4px;}
      .meta{color:#7a6f8a;font-size:12px;margin-bottom:16px;}
      .pill{display:inline-block;padding:4px 12px;border:1px solid rgba(157,78,221,0.4);border-radius:2px;color:#9d4edd;font-size:11px;}
      .section{margin-top:32px;padding-top:24px;border-top:1px solid rgba(157,78,221,0.12);}
      .label{color:#332d42;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;}
      .subtitle{color:#9d4edd;font-size:14px;font-family:'Syne',sans-serif;font-weight:700;margin-bottom:8px;}
      .desc{color:#a898bc;font-size:13px;line-height:1.75;max-width:640px;}
      .kv{display:flex;gap:16px;margin-bottom:6px;}
      .kv-label{color:#332d42;font-size:11px;width:180px;flex-shrink:0;}
      .kv-value{color:#ede8f5;font-size:11px;}
      .highlight{color:#9d4edd;}
      .link{color:#9d4edd;font-size:13px;}
      @media print{
        body{background:#fff;color:#111;}
        .code,.highlight,.pill,.link{color:#6a0dad;}
        .meta,.kv-label{color:#888;}
        .desc{color:#444;}
      }
    </style></head><body>
    <div class="hero">
      <div class="code">${finalType.c}</div>
      <div class="name">${finalType.n}</div>
      <div class="meta">${typeInfo.quadra} квадра · ${
        activeTemp?.desc ?? ""
      }</div>
      <div class="pill">${typeInfo.formula}</div>
    </div>
    <div class="section">
      <div class="label">Описание типа</div>
      <div class="subtitle">${typeInfo.subtitle}</div>
      <div class="desc">${typeInfo.desc}</div>
    </div>
    <div class="section">
      <div class="kv"><span class="kv-label">Главное</span><span class="kv-value highlight">${typeInfo.main}</span></div>
      <div class="kv"><span class="kv-label">Инструмент</span><span class="kv-value">${typeInfo.tool}</span></div>
    </div>
    <div class="section">
      <div class="label">Путь типирования</div>
      ${[
        ["Нальность", labels.rationalLabel],
        ["Вертность", labels.extroLabel],
        ["Темперамент", activeTemp?.name],
        ["Тальность", labels.staticsLabel],
        ["Позитивизм", labels.posLabel],
        ["Процесс/Результат", labels.procLabel],
        ["Базовая", base],
        ["Творческая", creative],
      ]
        .map(
          ([l, v]) =>
            `<div class="kv"><span class="kv-label">${l}</span><span class="kv-value">${
              v ?? "—"
            }</span></div>`,
        )
        .join("")}
    </div>
    <div class="section">
      <div class="label">Подробнее</div>
      <a class="link" href="https://shaneri.ru/${typeInfo.slug}">shaneri.ru/${typeInfo.slug}</a>
    </div>
    </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>ЭКСПОРТ РЕЗУЛЬТАТА</div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleCopy}
          className={classNames(styles.action, copied && styles.copied)}
        >
          <span className={styles.icon}>{copied ? "✓" : "⎘"}</span>
          {copied ? "СКОПИРОВАНО" : "КОПИРОВАТЬ ТЕКСТ"}
        </button>
        <button type="button" onClick={handlePrint} className={styles.action}>
          <span className={styles.icon}>⎙</span>
          ПЕЧАТЬ / PDF
        </button>
      </div>
    </div>
  );
}
