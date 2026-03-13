import { useState } from "react";
import { BRANCHES } from "../data/branches";
import { STEPS } from "../data/steps";
import type { StepId } from "../data/steps";
import { TEMPS } from "../data/temps";
import { TYPE_INFO } from "../data/typeInfo";
import { TYPE_RESULTS } from "../data/typeResults";
import type {
  AnswerState,
  PositivityMark,
  ProcessMark,
  TemperamentKey,
} from "../../../shared/types/typer";

const initialAnswers: AnswerState = {
  rationality: null,
  extraversion: null,
  statics: null,
  positivism: null,
  process: null,
  base: null,
  creative: null,
};

export function useTyperState() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>(initialAnswers);
  const [tempOverride, setTempOverride] = useState<TemperamentKey | null>(null);
  const [showOverride, setShowOverride] = useState(false);

  const stepId: StepId = STEPS[step];
  const hypKey =
    answers.rationality && answers.extraversion
      ? (`${answers.rationality}+${answers.extraversion}` as TemperamentKey)
      : null;
  const hypData = hypKey ? TEMPS[hypKey] : null;
  const activeTempKey = tempOverride ?? hypKey;
  const activeTemp = activeTempKey ? TEMPS[activeTempKey] : null;

  const talMatch =
    hypData && answers.statics ? answers.statics === hypData.tality : null;
  const posVal: PositivityMark | null =
    answers.positivism === "positive"
      ? "+"
      : answers.positivism === "negative"
      ? "-"
      : null;
  const procVal: ProcessMark | null =
    answers.process === "process"
      ? "пц"
      : answers.process === "result"
      ? "рз"
      : null;

  const ppMatchingTemps =
    posVal && procVal
      ? Object.entries(TEMPS)
          .filter(([, temp]) =>
            temp.types.some((type) => {
              const entry = temp.posProc[type];
              if (!entry) return false;
              const [p, pr] = entry;
              return p === posVal && pr === procVal;
            }),
          )
          .map(([key]) => key)
      : [];
  const ppCheck: "ok" | "fail" | null =
    hypKey && ppMatchingTemps.length > 0
      ? ppMatchingTemps.includes(hypKey)
        ? "ok"
        : "fail"
      : null;

  const finalType =
    activeTemp && answers.base && answers.creative
      ? TYPE_RESULTS[activeTemp.id]?.[`${answers.base}+${answers.creative}`] ??
        null
      : null;
  const typeInfo = finalType ? TYPE_INFO[finalType.c] : null;

  const labels = {
    rationalLabel:
      answers.rationality === "rational"
        ? "Рационал"
        : answers.rationality === "irrational"
        ? "Иррационал"
        : null,
    extroLabel:
      answers.extraversion === "extrovert"
        ? "Экстраверт"
        : answers.extraversion === "introvert"
        ? "Интроверт"
        : null,
    staticsLabel:
      answers.statics === "static"
        ? "Статик"
        : answers.statics === "dynamic"
        ? "Динамик"
        : null,
    posLabel:
      answers.positivism === "positive"
        ? "Позитивист +"
        : answers.positivism === "negative"
        ? "Негативист −"
        : null,
    procLabel:
      answers.process === "process"
        ? "Процессер пц"
        : answers.process === "result"
        ? "Результатер рз"
        : null,
  };

  const setAnswer = <K extends keyof AnswerState>(
    key: K,
    value: AnswerState[K],
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const goPrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const reset = () => {
    setStep(0);
    setAnswers(initialAnswers);
    setTempOverride(null);
    setShowOverride(false);
  };

  return {
    step,
    stepId,
    stepCount: STEPS.length,
    answers,
    setAnswer,
    tempOverride,
    setTempOverride,
    showOverride,
    setShowOverride,
    goNext,
    goPrev,
    reset,
    hypKey,
    hypData,
    activeTemp,
    activeTempKey,
    talMatch,
    ppCheck,
    finalType,
    typeInfo,
    labels,
    branches: BRANCHES,
  };
}

export type TyperController = ReturnType<typeof useTyperState>;
