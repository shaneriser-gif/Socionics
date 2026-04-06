import type { CSSProperties, ReactNode } from "react";
import { classNames } from "../../shared/utils/classNames";
import styles from "./AnswerOption.module.css";

type AnswerOptionProps = {
  label: ReactNode;
  desc: ReactNode;
  who?: ReactNode;
  selected?: boolean;
  onClick: () => void;
  hintIndex?: number;
  groupSize?: number;
  groupCount?: number;
  groupSelected?: boolean;
};

export default function AnswerOption({
  label,
  desc,
  who,
  selected,
  onClick,
  hintIndex,
  groupSize = 5,
  groupCount = 2,
  groupSelected = false,
}: AnswerOptionProps) {
  const shouldAnimate = hintIndex !== undefined && !groupSelected && !selected;
  const hintStyle = shouldAnimate
    ? ({
        "--hint-delay": `${hintIndex * (groupSize / groupCount)}s`,
        "--hint-duration": `${groupSize}s`,
      } as CSSProperties)
    : {};

  return (
    <button
      type="button"
      onClick={onClick}
      style={hintStyle}
      className={classNames(
        styles.root,
        selected && styles.selected,
        shouldAnimate && styles.hint,
      )}
    >
      <div className={styles.title}>{label}</div>
      <div className={styles.desc}>{desc}</div>
      {who ? <div className={styles.who}>{who}</div> : null}
    </button>
  );
}
