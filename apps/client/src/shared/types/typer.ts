export type Rationality = "rational" | "irrational";
export type Extraversion = "extrovert" | "introvert";
export type Tality = "static" | "dynamic";
export type Positivism = "positive" | "negative";
export type Process = "process" | "result";

export type TemperamentId = "flexible" | "adaptive" | "linear" | "stable";
export type TemperamentKey =
  | "irrational+extrovert"
  | "irrational+introvert"
  | "rational+extrovert"
  | "rational+introvert";

export type FunctionCode =
  | "ЧИ"
  | "ЧС"
  | "БЛ"
  | "БЭ"
  | "БС"
  | "БИ"
  | "ЧЭ"
  | "ЧЛ";

export type TypeCode =
  | "ИЛЭ"
  | "СЛЭ"
  | "СЭЭ"
  | "ИЭЭ"
  | "СЭИ"
  | "ИЭИ"
  | "ИЛИ"
  | "СЛИ"
  | "ЭСЭ"
  | "ЭИЭ"
  | "ЛИЭ"
  | "ЛСЭ"
  | "ЛИИ"
  | "ЛСИ"
  | "ЭСИ"
  | "ЭИИ";

export type PositivityMark = "+" | "-";
export type ProcessMark = "пц" | "рз";

export type AnswerState = {
  rationality: Rationality | null;
  extraversion: Extraversion | null;
  statics: Tality | null;
  positivism: Positivism | null;
  process: Process | null;
  base: FunctionCode | null;
  creative: FunctionCode | null;
};

export type Temperament = {
  id: TemperamentId;
  name: string;
  sub: string;
  desc: string;
  tality: Tality;
  types: TypeCode[];
  posProc: Partial<Record<TypeCode, [PositivityMark, ProcessMark]>>;
};

export type BranchOption = {
  v: FunctionCode;
  label: string;
  desc: string;
  who: string;
};

export type Branch = {
  q: string;
  opts: BranchOption[];
};

export type TypeResult = {
  c: TypeCode;
  n: string;
};

export type TypeInfo = {
  slug: string;
  quadra: string;
  formula: string;
  subtitle: string;
  desc: string;
  main: string;
  tool: string;
};
