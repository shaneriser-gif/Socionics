import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./HintBox.module.css";

type HintBoxProps = {
  title: string;
  children: ReactNode;
};

export default function HintBox({ title, children }: HintBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.root}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={styles.toggle}
      >
        <span>↳ {title}</span>
        <span className={styles.icon}>{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className={styles.body}>
          <div className={styles.content}>{children}</div>
        </div>
      ) : null}
    </div>
  );
}
