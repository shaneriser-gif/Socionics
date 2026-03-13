import type { Temperament, TemperamentKey } from "../../../shared/types/typer";

export const TEMPS: Record<TemperamentKey, Temperament> = {
  "irrational+extrovert": {
    id: "flexible",
    name: "Гибко-разворотливые",
    sub: "Сангвиники",
    desc: "Экстраверты · Иррационалы",
    tality: "static",
    types: ["ИЛЭ", "СЛЭ", "СЭЭ", "ИЭЭ"],
    posProc: {
      ИЛЭ: ["+", "пц"],
      СЛЭ: ["-", "рз"],
      СЭЭ: ["+", "пц"],
      ИЭЭ: ["-", "рз"],
    },
  },
  "irrational+introvert": {
    id: "adaptive",
    name: "Восприимчиво-адаптивные",
    sub: "Меланхолики",
    desc: "Интроверты · Иррационалы",
    tality: "dynamic",
    types: ["СЭИ", "ИЭИ", "ИЛИ", "СЛИ"],
    posProc: {
      СЭИ: ["-", "пц"],
      ИЭИ: ["+", "рз"],
      ИЛИ: ["-", "пц"],
      СЛИ: ["+", "рз"],
    },
  },
  "rational+extrovert": {
    id: "linear",
    name: "Линейно-напористые",
    sub: "Холерики",
    desc: "Экстраверты · Рационалы",
    tality: "dynamic",
    types: ["ЭСЭ", "ЭИЭ", "ЛИЭ", "ЛСЭ"],
    posProc: {
      ЭСЭ: ["+", "рз"],
      ЭИЭ: ["-", "пц"],
      ЛИЭ: ["+", "рз"],
      ЛСЭ: ["-", "пц"],
    },
  },
  "rational+introvert": {
    id: "stable",
    name: "Уравновешенно-стабильные",
    sub: "Флегматики",
    desc: "Интроверты · Рационалы",
    tality: "static",
    types: ["ЛИИ", "ЛСИ", "ЭСИ", "ЭИИ"],
    posProc: {
      ЛИИ: ["-", "рз"],
      ЛСИ: ["+", "пц"],
      ЭСИ: ["-", "рз"],
      ЭИИ: ["+", "пц"],
    },
  },
};
