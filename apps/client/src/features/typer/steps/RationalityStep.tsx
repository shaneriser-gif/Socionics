import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import HintBox from "../../../ui/molecules/HintBox";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./RationalityStep.module.css";

type RationalityStepProps = {
  typer: TyperController;
};

export default function RationalityStep({ typer }: RationalityStepProps) {
  return (
    <div>
      <Eyebrow>Этап 1 · Признак 1 · Нальность</Eyebrow>
      <Heading>Иррациональность / Рациональность</Heading>
      <p className={common.lead}>
        Что первично для психики: заранее принятое решение и план — или
        непосредственное восприятие поступающей ситуации?
      </p>
      <QuestionCard>
        «Как вы <strong className={styles.emphasis}>любите</strong> действовать —
        по плану или по ситуации?»
      </QuestionCard>
      <AnswerOption
        label="По плану"
        desc="Предпочитает заранее составленный план или сформированное мнение. Сбой плана — досадное происшествие, требует сознательной перестройки."
        who="→ РАЦИОНАЛ"
        onClick={() => typer.setAnswer("rationality", "rational")}
        selected={typer.answers.rationality === "rational"}
      />
      <AnswerOption
        label="По ситуации  /  И так, и так"
        desc="Ориентируется на поток информации и изменяющиеся обстоятельства. Смена ситуации — естественное продолжение, без тревоги."
        who="→ ИРРАЦИОНАЛ"
        onClick={() => typer.setAnswer("rationality", "irrational")}
        selected={typer.answers.rationality === "irrational"}
      />
      <HintBox title="Уточняющие вопросы">
        <div className={styles.hintList}>
          {[
            [
              "Часто ли получается действовать по задуманному?",
              "Рационал чаще реализует планы; иррационал гибко перестраивает.",
            ],
            [
              "Испытываете дискомфорт, когда планы меняются на лету?",
              "Дискомфорт / раздражение → рационал. Азарт / спокойствие → иррационал.",
            ],
            [
              "Удобно ли выйти из дома без чёткого плана на день?",
              "Рационал тревожится о бесцельности. Иррационал чувствует свободу.",
            ],
            [
              "Легко адаптируетесь, но предпочитаете иметь изначальные заготовки?",
              "«Спокойнее с каркасом» → рационал. «Заготовки для надёжности» → иррационал.",
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
        <div className={styles.warnList}>
          <div>
            <span className={styles.warn}>ИЭИ, ИЛИ</span> — иррационалы с
            базовой интуицией, любят обдумывать сценарии и могут казаться
            «плановиками». Уточни: план реализуется или гибко перестраивается?
          </div>
          <div>
            <span className={styles.warn}>ЛИЭ (Джек), ЭИЭ (Гамлет)</span> —
            рационалы с сильной БИ, могут считать себя «ситуативными». Вопрос
            про дискомфорт при сломе плана — ключевой.
          </div>
          <div>
            <span className={styles.warn}>СЛЭ (Жуков), СЭЭ (Наполеон)</span> —
            иррационалы, воспринимают цель как «план». Уточни: жёсткий пошаговый
            план или цель с гибкими методами?
          </div>
        </div>
      </HintBox>
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.rationality}
      />
    </div>
  );
}
