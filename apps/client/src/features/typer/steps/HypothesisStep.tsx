import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import Tag from "../../../ui/atoms/Tag";
import NavBar from "../../../ui/molecules/NavBar";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./HypothesisStep.module.css";

type HypothesisStepProps = {
  typer: TyperController;
};

export default function HypothesisStep({ typer }: HypothesisStepProps) {
  const hypData = typer.hypData;

  return (
    <div>
      <Eyebrow>Итог первых двух признаков</Eyebrow>
      <Heading>Первичная гипотеза</Heading>
      {hypData ? (
        <>
          <div className={common.glowCard}>
            <div className={common.glowOrb} />
            <div className={styles.hypDesc}>{hypData.desc}</div>
            <div className={styles.hypName}>{hypData.name}</div>
            <div className={styles.hypSub}>{hypData.sub}</div>
            <div className={styles.tagRow}>
              {hypData.types.map((type) => (
                <Tag key={type}>{type}</Tag>
              ))}
            </div>
          </div>

          <div className={styles.expectCard}>
            <div className={styles.expectTitle}>
              ОЖИДАЕМЫЕ ЗНАЧЕНИЯ ДЛЯ ВЕРИФИКАЦИИ
            </div>
            <div className={common.gridTwoWide}>
              <div>
                <div className={styles.expectLabel}>ТАЛЬНОСТЬ</div>
                <Tag glow>
                  {hypData.tality === "static" ? "СТАТИК" : "ДИНАМИК"}
                </Tag>
              </div>
              <div>
                <div className={styles.expectLabel}>ПОЗИТИВИЗМ · ПРОЦЕСС</div>
                {hypData.types.map((type) => {
                  const entry = hypData.posProc[type];
                  if (!entry) return null;
                  const [p, pr] = entry;
                  return (
                    <div key={type} className={styles.posRow}>
                      <span className={styles.posType}>{type}</span>
                      <span className={styles.posText}>
                        {p === "+" ? "Позитив." : "Негатив."} ·{" "}
                        {pr === "пц" ? "Процесс" : "Результат"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.note}>
            Три следующих признака верифицируют гипотезу. Расхождение — сигнал к
            пересмотру.
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          Вернитесь и ответьте на вопросы по нальности и вертности.
        </div>
      )}
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!hypData}
      />
    </div>
  );
}
