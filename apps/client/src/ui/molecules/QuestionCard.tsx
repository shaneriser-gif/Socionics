import type { ReactNode } from "react";
import styles from "./QuestionCard.module.css";

type QuestionCardProps = {
  children: ReactNode;
};

export default function QuestionCard({ children }: QuestionCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.label}>ВОПРОС</div>
      <div className={styles.text}>{children}</div>
    </div>
  );
}
