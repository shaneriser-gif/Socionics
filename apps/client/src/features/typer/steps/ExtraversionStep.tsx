import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import Divider from "../../../ui/atoms/Divider";
import Tag from "../../../ui/atoms/Tag";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import HintBox from "../../../ui/molecules/HintBox";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./ExtraversionStep.module.css";

type ExtraversionStepProps = {
  typer: TyperController;
};

export default function ExtraversionStep({ typer }: ExtraversionStepProps) {
  return (
    <div>
      <Eyebrow>Этап 1 · Признак 2 · Вертность</Eyebrow>
      <Heading>Экстраверсия / Интроверсия</Heading>
      <p className={common.lead}>
        В соционике — не про общительность, а про{" "}
        <em className={styles.emphasis}>направление внимания</em>: вширь на
        объекты или вглубь на связи.
      </p>
      <QuestionCard>
        «Твоё внимание направлено{" "}
        <strong className={styles.emphasis}>
          экстенсивно вширь — важно количество
        </strong>
        , или{" "}
        <strong className={styles.emphasis}>
          интенсивно вглубь — важно качество
        </strong>
        ?»
      </QuestionCard>
      <AnswerOption
        label="Экстраверт — вширь и наружу"
        desc="Фокус на объектах и их внешних характеристиках. Широкий круг контактов, энергия от общения. Важен охват и влияние."
        who="→ ЭКСТРАВЕРТ"
        onClick={() => typer.setAnswer("extraversion", "extrovert")}
        selected={typer.answers.extraversion === "extrovert"}
      />
      <AnswerOption
        label="Интроверт — вглубь и внутрь"
        desc="Фокус на отношениях и связях между объектами, внутренних характеристиках. Узкий круг близких, нужно время наедине."
        who="→ ИНТРОВЕРТ"
        onClick={() => typer.setAnswer("extraversion", "introvert")}
        selected={typer.answers.extraversion === "introvert"}
      />
      <HintBox title="Уточняющие вопросы">
        <div className={styles.hintList}>
          {[
            [
              "Любишь ли быть в центре внимания? Насколько это легко?",
              "Экстраверт: привычно. Интроверт: работа / стресс, даже если умеет.",
            ],
            [
              "Много ли друзей и знакомых?",
              "Экстраверт — широкий круг. Интроверт — узкий круг близких.",
            ],
            [
              "Насколько важно разделение на близких и далёких?",
              "У интроверта это составляет саму суть социального мира.",
            ],
            [
              "Насколько большие компании заряжают или утомляют?",
              "Экстраверт заряжается, от одиночества «тухнет». Интроверт наоборот.",
            ],
          ].map(([q, a]) => (
            <div key={q}>
              <div className={styles.hintTitle}>— {q}</div>
              <div className={styles.hintDesc}>{a}</div>
            </div>
          ))}
        </div>
      </HintBox>
      <HintBox title="⚠ Частые ловушки">
        <div>
          <span className={styles.warn}>ЭИЭ (Гамлет)</span> — яркий экстраверт,
          может считать себя интровертом из-за глубокого погружения во
          внутренний мир (творческая БИ).
        </div>
      </HintBox>
      {typer.answers.rationality && typer.answers.extraversion ? (
        <>
          <Divider />
          <div className={common.inlineRow}>
            <span className={styles.hypoLabel}>Первичная гипотеза:</span>
            <Tag glow>{typer.hypData?.name}</Tag>
          </div>
        </>
      ) : null}
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.extraversion}
      />
    </div>
  );
}
