import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import Tag from "../../../ui/atoms/Tag";
import NavBar from "../../../ui/molecules/NavBar";
import StatusRow from "../../../ui/molecules/StatusRow";
import { TEMPS } from "../data/temps";
import type { TyperController } from "../hooks/useTyperState";
import type { TemperamentKey } from "../../../shared/types/typer";
import styles from "./SynthesisStep.module.css";

type SynthesisStepProps = {
  typer: TyperController;
};

export default function SynthesisStep({ typer }: SynthesisStepProps) {
  const mismatch = typer.talMatch === false || typer.ppCheck === "fail";
  return (
    <div>
      <Eyebrow>Этап 1 завершён · Синтез</Eyebrow>
      <Heading>Определение темперамента</Heading>
      <div className={styles.summary}>
        {[
          { label: "Нальность", value: typer.labels.rationalLabel, status: "ok" },
          { label: "Вертность", value: typer.labels.extroLabel, status: "ok" },
          {
            label: "Тальность",
            value: typer.labels.staticsLabel,
            status:
              typer.talMatch === true
                ? "ok"
                : typer.talMatch === false
                ? "fail"
                : "neutral",
            note:
              typer.talMatch === false
                ? `Ожидалось: ${
                    typer.hypData?.tality === "static" ? "Статик" : "Динамик"
                  }`
                : null,
          },
          {
            label: "Позитивизм",
            value: typer.labels.posLabel,
            status:
              typer.ppCheck === "ok"
                ? "ok"
                : typer.ppCheck === "fail"
                ? "fail"
                : "neutral",
          },
          {
            label: "Процесс/Результат",
            value: typer.labels.procLabel,
            status: "neutral",
          },
        ].map(({ label, value, status, note }) => (
          <StatusRow
            key={label}
            label={label}
            value={value}
            status={status as "ok" | "fail" | "neutral"}
            note={note}
          />
        ))}
      </div>

      {mismatch && !typer.tempOverride ? (
        <div className={styles.warning}>
          <div className={styles.warningTitle}>⚠ РАСХОЖДЕНИЕ ДАННЫХ</div>
          <p className={styles.warningText}>
            Найди наиболее уверенные ответы и пересмотри гипотезу.
          </p>
          <button
            type="button"
            onClick={() => typer.setShowOverride((prev) => !prev)}
            className={styles.warningButton}
          >
            {typer.showOverride ? "− СКРЫТЬ" : "+ ИЗМЕНИТЬ ТЕМПЕРАМЕНТ"}
          </button>
        </div>
      ) : null}

      {typer.showOverride ? (
        <div className={styles.override}>
          <div className={styles.overrideLabel}>ВЫБОР ВРУЧНУЮ</div>
          <div className={styles.overrideGrid}>
            {Object.entries(TEMPS).map(([key, temp]) => {
              const active = (typer.tempOverride ?? typer.hypKey) === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    typer.setTempOverride(key as TemperamentKey);
                    typer.setShowOverride(false);
                  }}
                  className={`${styles.overrideButton} ${
                    active ? styles.overrideActive : ""
                  }`}
                >
                  <div className={styles.overrideDesc}>{temp.desc}</div>
                  <div className={styles.overrideName}>{temp.name}</div>
                  <div className={styles.overrideTypes}>
                    {temp.types.join("  ")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {typer.activeTemp ? (
        <div className={styles.tempCard}>
          <div className={styles.tempLabel}>
            {typer.tempOverride
              ? "СКОРРЕКТИРОВАННЫЙ ТЕМПЕРАМЕНТ"
              : "ИТОГОВЫЙ ТЕМПЕРАМЕНТ"}
          </div>
          <div className={styles.tempName}>{typer.activeTemp.name}</div>
          <div className={styles.tempSub}>
            {typer.activeTemp.sub} · {typer.activeTemp.desc}
          </div>
          <div className={styles.tempTags}>
            {typer.activeTemp.types.map((type) => (
              <Tag key={type} glow>
                {type}
              </Tag>
            ))}
          </div>
        </div>
      ) : null}

      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!(typer.tempOverride ?? typer.hypKey)}
        nextLabel="ЭТАП 2"
      />
    </div>
  );
}
