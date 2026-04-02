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
  const confirmed = typer.tempConfirmed;

  const handleConfirm = (value: boolean) => {
    typer.setTempConfirmed(value);
    if (!value) {
      typer.setShowOverride(true);
    } else {
      typer.setShowOverride(false);
    }
  };

  const canNext =
    confirmed === true || (confirmed === false && typer.tempOverride !== null);

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

      {typer.hypData && (
        <div className={styles.tempCard}>
          <div className={styles.tempLabel}>ГИПОТЕЗА ТЕМПЕРАМЕНТА</div>
          <div className={styles.tempName}>
            {typer.hypData.name}{" "}
            <span className={styles.tempSub}>({typer.hypData.sub})</span>
          </div>
          <div className={styles.tempDescriptor}>{typer.hypData.descriptor}</div>
          <div className={styles.tempTags}>
            {typer.hypData.types.map((type) => (
              <Tag key={type} glow>
                {type}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {typer.hypData && confirmed === null && (
        <div className={styles.confirmBlock}>
          <div className={styles.confirmQuestion}>Это похоже на тебя?</div>
          <div className={styles.confirmButtons}>
            <button
              type="button"
              className={styles.confirmYes}
              onClick={() => handleConfirm(true)}
            >
              ДА
            </button>
            <button
              type="button"
              className={styles.confirmNo}
              onClick={() => handleConfirm(false)}
            >
              НЕТ
            </button>
          </div>
        </div>
      )}

      {confirmed !== null && (
        <div className={styles.confirmedRow}>
          <button
            type="button"
            className={styles.confirmedBadge}
            onClick={() => {
              typer.setTempConfirmed(null);
              typer.setShowOverride(false);
              if (confirmed === false) typer.setTempOverride(null);
            }}
          >
            {confirmed ? "✓ ДА" : "✗ НЕТ"} — изменить ответ
          </button>
        </div>
      )}

      {confirmed === false && (
        <div className={styles.override}>
          <div className={styles.overrideLabel}>
            Возможно, какой-то из этих темпераментов тебе больше подходит?
          </div>
          <div className={styles.overrideGrid}>
            {Object.entries(TEMPS).map(([key, temp]) => {
              const active = (typer.tempOverride ?? typer.hypKey) === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    typer.setTempOverride(key as TemperamentKey);
                  }}
                  className={`${styles.overrideButton} ${
                    active ? styles.overrideActive : ""
                  }`}
                >
                  <div className={styles.overrideDesc}>{temp.desc}</div>
                  <div className={styles.overrideName}>
                    {temp.name}{" "}
                    <span className={styles.overrideSub}>({temp.sub})</span>
                  </div>
                  <div className={styles.overrideDescriptor}>
                    {temp.descriptor}
                  </div>
                  <div className={styles.overrideTypes}>
                    {temp.types.join("  ")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {confirmed === true && mismatch && (
        <div className={styles.warning}>
          <div className={styles.warningTitle}>⚠ РАСХОЖДЕНИЕ ДАННЫХ</div>
          <p className={styles.warningText}>
            Не все твои ответы подходят для этого темпрерамента. Возможно, стоит пересмотреть гипотезу.
          </p>
          <button
            type="button"
            onClick={() => typer.setShowOverride((prev) => !prev)}
            className={styles.warningButton}
          >
            {typer.showOverride ? "− СКРЫТЬ" : "+ ИЗМЕНИТЬ ТЕМПЕРАМЕНТ"}
          </button>
        </div>
      )}

      {confirmed === true && typer.showOverride && (
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
                  <div className={styles.overrideName}>
                    {temp.name}{" "}
                    <span className={styles.overrideSub}>({temp.sub})</span>
                  </div>
                  <div className={styles.overrideDescriptor}>
                    {temp.descriptor}
                  </div>
                  <div className={styles.overrideTypes}>
                    {temp.types.join("  ")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {typer.tempOverride && (
        <div className={`${styles.tempCard} ${styles.tempCardOverride}`}>
          <div className={styles.tempLabel}>СКОРРЕКТИРОВАННЫЙ ТЕМПЕРАМЕНТ</div>
          <div className={styles.tempName}>
            {typer.activeTemp!.name}{" "}
            <span className={styles.tempSub}>({typer.activeTemp!.sub})</span>
          </div>
          <div className={styles.tempDescriptor}>
            {typer.activeTemp!.descriptor}
          </div>
          <div className={styles.tempTags}>
            {typer.activeTemp!.types.map((type) => (
              <Tag key={type} glow>
                {type}
              </Tag>
            ))}
          </div>
        </div>
      )}

      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={canNext}
        nextLabel="ЭТАП 2"
      />
    </div>
  );
}
