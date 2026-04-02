import { classNames } from "../../shared/utils/classNames";
import styles from "./ValueRow.module.css";

type ValueRowProps = {
  label: string;
  value?: string | null;
  fail?: boolean;
};

export default function ValueRow({ label, value, fail }: ValueRowProps) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>{label}</span>
      <span
        className={classNames(
          styles.value,
          !value && styles.dim,
          fail && styles.fail,
        )}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}
