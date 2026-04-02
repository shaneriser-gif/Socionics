import styles from "./TopNav.module.css";

type TopNavProps = {
  step: number;
  stepCount: number;
  sectionLabel: string;
  onReset?: () => void;
};

export default function TopNav({
  step,
  stepCount,
  sectionLabel,
  onReset,
}: TopNavProps) {
  return (
    <nav className={styles.root}>
      <div className={styles.left}>
        <div className={styles.brand}>
          ФРАКТАЛЬНАЯ <span>СОЦИОНИКА</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.section}>{sectionLabel}</div>
      </div>
      <div className={styles.right}>
        {step > 0 && onReset ? (
          <button type="button" onClick={onReset} className={styles.reset}>
            СБРОС
          </button>
        ) : null}
        <div className={styles.counter}>
          {String(step + 1).padStart(2, "0")} /{" "}
          {String(stepCount).padStart(2, "0")}
        </div>
      </div>
    </nav>
  );
}
