import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import Tag from "../../../ui/atoms/Tag";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./BaseStep.module.css";

type BaseStepProps = {
  typer: TyperController;
};

export default function BaseStep({ typer }: BaseStepProps) {
  if (!typer.activeTemp) {
    return <div className={styles.empty}>Сначала определите темперамент.</div>;
  }

  const bd = typer.branches[typer.activeTemp.id].base;

  return (
    <div>
      <Eyebrow>Этап 2 · Блок ЭГО · Базовая функция</Eyebrow>
      <Heading>Что для тебя главное?</Heading>
      <p className={common.lead}>
        Базовая — фундаментальная призма, через которую человек смотрит на мир.
        Самое важное и центральное.
      </p>
      <div className={styles.metaBar}>
        <span className={styles.metaLabel}>Темперамент:</span>
        <Tag>{typer.activeTemp.name}</Tag>
        <span className={styles.metaHint}>
          Базовая может быть:{" "}
          <span className={styles.metaCodes}>
            {bd.opts.map((opt) => opt.v).join(" или ")}
          </span>
        </span>
      </div>
      <QuestionCard>{bd.q}</QuestionCard>
      {bd.opts.map((opt) => (
        <AnswerOption
          key={opt.v}
          label={
            <>
              <span className={styles.func}>{opt.v}</span> {opt.label}
            </>
          }
          desc={opt.desc}
          who={opt.who}
          onClick={() => typer.setAnswer("base", opt.v)}
          selected={typer.answers.base === opt.v}
        />
      ))}
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.base}
      />
    </div>
  );
}
