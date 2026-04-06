import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import HintBox from "../../../ui/molecules/HintBox";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./PositivismStep.module.css";

type PositivismStepProps = {
  typer: TyperController;
};

export default function PositivismStep({ typer }: PositivismStepProps) {
  return (
    <div>
      <Eyebrow>Этап 1 · Признак 4 · Позитивизм/Негативизм (перепроверка)</Eyebrow>
      <Heading>Фокус восприятия</Heading>
      <p className={common.lead}>
        Позитивист замечает то, что{" "}
        <em className={styles.emphasis}>присутствует</em>. Негативист замечает
        то, чего{" "}
        <em className={styles.emphasis}>не хватает</em> или что идёт не так.
      </p>
      <QuestionCard>
        «Ты замечаешь в первую очередь хорошее или плохое? То, что{" "}
        <strong className={styles.emphasis}>присутствует</strong>, или то, что{" "}
        <strong className={styles.emphasis}>отсутствует</strong>?»
      </QuestionCard>
      <AnswerOption
        label="Позитивист — замечает то, что есть"
        desc="Первым делом видит ресурсы, имеющееся, плюсы ситуации. Фокус на присутствующем."
        who="→ ПОЗИТИВИСТ"
        onClick={() => typer.setAnswer("positivism", "positive")}
        selected={typer.answers.positivism === "positive"}
        hintIndex={0}
        groupSelected={!!typer.answers.positivism}
      />
      <AnswerOption
        label="Негативист — замечает то, чего нет"
        desc="Первым делом видит несоответствия, риски, то чего не хватает. Фокус на отсутствующем и неправильном."
        who="→ НЕГАТИВИСТ"
        onClick={() => typer.setAnswer("positivism", "negative")}
        selected={typer.answers.positivism === "negative"}
        hintIndex={1}
        groupSelected={!!typer.answers.positivism}
      />
      <HintBox title="⚠ Бывают отклонения — читать обязательно">
        <div className={styles.warnList}>
          <div>
            <span className={styles.warn}>Психологическое состояние:</span>{" "}
            человек в депрессии ответит «замечаю плохое» вне зависимости от типа
            — игнорируй ответ.
          </div>
          <div>
            <span className={styles.warn}>Социальная желательность:</span>{" "}
            многие отвечают «хорошее», т.к. так принято. Неуверенный / заученный
            ответ — меньший вес.
          </div>
          <div className={styles.note}>
            Признак полезен когда ответ чёткий и подтверждает уже имеющуюся
            гипотезу. Иначе — можно не учитывать.
          </div>
        </div>
      </HintBox>
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.positivism}
      />
    </div>
  );
}
