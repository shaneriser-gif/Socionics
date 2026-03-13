import { useState } from "react";

// ════════════════════════════════════════════════════════════════════════════
//  📐 МАТ. ЧАСТЬ — ВСЁ РЕДАКТИРУЕМОЕ ЗДЕСЬ
// ════════════════════════════════════════════════════════════════════════════

const TEMPS = {
  "irrational+extrovert": {
    id: "flexible", name: "Гибко-разворотливые", sub: "Сангвиники",
    desc: "Экстраверты · Иррационалы", tality: "static",
    types: ["ИЛЭ", "СЛЭ", "СЭЭ", "ИЭЭ"],
    posProc: { ИЛЭ:["+","пц"], СЛЭ:["-","рз"], СЭЭ:["+","пц"], ИЭЭ:["-","рз"] },
  },
  "irrational+introvert": {
    id: "adaptive", name: "Восприимчиво-адаптивные", sub: "Меланхолики",
    desc: "Интроверты · Иррационалы", tality: "dynamic",
    types: ["СЭИ", "ИЭИ", "ИЛИ", "СЛИ"],
    posProc: { СЭИ:["-","пц"], ИЭИ:["+","рз"], ИЛИ:["-","пц"], СЛИ:["+","рз"] },
  },
  "rational+extrovert": {
    id: "linear", name: "Линейно-напористые", sub: "Холерики",
    desc: "Экстраверты · Рационалы", tality: "dynamic",
    types: ["ЭСЭ", "ЭИЭ", "ЛИЭ", "ЛСЭ"],
    posProc: { ЭСЭ:["+","рз"], ЭИЭ:["-","пц"], ЛИЭ:["+","рз"], ЛСЭ:["-","пц"] },
  },
  "rational+introvert": {
    id: "stable", name: "Уравновешенно-стабильные", sub: "Флегматики",
    desc: "Интроверты · Рационалы", tality: "static",
    types: ["ЛИИ", "ЛСИ", "ЭСИ", "ЭИИ"],
    posProc: { ЛИИ:["-","рз"], ЛСИ:["+","пц"], ЭСИ:["-","рз"], ЭИИ:["+","пц"] },
  },
};

const BRANCHES = {
  flexible: {
    base: {
      q: "Что для тебя самое главное в жизни и на что ты больше обращаешь внимание:",
      opts: [
        { v:"ЧИ", label:"Идеи и возможности", desc:"Понимание сути, абстрактность, многогранность — важно видеть скрытый потенциал и смотреть на мир с разных сторон", who:"→ ИЛЭ, ИЭЭ" },
        { v:"ЧС", label:"Воля и достижения", desc:"Цели, препятствия, куда приложить волю — важно чтобы замыслы воплощались, чувствуешь напор и силу преодоления", who:"→ СЛЭ, СЭЭ" },
      ],
    },
    creative: {
      q: "О чём тебе больше всего интересно думать и говорить:",
      opts: [
        { v:"БЛ", label:"Структуры, причины, логика", desc:"Как что устроено, логические законы, причины событий — часто объясняешь почему всё работает именно так", who:"→ ИЛЭ, СЛЭ" },
        { v:"БЭ", label:"Отношения и приоритеты людей", desc:"Кому что важно, мотивы, что хорошо и что плохо — помогаешь людям разобраться в ценностях и отношениях", who:"→ СЭЭ, ИЭЭ" },
      ],
    },
  },
  adaptive: {
    base: {
      q: "Что для тебя самое главное в жизни и на что ты больше обращаешь внимание:",
      opts: [
        { v:"БС", label:"Ощущения и комфорт", desc:"Потребности, телесный баланс, качество вещей — важно чтобы всё было приятно ощутимо и сделано на совесть", who:"→ СЭИ, СЛИ" },
        { v:"БИ", label:"Время и внутренние смыслы", desc:"Тенденции, прогнозы, развитие событий — важно иметь свободу во времени и понимать куда всё движётся", who:"→ ИЭИ, ИЛИ" },
      ],
    },
    creative: {
      q: "О чём тебе больше всего интересно думать и говорить:",
      opts: [
        { v:"ЧЭ", label:"Эмоции и настроения", desc:"Мотивации людей, их эмоциональные реакции, как влиять на атмосферу — знаешь как эмоционально зажечь или успокоить", who:"→ СЭИ, ИЭИ" },
        { v:"ЧЛ", label:"Действия и технологии", desc:"Методики, эффективность, как переделать подход — интересно оптимизировать и находить лучший способ делать дела", who:"→ ИЛИ, СЛИ" },
      ],
    },
  },
  linear: {
    base: {
      q: "Что для тебя самое главное в жизни и на что ты больше обращаешь внимание:",
      opts: [
        { v:"ЧЭ", label:"Эмоции и мотивация", desc:"Общая атмосфера, настроение людей — важно вдохновлять и зажигать, выражать чувства чтобы сдвинуть людей с места", who:"→ ЭСЭ, ЭИЭ" },
        { v:"ЧЛ", label:"Действия и эффективность", desc:"Кто что делает и как, предприимчивость, организованность — важна методика, практическая польза и результат работы", who:"→ ЛИЭ, ЛСЭ" },
      ],
    },
    creative: {
      q: "О чём тебе больше всего интересно думать и говорить:",
      opts: [
        { v:"БС", label:"Потребности и ощущения", desc:"Качество и красота объектов, насколько что-то комфортно, вкусно или приятно — ценишь и разбираешься в материальном", who:"→ ЭСЭ, ЛСЭ" },
        { v:"БИ", label:"Время и тенденции", desc:"Как всё было и куда идёт, что перспективно, внутренние смыслы — любишь прогнозировать и понимать скрытые процессы", who:"→ ЭИЭ, ЛИЭ" },
      ],
    },
  },
  stable: {
    base: {
      q: "Что для тебя самое главное в жизни и на что ты больше обращаешь внимание:",
      opts: [
        { v:"БЛ", label:"Структура, порядок, принципы", desc:"Как всё устроено, причинно-следственные связи, логическая правильность — важно чтобы всё было систематично и обоснованно", who:"→ ЛИИ, ЛСИ" },
        { v:"БЭ", label:"Отношения и моральные качества", desc:"Приоритеты людей, чтобы близким было хорошо, ответственное отношение — важна нравственная сторона жизни", who:"→ ЭСИ, ЭИИ" },
      ],
    },
    creative: {
      q: "О чём тебе больше всего интересно думать и говорить:",
      opts: [
        { v:"ЧИ", label:"Абстрактные идеи и возможности", desc:"Посмотреть на ситуацию с разных сторон, увидеть суть и общую картину — интересно находить возможности и нестандартные решения", who:"→ ЛИИ, ЭИИ" },
        { v:"ЧС", label:"Реальные цели и приложение воли", desc:"Препятствия на пути к цели, куда направить усилия — важно понимать реальную расстановку сил и добиваться своего", who:"→ ЛСИ, ЭСИ" },
      ],
    },
  },
};

const TYPE_RESULTS = {
  flexible: {
    "ЧИ+БЛ": { c:"ИЛЭ", n:"Дон Кихот" },
    "ЧИ+БЭ": { c:"ИЭЭ", n:"Гексли" },
    "ЧС+БЛ": { c:"СЛЭ", n:"Жуков" },
    "ЧС+БЭ": { c:"СЭЭ", n:"Наполеон" },
  },
  adaptive: {
    "БС+ЧЭ": { c:"СЭИ", n:"Дюма" },
    "БС+ЧЛ": { c:"СЛИ", n:"Габен" },
    "БИ+ЧЭ": { c:"ИЭИ", n:"Есенин" },
    "БИ+ЧЛ": { c:"ИЛИ", n:"Бальзак" },
  },
  linear: {
    "ЧЭ+БС": { c:"ЭСЭ", n:"Гюго" },
    "ЧЭ+БИ": { c:"ЭИЭ", n:"Гамлет" },
    "ЧЛ+БС": { c:"ЛСЭ", n:"Штирлиц" },
    "ЧЛ+БИ": { c:"ЛИЭ", n:"Джек Лондон" },
  },
  stable: {
    "БЛ+ЧИ": { c:"ЛИИ", n:"Робеспьер" },
    "БЛ+ЧС": { c:"ЛСИ", n:"Максим Горький" },
    "БЭ+ЧИ": { c:"ЭИИ", n:"Достоевский" },
    "БЭ+ЧС": { c:"ЭСИ", n:"Драйзер" },
  },
};

// ── ОПИСАНИЯ ТИПОВ ─────────────────────────────────────────────────────────
const TYPE_INFO = {
  ИЛЭ: { slug:"ile", quadra:"Альфа", formula:"ЧИ + БЛ", subtitle:"Понимание сути через структуру",
    desc:"Его разум настроен на поиск нового, уникального и нестандартного. Дон Кихот воспринимает мир как поле возможностей и скрытых потенциалов. Чтобы разобраться в хаосе идей, он использует логическое мышление: ищет причины, перестраивает конструкции и любит объяснять свои идеи.",
    main:"Инсайт, познание и генерация идей.", tool:"Логическое обоснование и классификация." },
  СЭИ: { slug:"sei", quadra:"Альфа", formula:"БС + ЧЭ", subtitle:"Баланс ощущений через эмоции",
    desc:"Воспринимает мир через призму ощущений, комфорта и эстетики. Для Дюма первично физическое удовольствие, отсутствие боли и удобство быта. Чтобы обеспечить этот комфорт себе и близким, он творчески управляет эмоциями: создаёт тёплую атмосферу, сглаживает углы, шутит и дарит радость.",
    main:"Сенсорный уют и качество жизни.", tool:"Создание приятной эмоциональной среды." },
  ЭСЭ: { slug:"ese", quadra:"Альфа", formula:"ЧЭ + БС", subtitle:"Эмоциональный тонус через заботу",
    desc:"Гюго живёт в мире энергии, страсти и энтузиазма. Его цель — поддерживать высокий эмоциональный уровень и драйв в окружающем пространстве. Для реализации этой бурной энергии он использует сенсорику: организует праздники, обеспечивает вкусную еду, заботится о физическом комфорте гостей и создаёт уютное пространство для общения.",
    main:"Яркие эмоции и воодушевление.", tool:"Деятельная забота и гостеприимство." },
  ЛИИ: { slug:"lii", quadra:"Альфа", formula:"БЛ + ЧИ", subtitle:"Изобретение систем на основе видения возможностей",
    desc:"Робеспьер видит мир как глобальную структуру, подчинённую объективным законам и принципам. Его цель — справедливость, порядок и ясность. Чтобы выстроить идеальную систему, он использует интуицию: перебирает варианты, отсекает лишнее, находит суть проблем и предлагает альтернативные решения для оптимизации структур.",
    main:"Логическая безупречность и истина.", tool:"Генерация вариантов и улучшений." },
  ЭИЭ: { slug:"eie", quadra:"Бета", formula:"ЧЭ + БИ", subtitle:"Идеология через внутреннюю глубину",
    desc:"Фокус внимания Гамлета направлен на эмоциональный фон, энергетику людей и глобальные социальные процессы. Гамлет — идеолог, чья цель — эмоциональное влияние и воодушевление масс. Свой дар убеждения он реализует через интуитивное понимание времени и состояний: чувствует своевременность момента, улавливает тренды, предсказывает исход событий.",
    main:"Эмоциональное воздействие и идеология.", tool:"Прогнозирование и наполнение смыслом." },
  ЛСИ: { slug:"lsi", quadra:"Бета", formula:"БЛ + ЧС", subtitle:"Порядок через волю",
    desc:"Для Максима мир — это строгая иерархия, набор правил, структур и нормативов. Он стремится к ясности, стабильности и надёжности системы. Чтобы система работала, он применяет волю и внимательность к деталям: устанавливает дисциплину, контролирует исполнение, удерживает границы и при необходимости применяет силовое давление для наведения порядка.",
    main:"Структурная стабильность.", tool:"Воля и удержание позиций." },
  СЛЭ: { slug:"sle", quadra:"Бета", formula:"ЧС + БЛ", subtitle:"Достижение при помощи системы",
    desc:"Жуков воспринимает жизнь через призму целей, реальных фактов и возможности проявить волю. Для него важно наличие материальной опоры и масштаб реализации задуманного. Преодоление препятствий воспринимается как естественная часть процесса достижения результата. Для воплощения своих амбиций он выстраивает чёткую иерархию и организует людей в эффективную систему управления.",
    main:"Достижение целей и волевое влияние.", tool:"Организация и логический анализ." },
  ИЭИ: { slug:"iei", quadra:"Бета", formula:"БИ + ЧЭ", subtitle:"Внутренний смысл и свобода при помощи эмоций",
    desc:"Есенин фокусируется на течении времени, глубинных внутренних состояниях и потоке вдохновения. Он тонко чувствует смысл событий и изменения состояний. Чтобы направлять свой жизненный путь и мягко влиять на окружающий мир, он использует эмоции: создаёт необходимое настроение, вызывает отклик и симпатию, настраивая окружающих на нужный эмоциональный резонанс.",
    main:"Гармония внутреннего состояния и пути.", tool:"Эмоциональная подстройка и вдохновение." },
  ЛИЭ: { slug:"lie", quadra:"Гамма", formula:"ЧЛ + БИ", subtitle:"Эффективность при помощи трендов",
    desc:"Джек Лондон воспринимает мир через призму предприимчивости, пользы и организации деятельности. Он нацелен на результат, прибыль и высокую продуктивность. В этом ему помогает интуиция: он отлично чувствует актуальные тренды, умеет работать на опережение, задаёт высокий темп и действует, просчитывая риски и перспективы будущего.",
    main:"Продуктивная деятельность.", tool:"Скорость реакции и чувство момента." },
  ЭСИ: { slug:"esi", quadra:"Гамма", formula:"БЭ + ЧС", subtitle:"Сохранение близких при помощи воли",
    desc:"Драйзер смотрит на качество человеческих отношений, вопросы морали, ответственности и этических приоритетов. Он следит за тем, кто является «своим», а с кем следует держать дистанцию. Для защиты своих принципов и счастья важных ему людей он применяет волевые качества: проявляет стойкость, требовательность и твёрдо отстаивает безопасность своего круга.",
    main:"Нравственные приоритеты и отношения.", tool:"Волевая защита и твёрдость." },
  СЭЭ: { slug:"see", quadra:"Гамма", formula:"ЧС + БЭ", subtitle:"Влияние при помощи дипломатии",
    desc:"Наполеон видит мир как поле для экспансии, где важны статус, авторитет, престиж и достижение конкретных, ощутимых целей. Он стремится мобилизовать окружающих на свершения. Для реализации своих планов использует отношения: управляет психологической дистанцией, выстраивает сеть полезных связей, использует дипломатию и личное обаяние.",
    main:"Социальное лидерство и статус.", tool:"Управление отношениями и связями." },
  ИЛИ: { slug:"ili", quadra:"Гамма", formula:"БИ + ЧЛ", subtitle:"Осмысленный путь при помощи оптимизации",
    desc:"Внимание Бальзака направлено на развитие процессов во времени, понимание технологических процессов и возможных осечек. Он стремится избегать бессмысленности: оценивает целесообразность действий, оптимизирует процессы, отсекает лишние затраты и предлагает наиболее эффективные и своевременные технологические решения.",
    main:"Предвидение пути и смысла.", tool:"Технологичность и оптимизация." },
  ИЭЭ: { slug:"iee", quadra:"Дельта", formula:"ЧИ + БЭ", subtitle:"Возможности при помощи знакомств",
    desc:"Гексли воспринимает мир как глобальную сеть взаимосвязей людей. Он настроен на поиск новизны, уникальных возможностей и вариантов развития. Для реализации этих возможностей он использует дипломатию: выступает как коммуникатор и «серфер» человеческих сетей, быстро устанавливает контакт, считывает интересы собеседника и связывает нужных людей друг с другом.",
    main:"Возможности людей.", tool:"Коммуникабельность и нетворкинг." },
  СЛИ: { slug:"sli", quadra:"Дельта", formula:"БС + ЧЛ", subtitle:"Качество жизни благодаря мастерству",
    desc:"Габен фокусируется на физических ощущениях, гармонии с пространством и удобстве. Ему важно сохранять хорошее самочувствие и достойный уровень жизни. Для обеспечения этого состояния он оттачивает мастерство, доводит технологии до совершенства, выбирает самые функциональные методы и инструменты, чтобы получить качественный результат.",
    main:"Сенсорный комфорт и естественность.", tool:"Технологичность и отточенный навык." },
  ЛСЭ: { slug:"lse", quadra:"Дельта", formula:"ЧЛ + БС", subtitle:"Профессионализм при помощи качества",
    desc:"Штирлиц ориентирован на труд, факты и отлаженные технологии. Для него важна компетентность и реальная польза дела. Свою деятельность он совершенствует через сенсорику: стремится обеспечить высокий уровень жизни, создаёт комфортные условия для работы, следит за качеством исполнения, эстетикой и удобством создаваемого продукта.",
    main:"Качественная работа и эффективность.", tool:"Комфорт и добротность." },
  ЭИИ: { slug:"eii", quadra:"Дельта", formula:"БЭ + ЧИ", subtitle:"Гуманизм благодаря проницательности",
    desc:"Достоевский воспринимает мир как систему отношений, смотрит что кому важно, у кого какие приоритеты и ценности. Стремится к гармоничным отношениям и нравственности. В этом ему помогает интуиция: он видит внутренний потенциал человека, понимает скрытые мотивы и ищет возможности для личностного роста и примирения.",
    main:"Гармония отношений и ответственность.", tool:"Видение потенциала и понимание." },
};

// ════════════════════════════════════════════════════════════════════════════
//  🎨 ДИЗАЙН-ТОКЕНЫ
// ════════════════════════════════════════════════════════════════════════════
const C = {
  bg:"#06060b", bg1:"#0d0d18", bg2:"#11111e",
  line:"rgba(157,78,221,0.10)", lineBr:"rgba(157,78,221,0.20)",
  neon:"#9d4edd", neonDim:"rgba(157,78,221,0.30)", glow:"rgba(157,78,221,0.07)",
  textPri:"#ede8f5", textSec:"#7a6f8a", textDim:"#332d42",
  ok:"#22d3ee", fail:"#f43f5e", warn:"#e9a23b",
};
const glowBox = (color=C.neon,r=10) => ({ boxShadow:`0 0 ${r}px ${color}35, 0 0 ${r*2.5}px ${color}12` });
const mono = { fontFamily:"'Space Mono', monospace" };

// ════════════════════════════════════════════════════════════════════════════
//  🧩 UI КОМПОНЕНТЫ
// ════════════════════════════════════════════════════════════════════════════
const Eyebrow = ({children}) => (
  <div style={{...mono,fontSize:9,letterSpacing:"0.22em",color:C.neon,textTransform:"uppercase",marginBottom:10,opacity:0.65}}>{children}</div>
);
const Heading = ({children,size=22}) => (
  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:size,color:C.textPri,lineHeight:1.2,marginBottom:10}}>{children}</div>
);
const Tag = ({children,glow:useGlow}) => (
  <span style={{display:"inline-block",padding:"2px 9px",borderRadius:2,border:`1px solid ${C.neonDim}`,color:C.neon,...mono,fontSize:10,fontWeight:700,background:C.glow,...(useGlow?glowBox(C.neon,6):{})}}>
    {children}
  </span>
);
const Divider = () => (
  <div style={{height:1,background:`linear-gradient(90deg,transparent,${C.neon}25,transparent)`,margin:"20px 0"}}/>
);
const QuestionCard = ({children}) => (
  <div style={{borderLeft:`2px solid ${C.neon}`,borderTop:`1px solid ${C.lineBr}`,borderRight:`1px solid ${C.line}`,borderBottom:`1px solid ${C.line}`,borderRadius:"0 4px 4px 0",padding:"14px 18px",marginBottom:18,background:C.glow,...glowBox(C.neon,6)}}>
    <div style={{...mono,color:C.textDim,fontSize:9,letterSpacing:"0.15em",marginBottom:8}}>ВОПРОС</div>
    <div style={{color:C.textPri,fontSize:13,lineHeight:1.65,fontStyle:"italic"}}>{children}</div>
  </div>
);
const AnswerBtn = ({label,desc,who,onClick,selected}) => (
  <button onClick={onClick} style={{width:"100%",textAlign:"left",padding:"16px 20px",borderRadius:4,marginBottom:8,cursor:"pointer",outline:"none",border:selected?`1px solid ${C.neon}`:`1px solid ${C.line}`,background:selected?C.glow:"transparent",transition:"all 0.16s ease",position:"relative",overflow:"hidden",...(selected?glowBox(C.neon,14):{})}}>
    {selected&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:C.neon,...glowBox(C.neon,5)}}/>}
    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:selected?C.textPri:"#a898bc",fontSize:13,marginBottom:4}}>{label}</div>
    <div style={{color:C.textSec,fontSize:12,lineHeight:1.6}}>{desc}</div>
    {who&&<div style={{marginTop:7,color:selected?C.neon:C.textDim,fontSize:10,...mono}}>{who}</div>}
  </button>
);
const HintBox = ({title,children}) => {
  const [open,setOpen] = useState(false);
  return (
    <div style={{border:`1px solid ${C.line}`,borderRadius:4,marginTop:10,overflow:"hidden"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",padding:"9px 14px",textAlign:"left",background:"transparent",border:"none",cursor:"pointer",color:C.textSec,fontSize:11,display:"flex",justifyContent:"space-between",alignItems:"center",...mono}}>
        <span>↳ {title}</span><span style={{color:C.neon,opacity:0.5}}>{open?"−":"+"}</span>
      </button>
      {open&&<div style={{padding:"0 14px 12px",borderTop:`1px solid ${C.line}`}}><div style={{color:C.textSec,fontSize:11,lineHeight:1.75,paddingTop:10}}>{children}</div></div>}
    </div>
  );
};
const NavBar = ({step,total,onPrev,onNext,canNext,nextLabel="ДАЛЕЕ"}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,paddingTop:18,borderTop:`1px solid ${C.line}`}}>
    <button onClick={onPrev} disabled={step===0} style={{padding:"9px 18px",borderRadius:3,border:`1px solid ${step===0?C.textDim+"30":C.lineBr}`,background:"transparent",cursor:step===0?"not-allowed":"pointer",color:step===0?C.textDim:C.textSec,fontSize:10,...mono,letterSpacing:"0.1em"}}>← НАЗАД</button>
    <span style={{color:C.textDim,fontSize:9,...mono}}>{step+1} / {total}</span>
    <button onClick={onNext} disabled={!canNext} style={{padding:"9px 22px",borderRadius:3,border:`1px solid ${canNext?C.neon:C.textDim+"30"}`,background:canNext?C.glow:"transparent",cursor:canNext?"pointer":"not-allowed",color:canNext?C.neon:C.textDim,fontSize:10,fontWeight:700,...mono,letterSpacing:"0.12em",transition:"all 0.2s",...(canNext?glowBox(C.neon,8):{})}}>{nextLabel} →</button>
  </div>
);

// ── ЭКСПОРТ ────────────────────────────────────────────────────────────────
const ExportPanel = ({finalType,typeInfo,activeTemp,rationalLabel,extroLabel,staticsLabel,posLabel,procLabel,base,creative}) => {
  const [copied,setCopied] = useState(false);
  const text = [
    `СОЦИОНИЧЕСКИЙ ТИП: ${finalType.c} — ${finalType.n}`,
    `${typeInfo.formula} · ${typeInfo.subtitle}`,
    `Квадра: ${typeInfo.quadra} · ${activeTemp?.desc||""}`,
    ``,
    typeInfo.desc,
    ``,
    `Главное: ${typeInfo.main}`,
    `Инструмент: ${typeInfo.tool}`,
    ``,
    `─────────────────────────`,
    `Нальность:         ${rationalLabel||"—"}`,
    `Вертность:         ${extroLabel||"—"}`,
    `Темперамент:       ${activeTemp?.name||"—"}`,
    `Тальность:         ${staticsLabel||"—"}`,
    `Позитивизм:        ${posLabel||"—"}`,
    `Процесс/Результат: ${procLabel||"—"}`,
    `Базовая:           ${base||"—"}`,
    `Творческая:        ${creative||"—"}`,
    ``,
    `Подробнее: https://shaneri.ru/${typeInfo.slug}`,
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});
  };

  const handlePrint = () => {
    const w = window.open("","_blank");
    w.document.write(`<!DOCTYPE html><html><head><title>${finalType.c} — ${finalType.n}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Mono&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:'Space Mono',monospace;background:#06060b;color:#ede8f5;padding:48px;line-height:1.8;}
      .hero{margin-bottom:40px;}
      .code{font-size:72px;font-family:'Syne',sans-serif;font-weight:900;color:#9d4edd;line-height:1;margin-bottom:8px;}
      .name{font-size:24px;font-family:'Syne',sans-serif;font-weight:700;color:#ede8f5;margin-bottom:4px;}
      .meta{color:#7a6f8a;font-size:12px;margin-bottom:16px;}
      .pill{display:inline-block;padding:4px 12px;border:1px solid rgba(157,78,221,0.4);border-radius:2px;color:#9d4edd;font-size:11px;}
      .section{margin-top:32px;padding-top:24px;border-top:1px solid rgba(157,78,221,0.12);}
      .label{color:#332d42;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;}
      .subtitle{color:#9d4edd;font-size:14px;font-family:'Syne',sans-serif;font-weight:700;margin-bottom:8px;}
      .desc{color:#a898bc;font-size:13px;line-height:1.75;max-width:640px;}
      .kv{display:flex;gap:16px;margin-bottom:6px;}
      .kv-label{color:#332d42;font-size:11px;width:180px;flex-shrink:0;}
      .kv-value{color:#ede8f5;font-size:11px;}
      .highlight{color:#9d4edd;}
      .link{color:#9d4edd;font-size:13px;}
      @media print{
        body{background:#fff;color:#111;}
        .code,.highlight,.pill,.link{color:#6a0dad;}
        .meta,.kv-label{color:#888;}
        .desc{color:#444;}
      }
    </style></head><body>
    <div class="hero">
      <div class="code">${finalType.c}</div>
      <div class="name">${finalType.n}</div>
      <div class="meta">${typeInfo.quadra} квадра · ${activeTemp?.desc||""}</div>
      <div class="pill">${typeInfo.formula}</div>
    </div>
    <div class="section">
      <div class="label">Описание типа</div>
      <div class="subtitle">${typeInfo.subtitle}</div>
      <div class="desc">${typeInfo.desc}</div>
    </div>
    <div class="section">
      <div class="kv"><span class="kv-label">Главное</span><span class="kv-value highlight">${typeInfo.main}</span></div>
      <div class="kv"><span class="kv-label">Инструмент</span><span class="kv-value">${typeInfo.tool}</span></div>
    </div>
    <div class="section">
      <div class="label">Путь типирования</div>
      ${[["Нальность",rationalLabel],["Вертность",extroLabel],["Темперамент",activeTemp?.name],["Тальность",staticsLabel],["Позитивизм",posLabel],["Процесс/Результат",procLabel],["Базовая",base],["Творческая",creative]].map(([l,v])=>`<div class="kv"><span class="kv-label">${l}</span><span class="kv-value">${v||"—"}</span></div>`).join("")}
    </div>
    <div class="section">
      <div class="label">Подробнее</div>
      <a class="link" href="https://shaneri.ru/${typeInfo.slug}">shaneri.ru/${typeInfo.slug}</a>
    </div>
    </body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <div style={{border:`1px solid ${C.line}`,borderRadius:4,overflow:"hidden",marginBottom:20}}>
      <div style={{padding:"10px 18px",background:C.bg1,color:C.textDim,...mono,fontSize:9,letterSpacing:"0.12em"}}>ЭКСПОРТ РЕЗУЛЬТАТА</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <button onClick={handleCopy} style={{padding:"14px 18px",background:"transparent",border:"none",borderRight:`1px solid ${C.line}`,cursor:"pointer",color:copied?C.ok:C.textSec,fontSize:11,...mono,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"color 0.2s"}}>
          <span style={{fontSize:15}}>{copied?"✓":"⎘"}</span>{copied?"СКОПИРОВАНО":"КОПИРОВАТЬ ТЕКСТ"}
        </button>
        <button onClick={handlePrint} style={{padding:"14px 18px",background:"transparent",border:"none",cursor:"pointer",color:C.textSec,fontSize:11,...mono,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <span style={{fontSize:15}}>⎙</span>ПЕЧАТЬ / PDF
        </button>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  🏗 ГЛАВНЫЙ КОМПОНЕНТ
// ════════════════════════════════════════════════════════════════════════════
const STEPS = ["intro","rationality","extraversion","hypothesis","statics","positivism","process","synthesis","base","creative","result"];

export default function SocionicsTyper() {
  const [step,setStep] = useState(0);
  const [ans,setAns] = useState({rationality:null,extraversion:null,statics:null,positivism:null,process:null,base:null,creative:null});
  const [tempOverride,setTempOverride] = useState(null);
  const [showOverride,setShowOverride] = useState(false);

  const setA = (k,v) => setAns(p=>({...p,[k]:v}));
  const goNext = () => setStep(s=>Math.min(s+1,STEPS.length-1));
  const goPrev = () => setStep(s=>Math.max(s-1,0));
  const reset = () => {setStep(0);setAns({rationality:null,extraversion:null,statics:null,positivism:null,process:null,base:null,creative:null});setTempOverride(null);setShowOverride(false);};

  const stepId = STEPS[step];
  const hypKey = ans.rationality&&ans.extraversion?`${ans.rationality}+${ans.extraversion}`:null;
  const hypData = hypKey?TEMPS[hypKey]:null;
  const activeTempKey = tempOverride||hypKey;
  const activeTemp = activeTempKey?TEMPS[activeTempKey]:null;

  const talMatch = hypData&&ans.statics?ans.statics===hypData.tality:null;
  const posVal = ans.positivism==="positive"?"+":ans.positivism==="negative"?"-":null;
  const procVal = ans.process==="process"?"пц":ans.process==="result"?"рз":null;
  const ppMatchingTemps = posVal&&procVal
    ?Object.entries(TEMPS).filter(([,t])=>t.types.some(tp=>{const[p,pr]=t.posProc[tp];return p===posVal&&pr===procVal;})).map(([k])=>k)
    :[];
  const ppCheck = hypKey&&ppMatchingTemps.length>0?(ppMatchingTemps.includes(hypKey)?"ok":"fail"):null;
  const finalType = activeTemp&&ans.base&&ans.creative?TYPE_RESULTS[activeTemp.id]?.[`${ans.base}+${ans.creative}`]||null:null;
  const typeInfo = finalType?TYPE_INFO[finalType.c]:null;

  const rationalLabel = ans.rationality==="rational"?"Рационал":ans.rationality==="irrational"?"Иррационал":null;
  const extroLabel = ans.extraversion==="extrovert"?"Экстраверт":ans.extraversion==="introvert"?"Интроверт":null;
  const staticsLabel = ans.statics==="static"?"Статик":ans.statics==="dynamic"?"Динамик":null;
  const posLabel = ans.positivism==="positive"?"Позитивист +":ans.positivism==="negative"?"Негативист −":null;
  const procLabel = ans.process==="process"?"Процессер пц":ans.process==="result"?"Результатер рз":null;

  const renderStep = () => {
    switch(stepId) {
      case "intro": return (
        <div>
          <Eyebrow>Экспресс-методика · Соционика · Модель А</Eyebrow>
          <Heading size={28}>Типирование<br/><span style={{color:C.neon}}>по Шанэри</span></Heading>
          <p style={{color:C.textSec,fontSize:13,lineHeight:1.8,marginBottom:24}}>
            Интерактивный алгоритм сессии. Нажимай на ответы типируемого — система ведёт по шагам и отслеживает гипотезы в реальном времени.
          </p>
          <div style={{borderLeft:`2px solid ${C.neon}`,borderTop:`1px solid ${C.lineBr}`,borderRight:`1px solid ${C.line}`,borderBottom:`1px solid ${C.line}`,borderRadius:"0 4px 4px 0",padding:"16px 20px",marginBottom:24,background:C.glow}}>
            <div style={{...mono,color:C.neon,fontSize:9,letterSpacing:"0.15em",marginBottom:10}}>ИНСТРУКЦИЯ ДЛЯ ТИПИРУЕМОГО</div>
            <p style={{color:C.textSec,fontSize:12,lineHeight:1.75,margin:0}}>
              «Я буду задавать абстрактные вопросы. В жизни мы все умеем действовать и так, и этак. Важно отвечать, как вам <em style={{color:C.textPri}}>в общем</em> ближе, естественнее и приятнее — не как вы поступаете в конкретной ситуации или на работе. Если оба полюса свойственны — выбирайте тот, что был с вами с рождения.»
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
            {[["01","Темперамент","5 признаков Рейнина"],["02","Тип","Базовая + Творческая"]].map(([n,t,s])=>(
              <div key={n} style={{border:`1px solid ${C.line}`,borderRadius:4,padding:"16px",background:C.bg1}}>
                <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:6}}>ЭТАП {n}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:C.textPri,marginBottom:3}}>{t}</div>
                <div style={{color:C.textSec,fontSize:11}}>{s}</div>
              </div>
            ))}
          </div>
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={true} nextLabel="НАЧАТЬ"/>
        </div>
      );

      case "rationality": return (
        <div>
          <Eyebrow>Этап 1 · Признак 1 · Нальность</Eyebrow>
          <Heading>Иррациональность / Рациональность</Heading>
          <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>
            Что первично для психики: заранее принятое решение и план — или непосредственное восприятие поступающей ситуации?
          </p>
          <QuestionCard>«Как вы <strong style={{color:C.textPri}}>любите</strong> действовать — по плану или по ситуации?»</QuestionCard>
          <AnswerBtn label="По плану" desc="Предпочитает заранее составленный план или сформированное мнение. Сбой плана — досадное происшествие, требует сознательной перестройки." who="→ РАЦИОНАЛ" onClick={()=>setA("rationality","rational")} selected={ans.rationality==="rational"}/>
          <AnswerBtn label="По ситуации  /  И так, и так" desc="Ориентируется на поток информации и изменяющиеся обстоятельства. Смена ситуации — естественное продолжение, без тревоги." who="→ ИРРАЦИОНАЛ" onClick={()=>setA("rationality","irrational")} selected={ans.rationality==="irrational"}/>
          <HintBox title="Уточняющие вопросы">
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[["Часто ли получается действовать по задуманному?","Рационал чаще реализует планы; иррационал гибко перестраивает."],["Испытываете дискомфорт, когда планы меняются на лету?","Дискомфорт / раздражение → рационал. Азарт / спокойствие → иррационал."],["Удобно ли выйти из дома без чёткого плана на день?","Рационал тревожится о бесцельности. Иррационал чувствует свободу."],["Легко адаптируетесь, но предпочитаете иметь изначальные заготовки?","«Спокойнее с каркасом» → рационал. «Заготовки для надёжности» → иррационал."]].map(([q,a])=>(
                <div key={q}><div style={{color:C.textPri,fontSize:12,marginBottom:2}}>— {q}</div><div style={{color:C.textDim,fontSize:11,paddingLeft:12}}>{a}</div></div>
              ))}
            </div>
          </HintBox>
          <HintBox title="⚠ Частые ловушки">
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div><span style={{color:C.warn}}>ИЛЭ, ИЭИ, ИЛИ</span> — иррационалы с базовой интуицией, любят обдумывать сценарии и могут казаться «плановиками». Уточни: план реализуется или гибко перестраивается?</div>
              <div><span style={{color:C.warn}}>ЛИЭ (Джек), ЭИЭ (Гамлет)</span> — рационалы с сильной БИ, могут считать себя «ситуативными». Вопрос про дискомфорт при сломе плана — ключевой.</div>
              <div><span style={{color:C.warn}}>СЛЭ (Жуков), СЭЭ (Наполеон)</span> — иррационалы, воспринимают цель как «план». Уточни: жёсткий пошаговый план или цель с гибкими методами?</div>
            </div>
          </HintBox>
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.rationality}/>
        </div>
      );

      case "extraversion": return (
        <div>
          <Eyebrow>Этап 1 · Признак 2 · Вертность</Eyebrow>
          <Heading>Экстраверсия / Интроверсия</Heading>
          <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>
            В соционике — не про общительность, а про <em style={{color:C.textPri}}>направление внимания</em>: вширь на объекты или вглубь на связи.
          </p>
          <QuestionCard>«Твоё внимание направлено <strong style={{color:C.textPri}}>экстенсивно вширь — важно количество</strong>, или <strong style={{color:C.textPri}}>интенсивно вглубь — важно качество</strong>?»</QuestionCard>
          <AnswerBtn label="Экстраверт — вширь и наружу" desc="Фокус на объектах и их внешних характеристиках. Широкий круг контактов, энергия от общения. Важен охват и влияние." who="→ ЭКСТРАВЕРТ" onClick={()=>setA("extraversion","extrovert")} selected={ans.extraversion==="extrovert"}/>
          <AnswerBtn label="Интроверт — вглубь и внутрь" desc="Фокус на отношениях и связях между объектами, внутренних характеристиках. Узкий круг близких, нужно время наедине." who="→ ИНТРОВЕРТ" onClick={()=>setA("extraversion","introvert")} selected={ans.extraversion==="introvert"}/>
          <HintBox title="Уточняющие вопросы">
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[["Любишь ли быть в центре внимания? Насколько это легко?","Экстраверт: привычно. Интроверт: работа / стресс, даже если умеет."],["Много ли друзей и знакомых?","Экстраверт — широкий круг. Интроверт — узкий круг близких."],["Насколько важно разделение на близких и далёких?","У интроверта это составляет саму суть социального мира."],["Насколько большие компании заряжают или утомляют?","Экстраверт заряжается, от одиночества «тухнет». Интроверт наоборот."]].map(([q,a])=>(
                <div key={q}><div style={{color:C.textPri,fontSize:12,marginBottom:2}}>— {q}</div><div style={{color:C.textDim,fontSize:11,paddingLeft:12}}>{a}</div></div>
              ))}
            </div>
          </HintBox>
          <HintBox title="⚠ Частые ловушки">
            <div><span style={{color:C.warn}}>ЭИЭ (Гамлет)</span> — яркий экстраверт, может считать себя интровертом из-за глубокого погружения во внутренний мир (творческая БИ).</div>
          </HintBox>
          {ans.rationality&&ans.extraversion&&(
            <><Divider/><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{color:C.textSec,fontSize:11}}>Первичная гипотеза:</span><Tag glow>{TEMPS[`${ans.rationality}+${ans.extraversion}`]?.name}</Tag></div></>
          )}
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.extraversion}/>
        </div>
      );

      case "hypothesis": return (
        <div>
          <Eyebrow>Итог первых двух признаков</Eyebrow>
          <Heading>Первичная гипотеза</Heading>
          {hypData?(
            <>
              <div style={{border:`1px solid ${C.lineBr}`,borderRadius:4,padding:"22px 24px",marginBottom:20,background:`linear-gradient(135deg,${C.bg2},${C.glow})`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,right:0,width:100,height:100,background:`radial-gradient(circle,${C.neon}18,transparent 70%)`}}/>
                <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:6}}>{hypData.desc}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:C.textPri,marginBottom:4}}>{hypData.name}</div>
                <div style={{color:C.textSec,fontSize:12,marginBottom:16}}>{hypData.sub}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{hypData.types.map(t=><Tag key={t}>{t}</Tag>)}</div>
              </div>
              <div style={{border:`1px solid ${C.line}`,borderRadius:4,padding:"16px 18px",background:C.bg1}}>
                <div style={{color:C.textDim,...mono,fontSize:9,letterSpacing:"0.12em",marginBottom:14}}>ОЖИДАЕМЫЕ ЗНАЧЕНИЯ ДЛЯ ВЕРИФИКАЦИИ</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div>
                    <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:8}}>ТАЛЬНОСТЬ</div>
                    <Tag glow>{hypData.tality==="static"?"СТАТИК":"ДИНАМИК"}</Tag>
                  </div>
                  <div>
                    <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:8}}>ПОЗИТИВИЗМ · ПРОЦЕСС</div>
                    {hypData.types.map(t=>{
                      const[p,pr]=hypData.posProc[t];
                      return <div key={t} style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><span style={{color:C.neon,...mono,fontSize:10,minWidth:30}}>{t}</span><span style={{color:C.textSec,fontSize:11}}>{p==="+"?"Позитив.":"Негатив."} · {pr==="пц"?"Процесс":"Результат"}</span></div>;
                    })}
                  </div>
                </div>
              </div>
              <div style={{marginTop:12,padding:"10px 14px",border:`1px solid ${C.line}`,borderRadius:4,color:C.textSec,fontSize:11}}>
                Три следующих признака верифицируют гипотезу. Расхождение — сигнал к пересмотру.
              </div>
            </>
          ):<div style={{color:C.textSec}}>Вернитесь и ответьте на вопросы по нальности и вертности.</div>}
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!hypData}/>
        </div>
      );

      case "statics": return (
        <div>
          <Eyebrow>Этап 1 · Признак 3 · Тальность (перепроверка)</Eyebrow>
          <Heading>Статика / Динамика</Heading>
          <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>
            Статики воспринимают мир как серию отдельных кадров-снимков. Динамики — как непрерывный поток, фильм.
          </p>
          <QuestionCard>«Представь шкатулку. Опиши, что представилось?»<br/><span style={{color:C.textDim,fontSize:11}}>Ничего не подсказывай — просто слушай.</span></QuestionCard>
          <AnswerBtn label="Статика — как фото" desc="Описание неподвижного объекта и свойств: «деревянная, тёмная, резная крышка, пыль, медный замочек». Срез, снимок." who="→ СТАТИК" onClick={()=>setA("statics","static")} selected={ans.statics==="static"}/>
          <AnswerBtn label="Динамика — как видео" desc="Описание процесса и движения: «шкатулка открывается, льётся свет, играет музыка, балерина вращается». Поток." who="→ ДИНАМИК" onClick={()=>setA("statics","dynamic")} selected={ans.statics==="dynamic"}/>
          <HintBox title="Уточняющие вопросы">
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div style={{color:C.textPri,fontSize:12}}>Если фото:</div>
              <div style={{color:C.textDim,fontSize:11,paddingLeft:12,marginBottom:4}}>«Может, шкатулка стояла, но камера плавно двигалась вокруг?» — движение наблюдателя = динамика.</div>
              <div style={{color:C.textPri,fontSize:12}}>Если видео:</div>
              <div style={{color:C.textDim,fontSize:11,paddingLeft:12}}>«Может, было похоже на медленное слайд-шоу?» — серия статичных кадров = статика.</div>
              <Divider/>
              <div style={{color:C.textSec,fontSize:11}}>Бонус: много конкретных деталей → сенсорика. Размытые абстракции → интуиция.</div>
            </div>
          </HintBox>
          {hypData&&ans.statics&&(
            <div style={{marginTop:14,display:"flex",alignItems:"center",gap:10,padding:"10px 14px",border:`1px solid ${talMatch?C.ok+"40":C.fail+"40"}`,borderRadius:4,background:talMatch?`${C.ok}06`:`${C.fail}06`}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:talMatch?C.ok:C.fail,flexShrink:0}}/>
              <span style={{color:talMatch?C.ok:C.fail,...mono,fontSize:10}}>{talMatch?"СОВПАДАЕТ С ГИПОТЕЗОЙ":"ПРОТИВОРЕЧИТ ГИПОТЕЗЕ"}{!talMatch?` — ожидалось: ${hypData.tality==="static"?"СТАТИК":"ДИНАМИК"}`:""}</span>
            </div>
          )}
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.statics}/>
        </div>
      );

      case "positivism": return (
        <div>
          <Eyebrow>Этап 1 · Признак 4 · Позитивизм/Негативизм (перепроверка)</Eyebrow>
          <Heading>Фокус восприятия</Heading>
          <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>
            Позитивист замечает то, что <em style={{color:C.textPri}}>присутствует</em>. Негативист замечает то, чего <em style={{color:C.textPri}}>не хватает</em> или что идёт не так.
          </p>
          <QuestionCard>«Ты замечаешь в первую очередь хорошее или плохое? То, что <strong style={{color:C.textPri}}>присутствует</strong>, или то, что <strong style={{color:C.textPri}}>отсутствует</strong>?»</QuestionCard>
          <AnswerBtn label="Позитивист — замечает то, что есть" desc="Первым делом видит ресурсы, имеющееся, плюсы ситуации. Фокус на присутствующем." who="→ ПОЗИТИВИСТ ＋" onClick={()=>setA("positivism","positive")} selected={ans.positivism==="positive"}/>
          <AnswerBtn label="Негативист — замечает то, чего нет" desc="Первым делом видит несоответствия, риски, то чего не хватает. Фокус на отсутствующем и неправильном." who="→ НЕГАТИВИСТ −" onClick={()=>setA("positivism","negative")} selected={ans.positivism==="negative"}/>
          <HintBox title="⚠ Ненадёжный признак — читать обязательно">
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div><span style={{color:C.warn}}>Психологическое состояние:</span> человек в депрессии ответит «замечаю плохое» вне зависимости от типа — игнорируй ответ.</div>
              <div><span style={{color:C.warn}}>Социальная желательность:</span> многие отвечают «хорошее», т.к. так принято. Неуверенный / заученный ответ — меньший вес.</div>
              <div style={{color:C.textSec}}>Признак полезен когда ответ чёткий и подтверждает уже имеющуюся гипотезу. Иначе — просто игнорируй.</div>
            </div>
          </HintBox>
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.positivism}/>
        </div>
      );

      case "process": return (
        <div>
          <Eyebrow>Этап 1 · Признак 5 · Процесс/Результат (перепроверка)</Eyebrow>
          <Heading>Ориентация деятельности</Heading>
          <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>
            Результатер думает от конца к пути — «сделать и переключиться». Процессер думает о постепенном развитии и непрерывном потоке.
          </p>
          <QuestionCard>«Что для тебя важнее — процесс или результат?»</QuestionCard>
          <AnswerBtn label="Результат — важен финиш" desc="Деятельность как набор завершённых задач. Важен чёткий момент окончания. Думает от результата назад к пути достижения." who="→ РЕЗУЛЬТАТЕР (рз)" onClick={()=>setA("process","result")} selected={ans.process==="result"}/>
          <AnswerBtn label="Процесс — важно движение" desc="Деятельность как непрерывный поток развития. Важно движение вперёд без чёткой границы начала и конца." who="→ ПРОЦЕССЕР (пц)" onClick={()=>setA("process","process")} selected={ans.process==="process"}/>
          <HintBox title="⚠ Частые ловушки">
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <div><span style={{color:C.warn}}>СЭЭ (Наполеон)</span> — процессер, но часто отвечает «результат»: базовая ЧС фокусирована на завоевании цели.</div>
              <div><span style={{color:C.warn}}>ЛСЭ (Штирлиц)</span> — процессер, но часто отвечает «результат»: деловая логика ассоциируется с выполнением задачи.</div>
              <div style={{color:C.textSec}}>Если гипотеза на них — их ответ «результат» подтверждает версию, а не опровергает.</div>
            </div>
          </HintBox>
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.process} nextLabel="К СИНТЕЗУ"/>
        </div>
      );

      case "synthesis": return (
        <div>
          <Eyebrow>Этап 1 завершён · Синтез</Eyebrow>
          <Heading>Определение темперамента</Heading>
          <div style={{border:`1px solid ${C.line}`,borderRadius:4,overflow:"hidden",marginBottom:20}}>
            {[
              {label:"Нальность",value:rationalLabel,status:"ok"},
              {label:"Вертность",value:extroLabel,status:"ok"},
              {label:"Тальность",value:staticsLabel,status:talMatch===true?"ok":talMatch===false?"fail":"neutral",note:talMatch===false?`Ожидалось: ${hypData?.tality==="static"?"Статик":"Динамик"}`:null},
              {label:"Позитивизм",value:posLabel,status:ppCheck==="ok"?"ok":ppCheck==="fail"?"fail":"neutral"},
              {label:"Процесс/Результат",value:procLabel,status:"neutral"},
            ].map(({label,value,status,note},i)=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",borderBottom:i<4?`1px solid ${C.line}`:"none",background:i%2===0?"transparent":C.bg1}}>
                <span style={{width:6,height:6,borderRadius:"50%",flexShrink:0,background:status==="ok"?C.ok:status==="fail"?C.fail:C.textDim}}/>
                <span style={{color:C.textSec,fontSize:12,minWidth:150}}>{label}</span>
                <span style={{color:status==="ok"?C.textPri:status==="fail"?C.fail:C.textSec,fontSize:12,...mono}}>{value||"—"}</span>
                {note&&<span style={{color:C.fail,fontSize:10,marginLeft:"auto",...mono}}>{note}</span>}
              </div>
            ))}
          </div>
          {(talMatch===false||ppCheck==="fail")&&!tempOverride&&(
            <div style={{border:`1px solid ${C.fail}30`,borderRadius:4,padding:"16px 18px",marginBottom:16,background:`${C.fail}05`}}>
              <div style={{color:C.fail,...mono,fontSize:10,marginBottom:8}}>⚠ РАСХОЖДЕНИЕ ДАННЫХ</div>
              <p style={{color:C.textSec,fontSize:12,lineHeight:1.6,marginBottom:12}}>Найди наиболее уверенные ответы и пересмотри гипотезу.</p>
              <button onClick={()=>setShowOverride(o=>!o)} style={{padding:"7px 14px",borderRadius:3,border:`1px solid ${C.fail}40`,background:"transparent",color:C.fail,fontSize:10,cursor:"pointer",...mono}}>
                {showOverride?"− СКРЫТЬ":"+ ИЗМЕНИТЬ ТЕМПЕРАМЕНТ"}
              </button>
            </div>
          )}
          {showOverride&&(
            <div style={{marginBottom:16}}>
              <div style={{color:C.textSec,fontSize:10,...mono,marginBottom:10}}>ВЫБОР ВРУЧНУЮ</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {Object.entries(TEMPS).map(([key,t])=>{
                  const active=(tempOverride||hypKey)===key;
                  return(
                    <button key={key} onClick={()=>{setTempOverride(key);setShowOverride(false);}} style={{padding:"12px",borderRadius:4,cursor:"pointer",textAlign:"left",border:`1px solid ${active?C.neon:C.line}`,background:active?C.glow:"transparent",...(active?glowBox(C.neon,8):{})}} >
                      <div style={{color:C.textDim,...mono,fontSize:9}}>{t.desc}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:C.textPri,margin:"3px 0"}}>{t.name}</div>
                      <div style={{color:C.neon,...mono,fontSize:9}}>{t.types.join("  ")}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {activeTemp&&(
            <div style={{border:`1px solid ${C.lineBr}`,borderRadius:4,padding:"22px 24px",background:`linear-gradient(135deg,${C.bg2},${C.glow})`,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:120,height:120,background:`radial-gradient(circle,${C.neon}12,transparent 70%)`}}/>
              <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:4}}>{tempOverride?"СКОРРЕКТИРОВАННЫЙ ТЕМПЕРАМЕНТ":"ИТОГОВЫЙ ТЕМПЕРАМЕНТ"}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:C.textPri,marginBottom:4}}>{activeTemp.name}</div>
              <div style={{color:C.textSec,fontSize:12,marginBottom:16}}>{activeTemp.sub} · {activeTemp.desc}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{activeTemp.types.map(t=><Tag key={t} glow>{t}</Tag>)}</div>
            </div>
          )}
          <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!(tempOverride||hypKey)} nextLabel="ЭТАП 2"/>
        </div>
      );

      case "base": {
        if(!activeTemp) return <div style={{color:C.textSec}}>Сначала определите темперамент.</div>;
        const bd = BRANCHES[activeTemp.id].base;
        return (
          <div>
            <Eyebrow>Этап 2 · Блок ЭГО · Базовая функция</Eyebrow>
            <Heading>Что для него главное?</Heading>
            <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>Базовая — фундаментальная призма, через которую человек смотрит на мир. Самое важное и центральное.</p>
            <div style={{border:`1px solid ${C.lineBr}`,borderRadius:4,padding:"11px 16px",marginBottom:18,background:C.glow,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{color:C.textSec,fontSize:11}}>Темперамент:</span><Tag>{activeTemp.name}</Tag>
              <span style={{color:C.textDim,fontSize:11}}>Базовая может быть: <span style={{color:C.neon,...mono}}>{bd.opts.map(o=>o.v).join(" или ")}</span></span>
            </div>
            <QuestionCard>{bd.q}</QuestionCard>
            {bd.opts.map(opt=>(
              <AnswerBtn key={opt.v} label={<><span style={{...mono,fontSize:11,color:C.neon}}>{opt.v}</span>  {opt.label}</>} desc={opt.desc} who={opt.who} onClick={()=>setA("base",opt.v)} selected={ans.base===opt.v}/>
            ))}
            <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.base}/>
          </div>
        );
      }

      case "creative": {
        if(!activeTemp) return <div style={{color:C.textSec}}>Сначала определите темперамент.</div>;
        const bd = BRANCHES[activeTemp.id].creative;
        return (
          <div>
            <Eyebrow>Этап 2 · Блок ЭГО · Творческая функция</Eyebrow>
            <Heading>О чём ему интересно думать?</Heading>
            <p style={{color:C.textSec,fontSize:12,lineHeight:1.7,marginBottom:18}}>Творческая — инструмент, через который человек проявляет себя, решает задачи и взаимодействует с миром.</p>
            <div style={{border:`1px solid ${C.lineBr}`,borderRadius:4,padding:"11px 16px",marginBottom:18,background:C.glow,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{color:C.textSec,fontSize:11}}>Базовая:</span><Tag glow>{ans.base}</Tag>
              <span style={{color:C.textSec,fontSize:11}}>Творческая:</span>
              <span style={{color:C.neon,...mono,fontSize:12}}>{bd.opts.map(o=>o.v).join(" / ")}</span>
            </div>
            <QuestionCard>{bd.q}</QuestionCard>
            {bd.opts.map(opt=>(
              <AnswerBtn key={opt.v} label={<><span style={{...mono,fontSize:11,color:C.neon}}>{opt.v}</span>  {opt.label}</>} desc={opt.desc} who={opt.who} onClick={()=>setA("creative",opt.v)} selected={ans.creative===opt.v}/>
            ))}
            <NavBar step={step} total={STEPS.length} onPrev={goPrev} onNext={goNext} canNext={!!ans.creative} nextLabel="РЕЗУЛЬТАТ"/>
          </div>
        );
      }

      case "result": return (
        <div>
          {finalType&&typeInfo?(
            <>
              {/* HERO */}
              <div style={{textAlign:"center",padding:"20px 0 28px",position:"relative"}}>
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:220,height:220,background:`radial-gradient(circle,${C.neon}18,transparent 70%)`,pointerEvents:"none"}}/>
                <div style={{color:C.textDim,...mono,fontSize:9,letterSpacing:"0.2em",marginBottom:16}}>СОЦИОНИЧЕСКИЙ ТИП</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:88,color:C.neon,lineHeight:1,marginBottom:12,textShadow:`0 0 40px ${C.neon}55, 0 0 80px ${C.neon}20`}}>
                  {finalType.c}
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:22,color:C.textPri,marginBottom:6}}>{finalType.n}</div>
                {activeTemp&&<div style={{color:C.textSec,fontSize:13,marginBottom:14}}>{activeTemp.name} · {activeTemp.desc}</div>}
                <div style={{display:"inline-flex",gap:8,alignItems:"center",padding:"5px 14px",border:`1px solid ${C.neonDim}`,borderRadius:2,background:C.glow}}>
                  <span style={{color:C.neon,...mono,fontSize:11,fontWeight:700}}>{typeInfo.formula}</span>
                  <span style={{color:C.textDim,fontSize:10}}>·</span>
                  <span style={{color:C.textSec,fontSize:11}}>{typeInfo.quadra} квадра</span>
                </div>
              </div>

              <Divider/>

              {/* ОПИСАНИЕ */}
              <div style={{marginBottom:20}}>
                <div style={{...mono,color:C.textDim,fontSize:9,letterSpacing:"0.15em",marginBottom:12}}>ОПИСАНИЕ ТИПА</div>
                <div style={{borderLeft:`2px solid ${C.neon}`,borderTop:`1px solid ${C.lineBr}`,borderRight:`1px solid ${C.line}`,borderBottom:`1px solid ${C.line}`,borderRadius:"0 4px 4px 0",padding:"18px 20px",marginBottom:12,background:C.glow,...glowBox(C.neon,5)}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:C.neon,marginBottom:10}}>{typeInfo.subtitle}</div>
                  <p style={{color:C.textSec,fontSize:13,lineHeight:1.8,margin:0}}>{typeInfo.desc}</p>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <div style={{border:`1px solid ${C.line}`,borderRadius:4,padding:"16px",background:C.bg1}}>
                    <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:8}}>ГЛАВНОЕ</div>
                    <div style={{color:C.textPri,fontSize:12,lineHeight:1.65}}>{typeInfo.main}</div>
                  </div>
                  <div style={{border:`1px solid ${C.line}`,borderRadius:4,padding:"16px",background:C.bg1}}>
                    <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:8}}>ИНСТРУМЕНТ</div>
                    <div style={{color:C.textPri,fontSize:12,lineHeight:1.65}}>{typeInfo.tool}</div>
                  </div>
                </div>
              </div>
              
              {/* ССЫЛКИ */}
              <div style={{border:`1px solid ${C.lineBr}`,borderRadius:4,padding:"14px 20px",marginBottom:20,background:C.glow,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,...glowBox(C.neon,4)}}>
                <div>
                  <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:4}}>ПОДРОБНЕЕ О ТИПЕ</div>
                  <div style={{color:C.textSec,fontSize:12}}>Полное описание, взаимодействия и рекомендации</div>
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap",justifyContent:"flex-end"}}>
                  <a href={`https://shaneri.ru/${typeInfo.slug}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:3,border:`1px solid ${C.neon}`,background:"transparent",color:C.neon,fontSize:10,fontWeight:700,...mono,letterSpacing:"0.1em",textDecoration:"none",...glowBox(C.neon,8)}}>
                    ОТКРЫТЬ →
                  </a>
                  <a href="https://new.shaneri.ru/socionic-typing#/start" target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:3,border:`1px solid ${C.neonDim}`,background:"transparent",color:C.textSec,fontSize:10,fontWeight:700,...mono,letterSpacing:"0.1em",textDecoration:"none",transition:"all 0.2s"}}>
                    ПРОЙТИ ИНТЕРВЬЮ →
                  </a>
                </div>
              </div>

              {/* ЭГО */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
                {[["Базовая функция",ans.base,"Главный фокус"],["Творческая функция",ans.creative,"Инструмент"]].map(([l,v,d])=>(
                  <div key={l} style={{border:`1px solid ${C.lineBr}`,borderRadius:4,padding:"18px 16px",background:C.glow}}>
                    <div style={{color:C.textDim,...mono,fontSize:9,marginBottom:8}}>{l}</div>
                    <div style={{color:C.neon,fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:34,marginBottom:4,textShadow:`0 0 20px ${C.neon}45`}}>{v}</div>
                    <div style={{color:C.textSec,fontSize:11}}>{d}</div>
                  </div>
                ))}
              </div>

              {/* ПУТЬ */}
              <div style={{border:`1px solid ${C.line}`,borderRadius:4,overflow:"hidden",marginBottom:20}}>
                <div style={{padding:"10px 18px",background:C.bg1,color:C.textDim,...mono,fontSize:9,letterSpacing:"0.12em"}}>ПОЛНЫЙ ПУТЬ</div>
                {[["Нальность",rationalLabel],["Вертность",extroLabel],["Темперамент",activeTemp?.name],["Тальность",staticsLabel],["Позитивизм",posLabel],["Процесс/Результат",procLabel],["Базовая",ans.base],["Творческая",ans.creative]].map(([l,v],i)=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 18px",borderTop:`1px solid ${C.line}`,background:i%2===0?"transparent":C.bg1}}>
                    <span style={{color:C.textSec,fontSize:12}}>{l}</span>
                    <span style={{color:v?C.textPri:C.textDim,fontSize:12,...mono}}>{v||"—"}</span>
                  </div>
                ))}
              </div>

              {/* ЭКСПОРТ */}
              <ExportPanel finalType={finalType} typeInfo={typeInfo} activeTemp={activeTemp} rationalLabel={rationalLabel} extroLabel={extroLabel} staticsLabel={staticsLabel} posLabel={posLabel} procLabel={procLabel} base={ans.base} creative={ans.creative}/>

              <button onClick={reset} style={{width:"100%",padding:"13px",borderRadius:3,border:`1px solid ${C.line}`,background:"transparent",color:C.textSec,fontSize:10,cursor:"pointer",...mono,letterSpacing:"0.1em"}}>
                ↺ НОВОЕ ТИПИРОВАНИЕ
              </button>
            </>
          ):(
            <div style={{textAlign:"center",color:C.textSec,padding:"60px 0"}}>
              <div style={{fontSize:28,marginBottom:12,opacity:0.2}}>◇</div>
              Вернитесь и выберите базовую и творческую функции
            </div>
          )}
        </div>
      );

      default: return null;
    }
  };

  const SR = ({label,value,dim}) => (
    <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.line}`}}>
      <span style={{color:C.textDim,fontSize:10}}>{label}</span>
      <span style={{color:dim?C.fail:value?C.textSec:C.textDim,fontSize:10,...mono}}>{value||"—"}</span>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Space+Mono:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#06060b;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(157,78,221,0.3);border-radius:2px;}
        button{font-family:inherit;}
      `}</style>
      <div style={{minHeight:"100vh",background:C.bg,color:C.textPri}}>
        <nav style={{position:"sticky",top:0,zIndex:10,background:`${C.bg}e8`,backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.line}`,padding:"13px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:15,color:C.textPri}}>SOCIO<span style={{color:C.neon}}>TYPE</span></div>
            <div style={{width:1,height:14,background:C.line}}/>
            <div style={{color:C.textDim,...mono,fontSize:9}}>{step<8?"ОПРЕДЕЛЕНИЕ ТЕМПЕРАМЕНТА":step<10?"УТОЧНЕНИЕ ТИПА":"РЕЗУЛЬТАТ"}</div>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            {step>0&&<button onClick={reset} style={{background:"transparent",border:"none",cursor:"pointer",color:C.textDim,fontSize:9,...mono}}>СБРОС</button>}
            <div style={{color:C.textDim,...mono,fontSize:9}}>{String(step+1).padStart(2,"0")} / {String(STEPS.length).padStart(2,"0")}</div>
          </div>
        </nav>
        <div style={{height:1,background:C.bg2}}>
          <div style={{height:"100%",background:`linear-gradient(90deg,#4a0080,${C.neon})`,width:`${(step/(STEPS.length-1))*100}%`,transition:"width 0.4s cubic-bezier(0.4,0,0.2,1)",boxShadow:`0 0 8px ${C.neon}50`}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 250px",gap:0,maxWidth:960,margin:"0 auto",padding:"32px 28px",alignItems:"start"}}>
          <div style={{paddingRight:28}}>{renderStep()}</div>
          <div style={{position:"sticky",top:72}}>
            <div style={{border:`1px solid ${C.line}`,borderRadius:4,padding:"18px",background:C.bg1}}>
              <div style={{color:C.textDim,...mono,fontSize:9,letterSpacing:"0.2em",marginBottom:14}}>ГИПОТЕЗА</div>
              <SR label="Нальность" value={rationalLabel}/>
              <SR label="Вертность" value={extroLabel}/>
              <SR label="Тальность" value={staticsLabel} dim={talMatch===false}/>
              <SR label="Позитивизм" value={posLabel}/>
              <SR label="Проц/Рез" value={procLabel}/>
              {activeTemp&&(
                <div style={{marginTop:14,padding:"13px",border:`1px solid ${C.lineBr}`,borderRadius:4,background:C.glow,...glowBox(C.neon,5)}}>
                  <div style={{color:C.neon,fontSize:8,...mono,marginBottom:6}}>{tempOverride?"СКОРР.":"ТЕМПЕРАМЕНТ"}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:14,color:C.textPri,marginBottom:8}}>{activeTemp.name}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {activeTemp.types.map(t=><span key={t} style={{...mono,fontSize:9,color:C.neon,padding:"2px 6px",border:`1px solid ${C.neonDim}`,borderRadius:2}}>{t}</span>)}
                  </div>
                </div>
              )}
              {(ans.base||ans.creative)&&(
                <div style={{marginTop:12,padding:"13px",border:`1px solid ${C.line}`,borderRadius:4}}>
                  <div style={{color:C.textDim,fontSize:8,...mono,marginBottom:10}}>ЭГО-БЛОК</div>
                  <SR label="Базовая" value={ans.base}/>
                  <SR label="Творческая" value={ans.creative}/>
                  {finalType&&(
                    <div style={{marginTop:12,textAlign:"center"}}>
                      <div style={{color:C.neon,fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:30,textShadow:`0 0 20px ${C.neon}55`}}>{finalType.c}</div>
                      <div style={{color:C.textSec,fontSize:11}}>{finalType.n}</div>
                    </div>
                  )}
                </div>
              )}
              {(talMatch!==null||ppCheck)&&(
                <div style={{marginTop:12}}>
                  <div style={{color:C.textDim,fontSize:8,...mono,marginBottom:8}}>ПРОВЕРКИ</div>
                  {[{label:"Тальность",s:talMatch===true?"ok":talMatch===false?"fail":"n"},{label:"Позит+Проц",s:ppCheck==="ok"?"ok":ppCheck==="fail"?"fail":"n"}].map(({label,s})=>(
                    <div key={label} style={{display:"flex",alignItems:"center",gap:7,padding:"4px 0"}}>
                      <span style={{width:5,height:5,borderRadius:"50%",background:s==="ok"?C.ok:s==="fail"?C.fail:C.textDim,flexShrink:0}}/>
                      <span style={{color:s==="ok"?C.ok:s==="fail"?C.fail:C.textDim,fontSize:10}}>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
