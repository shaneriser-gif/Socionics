import type { ReactNode } from "react";
import { classNames } from "../../shared/utils/classNames";
import styles from "./AnswerOption.module.css";

type AnswerOptionProps = {
  label: ReactNode;
  desc: ReactNode;
  who?: ReactNode;
  selected?: boolean;
  onClick: () => void;
};

export default function AnswerOption({
  label,
  desc,
  who,
  selected,
  onClick,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(styles.root, selected && styles.selected)}
    >
      <div className={styles.title}>{label}</div>
      <div className={styles.desc}>{desc}</div>
      {who ? <div className={styles.who}>{who}</div> : null}
    </button>
  );
}
