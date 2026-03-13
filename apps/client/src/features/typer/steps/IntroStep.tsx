import Eyebrow from "../../../ui/atoms/Eyebrow";
import Heading from "../../../ui/atoms/Heading";
import NavBar from "../../../ui/molecules/NavBar";
import type { TyperController } from "../hooks/useTyperState";
import styles from "./IntroStep.module.css";
import common from "./StepCommon.module.css";

type IntroStepProps = {
  typer: TyperController;
};

export default function IntroStep({ typer }: IntroStepProps) {
  return (
    <div>
      <Eyebrow>Экспресс-методика · Соционика · Модель А</Eyebrow>
      <Heading size="lg">
        Типирование
        <br />
        <span className={styles.neon}>по Шанэри</span>
      </Heading>
      <p className={common.leadLarge}>
        Интерактивный алгоритм сессии. Нажимай на ответы типируемого — система
        ведёт по шагам и отслеживает гипотезы в реальном времени.
      </p>

      <div className={styles.instructionCard}>
        <div className={styles.instructionLabel}>ИНСТРУКЦИЯ ДЛЯ ТИПИРУЕМОГО</div>
        <p className={styles.instructionText}>
          «Я буду задавать абстрактные вопросы. В жизни мы все умеем действовать
          и так, и этак. Важно отвечать, как вам{" "}
          <em className={styles.emphasis}>в общем</em> ближе, естественнее и
          приятнее — не как вы поступаете в конкретной ситуации или на работе.
          Если оба полюса свойственны — выбирайте тот, что был с вами с
          рождения.»
        </p>
      </div>

      <div className={common.gridTwo}>
        {[
          ["01", "Темперамент", "5 признаков Рейнина"],
          ["02", "Тип", "Базовая + Творческая"],
        ].map(([n, t, s]) => (
          <div key={n} className={common.card}>
            <div className={styles.stepLabel}>ЭТАП {n}</div>
            <div className={styles.stepTitle}>{t}</div>
            <div className={styles.stepDesc}>{s}</div>
          </div>
        ))}
      </div>

      <NavBar
        step={typer.step}
        total={typer.stepCount}
        onPrev={typer.goPrev}
        onNext={typer.goNext}
        canNext
        nextLabel="НАЧАТЬ"
      />
    </div>
  );
}
