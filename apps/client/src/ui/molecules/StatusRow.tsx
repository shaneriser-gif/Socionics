import { classNames } from "../../shared/utils/classNames";
import styles from "./StatusRow.module.css";

type Status = "ok" | "fail" | "neutral";

type StatusRowProps = {
  label: string;
  value?: string | null;
  status?: Status;
  note?: string | null;
};

export default function StatusRow({
  label,
  value,
  status = "neutral",
  note,
}: StatusRowProps) {
  return (
    <div className={styles.root}>
      <span className={classNames(styles.dot, styles[status])} />
      <span className={styles.label}>{label}</span>
      <span className={classNames(styles.value, styles[status])}>
        {value ?? "—"}
      </span>
      {note ? <span className={styles.note}>{note}</span> : null}
    </div>
  );
}
