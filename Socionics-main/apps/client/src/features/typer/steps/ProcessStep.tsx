import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import HintBox from "../../../ui/molecules/HintBox";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./ProcessStep.module.css";

type ProcessStepProps = {
  typer: TyperController;
};

export default function ProcessStep({ typer }: ProcessStepProps) {
  return (
    <div>
      <Eyebrow>Этап 1 · Признак 5 · Процесс/Результат (перепроверка)</Eyebrow>
      <Heading>Ориентация деятельности</Heading>
      <p className={common.lead}>
        Результатер думает от конца к пути — «сделать и переключиться».
        Процессер думает о постепенном развитии и непрерывном потоке.
      </p>
      <QuestionCard>«Что для тебя важнее — процесс или результат?»</QuestionCard>
      <AnswerOption
        label="Результат — важен финиш"
        desc="Деятельность как набор завершённых задач. Важен чёткий момент окончания. Думает от результата назад к пути достижения."
        who="→ РЕЗУЛЬТАТЕР"
        onClick={() => typer.setAnswer("process", "result")}
        selected={typer.answers.process === "result"}
      />
      <AnswerOption
        label="Процесс — важно движение"
        desc="Деятельность как непрерывный поток развития. Важно движение вперёд без чёткой границы начала и конца."
        who="→ ПРОЦЕССЕР"
        onClick={() => typer.setAnswer("process", "process")}
        selected={typer.answers.process === "process"}
      />
      <HintBox title="⚠ Частые ловушки">
        <div className={styles.warnList}>
          <div>
            <span className={styles.warn}>СЭЭ (Наполеон)</span> — процессер, но
            часто отвечает «результат»: базовая ЧС фокусирована на завоевании
            цели.
          </div>
          <div>
            <span className={styles.warn}>ЛСЭ (Штирлиц)</span> — процессер, но
            часто отвечает «результат»: деловая логика ассоциируется с
            выполнением задачи.
          </div>
          <div className={styles.note}>
            Если гипотеза на них — их ответ «результат» подтверждает версию, а
            не опровергает.
          </div>
        </div>
      </HintBox>
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.process}
        nextLabel="К СИНТЕЗУ"
      />
    </div>
  );
}
