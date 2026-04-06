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
      <Eyebrow>Экспресс-методика · Темперамент · Модель А</Eyebrow>
      <Heading size="lg">
        Типирование
        <br />
        <span className={styles.neon}>по Шанэри</span>
      </Heading>
      <p className={common.leadLarge}>
        Это тест на определение соционического типа. Он построен по моей авторской методике, где мы сначала определяем "темперамент", а потом 2 главные фунцкии в типе. Тест можно использовать как для себя, так и в качестве подсказки для начинающего типировщика.
      </p>

      <div className={styles.videoCard}>
        <div className={styles.videoLabel}>ПОСМОТРЕТЬ ВИДЕО ИНСТРУКЦИЮ</div>
        <div className={styles.videoButtons}>
          <a
            href="https://vkvideo.ru/video-113543027_456239045"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoBtn}
          >
            VK Видео
          </a>
          <a
            href="https://youtu.be/vT3yUFnUocE"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.videoBtn}
          >
            YouTube
          </a>
        </div>
      </div>

      <div className={styles.instructionCard}>
        <div className={styles.instructionLabel}>ИНСТРУКЦИЯ</div>
        <p className={styles.instructionText}>
          «Я буду задавать абстрактные вопросы с двумя вариантами ответа. В жизни мы все умеем действовать
          и так, и этак. Важно отвечать, как вам{" "}
          <em className={styles.emphasis}>в общем</em> ближе, естественнее и
          приятнее — а не как вы поступаете в конкретной ситуации или на работе.
          Если оба варианта вам свойственны — выбирайте тот, что был с вами с
          рождения, а не выработанный с возрастом.»
        </p>
      </div>

      <div className={common.gridTwo}>
        {[
          ["01", "Темперамент", "3 ( + 2 проверочных) признака Рейнина"],
          ["02", "Тип", "Базовая + Творческая функции"],
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
