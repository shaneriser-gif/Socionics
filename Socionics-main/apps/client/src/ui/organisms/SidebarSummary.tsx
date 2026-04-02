import Tag from "../atoms/Tag";
import ValueRow from "../molecules/ValueRow";
import styles from "./SidebarSummary.module.css";
import type {
  AnswerState,
  Temperament,
  TypeResult,
} from "../../shared/types/typer";

type Labels = {
  rationalLabel: string | null;
  extroLabel: string | null;
  staticsLabel: string | null;
  posLabel: string | null;
  procLabel: string | null;
};

type SidebarSummaryProps = {
  labels: Labels;
  answers: AnswerState;
  activeTemp: Temperament | null;
  tempOverride: string | null;
  finalType: TypeResult | null;
  talMatch: boolean | null;
  ppCheck: "ok" | "fail" | null;
};

export default function SidebarSummary({
  labels,
  answers,
  activeTemp,
  tempOverride,
  finalType,
  talMatch,
  ppCheck,
}: SidebarSummaryProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>ГИПОТЕЗА</div>
      <ValueRow label="Нальность (Иррац/Рац)" value={labels.rationalLabel} />
      <ValueRow label="Вертность (Экстра/Интро)" value={labels.extroLabel} />
      <ValueRow
        label="Тальность (Статик/Динамик)"
        value={labels.staticsLabel}
        fail={talMatch === false}
      />
      <ValueRow label="Позитивизм/Негативизм" value={labels.posLabel} />
      <ValueRow label="Процесс/Результат" value={labels.procLabel} />

      {activeTemp ? (
        <div className={styles.tempCard}>
          <div className={styles.tempLabel}>
            {tempOverride ? "СКОРР." : "ТЕМПЕРАМЕНТ"}
          </div>
          <div className={styles.tempName}>{activeTemp.name}</div>
          <div className={styles.tempTags}>
            {activeTemp.types.map((type) => (
              <Tag key={type}>{type}</Tag>
            ))}
          </div>
        </div>
      ) : null}

      {answers.base || answers.creative ? (
        <div className={styles.egoCard}>
          <div className={styles.egoLabel}>ЭГО-БЛОК</div>
          <ValueRow label="Базовая" value={answers.base} />
          <ValueRow label="Творческая" value={answers.creative} />
          {finalType ? (
            <div className={styles.finalType}>
              <div className={styles.finalCode}>{finalType.c}</div>
              <div className={styles.finalName}>{finalType.n}</div>
            </div>
          ) : null}
        </div>
      ) : null}

      {talMatch !== null || ppCheck ? (
        <div className={styles.checks}>
          <div className={styles.checksLabel}>ПРОВЕРКИ</div>
          <div className={styles.checkRow}>
            <span
              className={styles.checkDot}
              data-status={
                talMatch === true
                  ? "ok"
                  : talMatch === false
                  ? "fail"
                  : "neutral"
              }
            />
            <span
              className={styles.checkText}
              data-status={
                talMatch === true
                  ? "ok"
                  : talMatch === false
                  ? "fail"
                  : "neutral"
              }
            >
              Тальность
            </span>
          </div>
          <div className={styles.checkRow}>
            <span
              className={styles.checkDot}
              data-status={
                ppCheck === "ok"
                  ? "ok"
                  : ppCheck === "fail"
                  ? "fail"
                  : "neutral"
              }
            />
            <span
              className={styles.checkText}
              data-status={
                ppCheck === "ok"
                  ? "ok"
                  : ppCheck === "fail"
                  ? "fail"
                  : "neutral"
              }
            >
              Позит+Проц
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
