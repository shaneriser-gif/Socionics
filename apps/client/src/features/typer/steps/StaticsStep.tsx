import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import Divider from "../../../ui/atoms/Divider";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import HintBox from "../../../ui/molecules/HintBox";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./StaticsStep.module.css";

type StaticsStepProps = {
  typer: TyperController;
};

export default function StaticsStep({ typer }: StaticsStepProps) {
  return (
    <div>
      <Eyebrow>Этап 1 · Признак 3 · Тальность (перепроверка)</Eyebrow>
      <Heading>Статика / Динамика</Heading>
      <p className={common.lead}>
        Статики воспринимают мир как серию отдельных кадров-снимков. Динамики —
        как непрерывный поток, фильм.
      </p>
      <QuestionCard>
        «Представь шкатулку. Опиши, что представилось?»
        <br />
        <span className={styles.subtle}>Ничего не подсказывай — просто слушай.</span>
      </QuestionCard>
      <AnswerOption
        label="Статика — как фото"
        desc="Описание неподвижного объекта и свойств: «деревянная, тёмная, резная крышка, пыль, медный замочек». Срез, снимок."
        who="→ СТАТИК"
        onClick={() => typer.setAnswer("statics", "static")}
        selected={typer.answers.statics === "static"}
      />
      <AnswerOption
        label="Динамика — как видео"
        desc="Описание процесса и движения: «шкатулка открывается, льётся свет, играет музыка, балерина вращается». Поток."
        who="→ ДИНАМИК"
        onClick={() => typer.setAnswer("statics", "dynamic")}
        selected={typer.answers.statics === "dynamic"}
      />
      <HintBox title="Уточняющие вопросы">
        <div className={styles.hintList}>
          <div className={styles.hintTitle}>Если фото:</div>
          <div className={styles.hintDesc}>
            «Может, шкатулка стояла, но камера плавно двигалась вокруг?» —
            движение наблюдателя = динамика.
          </div>
          <div className={styles.hintTitle}>Если видео:</div>
          <div className={styles.hintDesc}>
            «Может, было похоже на медленное слайд-шоу?» — серия статичных
            кадров = статика.
          </div>
          <Divider />
          <div className={styles.hintNote}>
            Бонус: много конкретных деталей → сенсорика. Размытые абстракции →
            интуиция.
          </div>
        </div>
      </HintBox>
      {typer.hypData && typer.answers.statics ? (
        <div
          className={styles.match}
          data-status={typer.talMatch === true ? "ok" : "fail"}
        >
          <span className={styles.matchDot} />
          <span className={styles.matchText}>
            {typer.talMatch
              ? "СОВПАДАЕТ С ГИПОТЕЗОЙ"
              : `ПРОТИВОРЕЧИТ ГИПОТЕЗЕ — ожидалось: ${
                  typer.hypData.tality === "static" ? "СТАТИК" : "ДИНАМИК"
                }`}
          </span>
        </div>
      ) : null}
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.statics}
      />
    </div>
  );
}
