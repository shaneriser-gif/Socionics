import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import Tag from "../../../ui/atoms/Tag";
import AnswerOption from "../../../ui/molecules/AnswerOption";
import NavBar from "../../../ui/molecules/NavBar";
import QuestionCard from "../../../ui/molecules/QuestionCard";
import type { TyperController } from "../hooks/useTyperState";
import common from "./StepCommon.module.css";
import styles from "./CreativeStep.module.css";

type CreativeStepProps = {
  typer: TyperController;
};

export default function CreativeStep({ typer }: CreativeStepProps) {
  if (!typer.activeTemp) {
    return <div className={styles.empty}>Сначала определите темперамент.</div>;
  }

  const bd = typer.branches[typer.activeTemp.id].creative;

  return (
    <div>
      <Eyebrow>Этап 2 · Блок ЭГО · Творческая функция</Eyebrow>
      <Heading>О чём тебе интересно думать?</Heading>
      <p className={common.lead}>
        Творческая — инструмент, через который человек проявляет себя, решает
        задачи и взаимодействует с миром.
      </p>
      <div className={styles.metaBar}>
        <span className={styles.metaLabel}>Базовая:</span>
        <Tag glow>{typer.answers.base}</Tag>
        <span className={styles.metaLabel}>Творческая:</span>
        <span className={styles.metaCodes}>
          {bd.opts.map((opt) => opt.v).join(" / ")}
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
          onClick={() => typer.setAnswer("creative", opt.v)}
          selected={typer.answers.creative === opt.v}
        />
      ))}
      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext={!!typer.answers.creative}
        nextLabel="РЕЗУЛЬТАТ"
      />
    </div>
  );
}
