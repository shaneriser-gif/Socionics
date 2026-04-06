import Divider from "../../../ui/atoms/Divider";
import type { TyperController } from "../hooks/useTyperState";
import styles from "./ResultStep.module.css";

type ResultStepProps = {
  typer: TyperController;
};

export default function ResultStep({ typer }: ResultStepProps) {
  const { finalType, typeInfo, activeTemp, labels } = typer;

  if (!finalType || !typeInfo) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>◇</div>
        Вернитесь и выберите базовую и творческую функции
      </div>
    );
  }

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroLabel}>СОЦИОНИЧЕСКИЙ ТИП</div>
        <div className={styles.heroCode}>{finalType.c}</div>
        <div className={styles.heroName}>{finalType.n}</div>
        {activeTemp ? (
          <div className={styles.heroTemp}>
            {activeTemp.name} · {activeTemp.desc}
          </div>
        ) : null}
        <div className={styles.heroPill}>
          <span className={styles.heroFormula}>{typeInfo.formula}</span>
          <span className={styles.heroDivider}>·</span>
          <span className={styles.heroQuadra}>{typeInfo.quadra} квадра</span>
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <div className={styles.sectionLabel}>ОПИСАНИЕ ТИПА</div>
        <div className={styles.descriptionCard}>
          <div className={styles.descriptionTitle}>{typeInfo.subtitle}</div>
          <p className={styles.descriptionText}>{typeInfo.desc}</p>
        </div>
        <div className={styles.splitGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>ГЛАВНОЕ</div>
            <div className={styles.infoText}>{typeInfo.main}</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>ИНСТРУМЕНТ</div>
            <div className={styles.infoText}>{typeInfo.tool}</div>
          </div>
        </div>
      </div>

      <div className={styles.links}>
        <div>
          <div className={styles.linksLabel}>ПОДРОБНЕЕ О ТИПЕ</div>
          <div className={styles.linksText}>
            Полное описание, взаимодействия и рекомендации
          </div>
        </div>
        <div className={styles.linksButtons}>
          <a
            href={`https://shaneri.ru/${typeInfo.slug}`}
            target="_blank"
            rel="noreferrer"
            className={styles.primaryLink}
          >
            ОТКРЫТЬ →
          </a>
          <a
            href="https://new.shaneri.ru/socionic-typing#/start"
            target="_blank"
            rel="noreferrer"
            className={styles.secondaryLink}
          >
            ПРОЙТИ ИНТЕРВЬЮ →
          </a>
        </div>
      </div>

      <div className={styles.donate}>
        <div className={styles.donateLabel}>ОТБЛАГОДАРИТЬ АВТОРА</div>
        <a
          href="https://www.tbank.ru/cf/1vvYpn4BBnZ"
          target="_blank"
          rel="noreferrer"
          className={styles.donateButton}
        >
          💝 Отправить донат →
        </a>
      </div>

      <div className={styles.egoGrid}>
        {[
          ["Базовая функция", typer.answers.base, "Главный фокус"],
          ["Творческая функция", typer.answers.creative, "Инструмент"],
        ].map(([label, value, desc]) => (
          <div key={label} className={styles.egoCard}>
            <div className={styles.egoLabel}>{label}</div>
            <div className={styles.egoValue}>{value}</div>
            <div className={styles.egoDesc}>{desc}</div>
          </div>
        ))}
      </div>

      <div className={styles.path}>
        <div className={styles.pathLabel}>СПИСОК ОТВЕТОВ</div>
        {[
          { label: "Нальность",        value: labels.rationalLabel,     fail: false },
          { label: "Вертность",         value: labels.extroLabel,        fail: false },
          { label: "Темперамент",       value: activeTemp?.name ?? null, fail: false },
          { label: "Тальность",         value: labels.staticsLabel,      fail: typer.talMatch === false },
          { label: "Позитивизм",        value: labels.posLabel,          fail: typer.typePosFail === true },
          { label: "Процесс/Результат", value: labels.procLabel,         fail: typer.typeProcFail === true },
          { label: "Базовая",           value: typer.answers.base,       fail: false },
          { label: "Творческая",        value: typer.answers.creative,   fail: false },
        ].map(({ label, value, fail }, index) => (
          <div
            key={label}
            className={styles.pathRow}
            data-alt={index % 2 === 1}
          >
            <span className={fail ? styles.pathNameFail : styles.pathName}>{label}</span>
            <span className={fail ? styles.pathValueFail : styles.pathValue}>{value ?? "—"}</span>
          </div>
        ))}
      </div>

      <button type="button" onClick={typer.reset} className={styles.reset}>
        ↺ НОВОЕ ТИПИРОВАНИЕ
      </button>
    </div>
  );
}
