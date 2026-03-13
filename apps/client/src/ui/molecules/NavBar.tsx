import styles from "./NavBar.module.css";

type NavBarProps = {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canNext: boolean;
  nextLabel?: string;
};

export default function NavBar({
  step,
  total,
  onPrev,
  onNext,
  canNext,
  nextLabel = "ДАЛЕЕ",
}: NavBarProps) {
  return (
    <div className={styles.root}>
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 0}
        className={styles.prev}
      >
        ← НАЗАД
      </button>
      <span className={styles.counter}>
        {step + 1} / {total}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className={styles.next}
      >
        {nextLabel} →
      </button>
    </div>
  );
}
