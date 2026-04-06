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
        <a
          href="https://t.me/fractalscn"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.brand}
        >
          ФРАКТАЛЬНАЯ <span>СОЦИОНИКА</span>
        </a>
        {sectionLabel ? (
          <>
            <div className={styles.divider} />
            <div className={styles.section}>{sectionLabel}</div>
          </>
        ) : null}
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
