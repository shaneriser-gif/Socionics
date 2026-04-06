import type { ComponentType } from "react";
import type { StepId } from "../features/typer/data/steps";
import { useTyperState } from "../features/typer/hooks/useTyperState";
import BaseStep from "../features/typer/steps/BaseStep";
import CreativeStep from "../features/typer/steps/CreativeStep";
import ExtraversionStep from "../features/typer/steps/ExtraversionStep";
import HypothesisStep from "../features/typer/steps/HypothesisStep";
import IntroStep from "../features/typer/steps/IntroStep";
import PositivismStep from "../features/typer/steps/PositivismStep";
import ProcessStep from "../features/typer/steps/ProcessStep";
import RationalityStep from "../features/typer/steps/RationalityStep";
import ResultStep from "../features/typer/steps/ResultStep";
import StaticsStep from "../features/typer/steps/StaticsStep";
import SynthesisStep from "../features/typer/steps/SynthesisStep";
import ProgressBar from "../ui/molecules/ProgressBar";
import SidebarSummary from "../ui/organisms/SidebarSummary";
import Footer from "../ui/organisms/Footer";
import TopNav from "../ui/organisms/TopNav";
import styles from "./SocionicsTyperPage.module.css";

const stepComponents: Record<
  StepId,
  ComponentType<{ typer: ReturnType<typeof useTyperState> }>
> = {
  intro: IntroStep,
  rationality: RationalityStep,
  extraversion: ExtraversionStep,
  hypothesis: HypothesisStep,
  statics: StaticsStep,
  positivism: PositivismStep,
  process: ProcessStep,
  synthesis: SynthesisStep,
  base: BaseStep,
  creative: CreativeStep,
  result: ResultStep,
};

export default function SocionicsTyperPage() {
  const typer = useTyperState();
  const StepComponent = stepComponents[typer.stepId];

  const sectionLabel = "";

  return (
    <div className={styles.page}>
      <TopNav
        step={typer.step}
        stepCount={typer.stepCount}
        sectionLabel={sectionLabel}
        onReset={typer.reset}
      />
      <ProgressBar value={typer.step / (typer.stepCount - 1)} />
      <div className={styles.layout}>
        <main className={styles.main}>
          <StepComponent typer={typer} />
        </main>
        <aside className={styles.sidebar}>
          <SidebarSummary
            labels={typer.labels}
            answers={typer.answers}
            activeTemp={typer.activeTemp}
            tempOverride={typer.tempOverride}
            finalType={typer.finalType}
            talMatch={typer.talMatch}
            ppCheck={typer.ppCheck}
            typePosFail={typer.typePosFail}
            typeProcFail={typer.typeProcFail}
          />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
