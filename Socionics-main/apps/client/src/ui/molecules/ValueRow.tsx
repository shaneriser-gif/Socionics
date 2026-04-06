import { classNames } from "../../shared/utils/classNames";
import styles from "./ValueRow.module.css";

type ValueRowProps = {
  label: string;
  value?: string | null;
  fail?: boolean;
  note?: string | null;
};

export default function ValueRow({ label, value, fail, note }: ValueRowProps) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>{label}</span>
      <div className={styles.right}>
        <span
          className={classNames(
            styles.value,
            !value && styles.dim,
            fail && styles.fail,
          )}
        >
          {value ?? "—"}
        </span>
        {note ? <span className={styles.note}>{note}</span> : null}
      </div>
    </div>
  );
}
