/* All page copy, per language. **text** renders as <strong>.
   Korean is served at /ko, English at /en; "/" redirects to one of them (proxy.ts). */
import { VERSION } from "./site";

export type Lang = "ko" | "en";
export type PathKey = "sib" | "click" | "breath";

type Card = { path: PathKey; tag: string; tagNew: boolean; title: string; sub: string; body: string; spec: string; rotate: number };
type Row = { label: string; them: string; us: string; note?: string; extra?: boolean };
type Block = { id: string; eyebrow: string; title: string; body: string; bullets: string[]; img: string; alt: string; caption: string };
type Dl = { platform: "windows" | "mac"; name: string; reqs: string[]; path: string; ready: string };
type Qa = { q: string; a: string };

export type Dict = {
  lang: Lang;
  path: string;
  meta: { title: string; description: string; keywords: string[]; ogTitle: string; ogDescription: string; ogImage: string; ogImageAlt: string; ogLocale: string; ogLocaleAlt: string };
  skip: string;
  nav: { aria: string; features: string; compare: string; download: string; faq: string; shop: string; shopAria: string };
  langToggle: { aria: string };
  headerCta: string;
  hero: {
    eyebrow: string; tagline: string; claim: [string, string, string];
    priceAria: string; priceNote: string; ctaPrimary: string; ctaTrialOld: string; ctaTrialNew: string;
    metaAria: string; meta: string[]; img: string; imgAlt: string; badge: string;
  };
  ticker: string[];
  intro: { title: string; body: string[]; quote: string; quoteBy: string };
  detection: { eyebrow: string; title: string; lede: string; cards: Card[] };
  guide: { eyebrow: string; title: string; lede: string; factsTitle: string; facts: { k: string; v: string }[]; items: Qa[] };
  demo: { title: string; note: string; canvasLabel: string; knobs: Record<PathKey, { label: string; aria: string }> };
  listen: {
    title: string; note: string; canvasLabel: string; loading: string; play: string; pause: string; ab: string; abAria: string;
    tracks: Record<"original" | PathKey | "all", string>; momentsTitle: string;
    rulerAria: string; rulerHint: string; cycle: string; cycleClear: string; zoomOut: string;
    hints: Record<PathKey, string>;
    deltaAria: string; deltaHint: string; deltaPick: string;
    bandLabel: Record<PathKey | "all", string>; bandAria: string; bandLow: string; bandHigh: string; bandReset: string;
  };
  blocks: Block[];
  compare: { eyebrow: string; title: string; lede: string; caption: string; cols: [string, string, string]; extraBadge: string; rows: Row[]; footnote: string };
  keyFeatures: { eyebrow: string; title: string; items: string[] };
  download: { eyebrow: string; title: string; lede: string; soonLabel: string; soonNote: string; cards: Dl[]; versionLine: string };
  info: { title: string; blocks: { title: string; lines: string[] }[] };
  bundles: { title: string; body: string; tiles: { name: string; price: string }[] };
  faq: { eyebrow: string; title: string; items: Qa[] };
  final: { title: string; lede: string; cta: string };
  footer: { aria: string; otherLang: { href: string; hreflang: Lang; label: string }; legal: string };
  hint: { lang: Lang; text: string; link: string; href: string; close: string };
  schema: { description: string; featureList: string[]; pageName: string };
};

const YES_KO = "지원", NO_KO = "없음";

export const ko: Dict = {
  lang: "ko",
  path: "/ko",
  meta: {
    title: "무료 디에서 플러그인 Just-DS | 치찰음·파열음·숨소리(후음) 제거 VST3/AU",
    description:
      "Just-DS는 보컬의 치찰음, ㅌ 파열음·입소리, 숨소리·후음(ㅎ)을 따로 찾아 줄이는 무료 디에서 플러그인입니다. Windows·macOS VST3/AU, 구독·계정 없이 평생 무료. Pro-DS 무료 대안.",
    keywords: ["무료 디에서", "디에서 플러그인", "무료 디에서 플러그인", "치찰음 제거", "파열음 제거", "숨소리 제거", "후음 제거", "입소리 제거", "보컬 숨소리 제거 플러그인", "Pro-DS 무료 대안", "free de-esser"],
    ogTitle: "Just-DS — 파열음·숨소리까지 잡는 무료 디에서",
    ogDescription: "치찰음, ㅌ 파열음·입소리, 숨소리·후음(ㅎ)을 따로 잡는 무료 VST3/AU 디에서. Windows·macOS, 구독·계정 없이 평생 무료.",
    ogImage: "/og/og-ko.png",
    ogImageAlt: "혀를 내민 금색 노브와 Just-DS 플러그인 화면, 평생 무료",
    ogLocale: "ko_KR",
    ogLocaleAlt: "en_US",
  },
  skip: "본문으로 건너뛰기",
  nav: { aria: "주요 메뉴", features: "기능", compare: "비교", download: "다운로드", faq: "FAQ", shop: "Shop", shopAria: "Shop — 살 게 없습니다" },
  langToggle: { aria: "언어 선택" },
  headerCta: "무료 다운로드",
  hero: {
    eyebrow: "무료 디에서 · 파열음·숨소리 제거 플러그인",
    tagline: "돈 안 받습니다. 진짜로.",
    claim: ["Pro-DS가 하는 일 그대로.", "파열음·숨소리까지 더해서.", "가격은"],
    priceAria: "가격 비교",
    priceNote: "평생 무료 · 구독·계정·체험 기간 없음",
    ctaPrimary: "무료 다운로드",
    ctaTrialOld: "30일 체험판",
    ctaTrialNew: "평생 체험판",
    metaAria: "지원 환경",
    meta: ["Windows · macOS", "VST3 · AU", "한국어 / English UI"],
    img: "/assets/img/ui-auto-ko.webp",
    imgAlt: "Just-DS 플러그인 메인 화면: 치찰·클릭·숨소리 감쇄를 보여주는 파형 디스플레이와 혀를 내민 금색 노브 세 개",
    badge: "FREE",
  },
  ticker: ["Free forever", "치찰음", "파열음", "숨소리", "No subscription", "No account", "No trial", "$0.00"],
  intro: {
    title: "공짜입니다. 조건 없이.",
    body: [
      "좋은 마이크와 프리앰프로 녹음해도, 컴프레서와 새츄레이션을 거치고 나면 ㅅ 소리가 귀를 찌릅니다. 입술이 붙었다 떨어지는 쩝 소리와 숨소리도 같이 커집니다.",
      "걱정 마세요. **Just-DS가 다 잡아 줍니다. 공짜로.**",
    ],
    quote: "Pro-DS 살 필요가 없어졌다.",
    quoteBy: "사용자 후기",
  },
  detection: {
    eyebrow: "Accurate detection ×3",
    title: "치찰음, 파열음, 숨소리. 따로 잡습니다.",
    lede: "보컬 한 줄에는 Single Vocal, 드럼이나 믹스 전체에는 Allround. 여기에 일반 디에서에는 없는 검출기가 둘 더 있습니다. ㅌ 파열음·입소리용 하나, 숨소리·후음(ㅎ)용 하나. 노브도 셋, 혀도 셋.",
    cards: [
      {
        path: "sib", tag: "Pro-DS도 함", tagNew: false, title: "Sibilance", sub: "치찰·파찰음 — ㅅ · ㅆ · 거친 ㅈ · ㅊ", rotate: -150,
        body: "귀를 찌르는 고역 마찰음을 찾아서 줄입니다. SPLIT은 검출 대역만, WIDE는 신호 전체를 감쇄합니다.",
        spec: "최대 감쇄 **15 dB** · 검출 대역 HP/LP 지정",
      },
      {
        path: "click", tag: "Pro-DS엔 없음", tagNew: true, title: "Plosives & Clicks", sub: "파열음·입소리 — ㅌ · 쩝 · 혀 차는 소리", rotate: -205,
        body: "짧고 날카로운 ㅌ 계열 파열음과, 입술과 혀에서 나는 클릭을 잡습니다. 마이크 가까이에서 부른 보컬일수록 차이가 큽니다.",
        spec: "최대 감쇄 **6 dB** · 검출 대역 HP/LP 지정",
      },
      {
        path: "breath", tag: "Pro-DS엔 없음", tagNew: true, title: "Breaths", sub: "숨소리·후음 — ㅎ · 들숨 · 바람 소리", rotate: -255,
        body: "주기성이 깨진 바람 소리만 골라서, 숨이 많이 섞인 ㅎ과 들숨을 부드럽게 다듬습니다. 음정이 있는 모음은 대상에서 뺍니다.",
        spec: "최대 감쇄 **12 dB** · 검출 대역 지정",
      },
    ],
  },
  demo: {
    title: "직접 해 보세요!",
    note: "노브를 위아래로 드래그하거나 방향키로 조절하세요. 동작 방식을 보여주는 시뮬레이션입니다. 체험판 다운로드는 필요 없습니다.",
    canvasLabel: "보컬 파형 시뮬레이션. 색칠된 부분이 각 처리가 줄인 양입니다.",
    knobs: {
      sib: { label: "치찰음", aria: "치찰음 감쇄량" },
      click: { label: "클릭", aria: "클릭·입소리 감쇄량" },
      breath: { label: "숨소리", aria: "숨소리 감쇄량" },
    },
  },
  listen: {
    title: "들어 보세요",
    note: "실제 보컬을 Just-DS로 처리한 결과입니다.",
    canvasLabel: "보컬 파형. 색칠된 부분과 위쪽 곡선이 선택한 처리가 줄인 양입니다. 클릭하면 그 위치로 이동합니다.",
    loading: "불러오는 중…",
    play: "재생",
    pause: "일시정지",
    ab: "원본과 번갈아 듣기",
    abAria: "원본과 처리 결과를 번갈아 듣기",
    tracks: { original: "원본", sib: "치찰음", click: "파열음", breath: "후음", all: "세 가지 모두" },
    momentsTitle: "여기를 들어 보세요",
    rulerAria: "구간 반복 막대. 드래그해 반복할 구간을 지정합니다.",
    rulerHint: "여기를 드래그해 반복할 구간을 지정하세요",
    cycle: "구간 반복",
    cycleClear: "구간 지우기",
    zoomOut: "전체 보기",
    hints: {
      sib: "s·sh 소리가 덜 따갑습니다",
      click: "입술·혀에서 나는 짧은 클릭이 줄어듭니다",
      breath: "단어 사이 들숨이 작아집니다",
    },
    deltaAria: "DELTA: 선택한 처리가 줄인 소리만 듣기",
    deltaHint: "DELTA를 켜면 줄어든 소리 중 이 대역만 들립니다. 핸들을 끌어 범위를 바꿔 보세요.",
    deltaPick: "치찰음·파열음·후음 중 하나를 고르면 대역을 조절할 수 있습니다.",
    bandLabel: { sib: "치찰음 검출 대역", click: "ㅌ·입소리 검출 대역", breath: "ㅎ·숨소리 검출 대역", all: "듣는 대역" },
    bandAria: "DELTA로 들을 주파수 대역. 핸들을 드래그해 조절합니다.",
    bandLow: "대역 아래쪽",
    bandHigh: "대역 위쪽",
    bandReset: "기본값으로",
  },
  guide: {
    eyebrow: "How it works",
    title: "치찰음·파열음·숨소리 제거, 이렇게 합니다.",
    lede: "Just-DS는 소리마다 검출기를 따로 둡니다. 무엇을, 얼마나, 어떻게 줄이는지 정리했습니다.",
    factsTitle: "Just-DS 한눈에 보기",
    facts: [
      { k: "가격", v: "무료 (구독·계정·체험 기간 없음)" },
      { k: "제거하는 소리", v: "치찰음(ㅅ·ㅆ·ㅊ), ㅌ 파열음·입소리, 숨소리·후음(ㅎ)" },
      { k: "포맷", v: "VST3 (Windows·macOS), AU (macOS)" },
      { k: "지원 환경", v: "Windows 64비트, macOS 11 이상 (Apple Silicon·Intel)" },
      { k: "최대 감쇄", v: "치찰음 15 dB · 파열음·클릭 6 dB · 숨소리 12 dB" },
      { k: "지연", v: "LOOKAHEAD 켬 150 ms (DAW 자동 보상) · 끔 0 ms" },
      { k: "개발", v: "Volta (voltamix.studio)" },
      { k: "버전", v: `${VERSION}` },
    ],
    items: [
      { q: "디에서는 무슨 일을 하나요?", a: "디에서는 보컬의 ㅅ·ㅆ·ㅊ처럼 귀를 찌르는 치찰음이 나오는 순간에만 소리를 줄여서, 나머지 목소리의 밝기는 그대로 둡니다. Just-DS는 보컬용 Single Vocal 검출과 범용 Allround 검출, Split·Wide 처리를 모두 지원합니다." },
      { q: "파열음과 입소리는 어떻게 줄이나요?", a: "치찰음과 별도인 검출기가 3–11 kHz 대역에서 짧고 날카롭게 튀는 소리, 즉 ㅌ 계열 파열음과 쩝·혀 차는 소리를 찾아 그 순간만 최대 6 dB 줄입니다. 노래하는 음과 치찰음은 다른 처리에 맡깁니다." },
      { q: "숨소리와 후음(ㅎ)은 어떻게 줄이나요?", a: "음정이 없고 배음이 흐트러진 바람 소리가 300 Hz–2.5 kHz 대역(조절 가능)에 일정 시간 이어지면 숨소리나 ㅎ으로 보고 최대 12 dB 줄입니다. 음정이 있는 모음은 건드리지 않습니다." },
      { q: "일반 디에서로는 왜 부족한가요?", a: "일반 디에서는 치찰음만 듣습니다. 파열음과 숨소리는 나는 대역도, 모양도 달라서 놓치거나, 잡으려다 보컬 전체를 눌러 버립니다. Just-DS는 소리마다 검출기와 노브를 따로 둡니다." },
    ],
  },
  blocks: [
    {
      id: "everything", eyebrow: "Everything you need", title: "필요한 건 다 있습니다.",
      body: "Split 처리, lookahead, 스테레오 링크, 오버샘플링. 그리고 Mid/Side, 외부 사이드체인, 처리마다 따로 정하는 검출 대역과 Split / Wide까지. 다 들어 있습니다.",
      bullets: ["처리마다 Split / Wide", "Lookahead 0–15 ms · 끄면 지연 0 ms", "Stereo Link 0–100 % · Mid / Side", "외부 사이드체인 · 2× / 4× 오버샘플링", "처리마다 검출 대역(HP/LP) 지정"],
      img: "/assets/img/ui-manual-ko.webp", alt: "Just-DS 화면: LOOKAHEAD를 끄고 지연 0 ms로 동작하는 상태",
      caption: "LOOKAHEAD를 끄면 지연 0 ms. 녹음하면서 모니터링할 때도 그대로 걸어 둘 수 있습니다.",
    },
    {
      id: "goodies", eyebrow: "Just-DS goodies", title: "덤으로 주는 것들.",
      body: "처리별 청취와 DELTA, 팩토리 프리셋, 그리고 손에 익은 MIDI 컨트롤러로 노브를 돌리는 MIDI Learn. 같은 구간을 몇 번 돌려도, 중간부터 재생해도 결과는 같습니다.",
      bullets: ["MIDI Learn: 조절부를 클릭하고 컨트롤러를 움직이면 연결", "처리별 청취(헤드폰 버튼) · DELTA", "팩토리 프리셋 4종 · A/B · Undo/Redo", "반복·중간 재생에도 같은 결과", "한국어 / English UI"],
      img: "/assets/img/ui-midi-ko.webp", alt: "Just-DS MIDI Learn 화면: 연결할 수 있는 조절부마다 테두리가 표시되고, 세 노브에 CC 번호가 붙어 있음",
      caption: "MIDI Learn 화면. 조절부를 클릭하고 컨트롤러를 움직이면 연결됩니다. 연결은 프로젝트와 함께 저장됩니다.",
    },
  ],
  compare: {
    eyebrow: "Pro-DS vs Just-DS",
    title: "기능은 그대로. 거기에 더.",
    lede: "Pro-DS의 핵심 기능은 그대로 갖췄고, 없는 기능을 더했습니다. 직접 비교해 보세요.",
    caption: "FabFilter Pro-DS와 Just-DS 기능 비교",
    cols: ["기능", "FabFilter Pro-DS", "Just-DS"],
    extraBadge: "추가",
    rows: [
      { label: "치찰음 제거", them: YES_KO, us: YES_KO },
      { label: "Single Vocal / Allround 검출", them: YES_KO, us: YES_KO },
      { label: "Split / Wide 처리", them: YES_KO, us: YES_KO, note: "세 처리 각각 따로" },
      { label: "Lookahead (최대 15 ms)", them: YES_KO, us: YES_KO, note: "끄면 지연 0 ms (녹음용)" },
      { label: "검출 대역 HP/LP 필터", them: YES_KO, us: YES_KO, note: "세 처리 각각 따로" },
      { label: "스테레오 링크 · Mid/Side 처리", them: YES_KO, us: YES_KO },
      { label: "최대 4배 오버샘플링", them: YES_KO, us: YES_KO },
      { label: "A/B 비교 · Undo/Redo", them: YES_KO, us: YES_KO },
      { label: "MIDI Learn", them: YES_KO, us: YES_KO },
      { label: "클릭·입소리·ㅌ 파열음 제거", them: NO_KO, us: YES_KO, extra: true },
      { label: "숨소리·ㅎ 제거", them: NO_KO, us: YES_KO, extra: true },
      { label: "한국어 UI", them: NO_KO, us: YES_KO, extra: true },
    ],
    footnote:
      "Pro-DS 항목은 FabFilter 공식 제품 페이지의 기능 목록을 기준으로 2026년 11월에 확인했습니다. FabFilter와 Pro-DS는 FabFilter Software Instruments의 상표이며, Just-DS는 FabFilter와 아무 관련이 없습니다.",
  },
  keyFeatures: {
    eyebrow: "Key features",
    title: "주요 기능",
    items: [
      "보컬용 Single Vocal 검출과 범용 Allround 검출",
      "클릭·입소리(ㅌ 파열음) 전용 검출과 감쇄",
      "숨소리(ㅎ·들숨) 전용 검출과 감쇄",
      "처리별 색으로 줄어든 부분을 보여주는 실시간 디스플레이",
      "처리마다 따로 정하는 검출 대역(HP/LP)",
      "처리마다 Split / Wide 선택",
      "Lookahead 0–15 ms, 끄면 지연 0 ms 라이브 모드",
      "Stereo Link 0–100 %",
      "Mid만 / Side만 처리",
      "외부 사이드체인 입력",
      "2× / 4× 오버샘플링",
      "MIDI Learn: 노브·스위치를 MIDI 컨트롤러에 연결, 프로젝트와 기본값으로 저장",
      "처리별 청취와 DELTA 모니터링",
      "팩토리 프리셋 4종(Male/Female × Split/Wide)",
      "A/B 비교와 Undo/Redo",
      "IN / GR / OUT 미터",
      "반복 재생·중간부터 재생해도 같은 결과",
      "한국어 / English UI",
      "네트워크 요청·계정·업로드 없음",
      "Windows VST3, macOS VST3 · AU",
      "그리고 영원히 무료",
    ],
  },
  download: {
    eyebrow: "Download",
    title: "다운로드. 결제창은 없습니다.",
    lede: "이메일도 안 받습니다. 내려받고, 폴더에 넣고, DAW에서 다시 스캔하면 끝.",
    soonLabel: "곧 공개",
    soonNote: "빌드를 준비하고 있습니다.",
    cards: [
      { platform: "windows", name: "Windows", reqs: ["Windows 64-bit", "VST3 · 64비트 VST3 지원 DAW"], path: "C:\\Program Files\\Common Files\\VST3\\Just-DS.vst3", ready: "Windows용 다운로드" },
      { platform: "mac", name: "macOS", reqs: ["macOS 11 이상 · Apple Silicon / Intel", "VST3 · AU (Logic Pro)"], path: "/Library/Audio/Plug-Ins/Components/Just-DS.component", ready: "macOS용 다운로드" },
    ],
    versionLine: `버전 ${VERSION} · DAW 플러그인 목록에서 **Volta › Just-DS**로 찾을 수 있습니다.`,
  },
  info: {
    title: "Information",
    blocks: [
      { title: "플러그인 포맷", lines: ["Windows: VST3 (64-bit)", "macOS: VST3, Audio Units", "AAX(Pro Tools)·CLAP은 아직 없습니다."] },
      { title: "지연", lines: ["LOOKAHEAD 켬: 150 ms (DAW가 자동 보상)", "LOOKAHEAD 끔: 0 ms (녹음 모니터링용)"] },
      { title: "도움말", lines: ["노브 세 개라 튜토리얼 영상은 없습니다.", "궁금한 건 아래 FAQ에."] },
      { title: "개인정보", lines: ["모든 처리는 내 컴퓨터 안에서.", "네트워크 요청·계정·업로드 없음."] },
    ],
  },
  bundles: {
    title: "Just-DS가 포함된 번들",
    body: "없습니다. 번들을 살 필요가 없으니까요.",
    tiles: [
      { name: "올인원 번들", price: "해당 없음" },
      { name: "이펙트 번들", price: "해당 없음" },
      { name: "Just-DS 단품", price: "$0" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    items: [
      { q: "정말 무료인가요?", a: "네. 구독, 계정, 체험 기간, 기능 제한이 없습니다. 내려받아서 쓰면 끝입니다." },
      { q: "FabFilter Pro-DS 무료 대안이 있나요?", a: "Just-DS가 그 대안입니다. Pro-DS의 핵심 기능(Single Vocal / Allround 검출, Split / Wide 처리, 최대 15 ms Lookahead, 스테레오 링크, Mid/Side, 최대 4배 오버샘플링)을 갖췄고, 파열음·입소리·숨소리 제거를 더했습니다. 무료이며 FabFilter와는 관련이 없습니다." },
      { q: "왜 무료예요?", a: "보컬 정리에 돈을 낼 필요는 없다고 생각했습니다. 그래서 더 많이 하는 걸 만들고, 값은 받지 않기로 했습니다." },
      { q: "FabFilter와 관련이 있나요?", a: "아니요. Just-DS는 Volta가 직접 만든 플러그인이며 FabFilter와 제휴, 후원, 보증 관계가 없습니다. 화면은 Pro-DS를 패러디한 디자인이고, 모든 그래픽과 코드는 직접 만들었습니다." },
      { q: "어떤 DAW에서 쓸 수 있나요?", a: "Ableton Live, FL Studio, Cubase, Studio One, Reaper, Logic Pro(AU)처럼 VST3 또는 AU 플러그인을 쓰는 64비트 DAW라면 됩니다. Windows는 VST3, macOS는 VST3와 AU를 제공합니다. Pro Tools용 AAX는 아직 지원하지 않습니다." },
      { q: "Logic Pro에서 MIDI Learn이 안 돼요.", a: "Logic은 일반 오디오 이펙트에 MIDI를 보내지 않습니다. 그래서 macOS 설치 파일에 **Just-DS MIDI**를 함께 넣었습니다. Audio FX 대신 **MIDI-controlled Effects › Volta › Just-DS MIDI**로 넣으면 MIDI Learn을 쓸 수 있습니다. 소리는 Just-DS와 같습니다." },
      { q: "지연(레이턴시)이 있나요?", a: "LOOKAHEAD를 켜면 정밀 분석을 위해 150 ms의 지연을 DAW에 알리고, DAW가 자동으로 보상합니다. 녹음하면서 모니터링할 때는 LOOKAHEAD를 끄면 지연 0 ms로 동작합니다." },
      { q: "ㅍ·ㅂ(P·B) 같은 저음 팝 노이즈도 없애나요?", a: "직접 없애지는 않습니다. ㅍ·ㅂ 팝은 숨이 마이크에 부딪혀 생기는 저음 덩어리입니다. Just-DS의 파열음 처리는 ㅌ처럼 날카로운 고역 파열음과 입소리를 대상으로 합니다. 저음 팝은 하이패스 필터나 전용 팝 제거 플러그인으로 먼저 정리하세요." },
      { q: "영어 보컬에도 쓸 수 있나요?", a: "네. 한국어 보컬로 다듬었지만 s, sh, ch 같은 치찰음과 t 클릭, h 숨소리는 영어에서도 같은 성격의 소리라 그대로 잡습니다." },
      { q: "오디오가 외부로 전송되나요?", a: "아니요. 모든 처리는 컴퓨터 안에서만 이루어집니다. 네트워크 요청, 계정, 업로드가 없습니다." },
    ],
  },
  final: { title: "돈 낼 필요 없습니다. 그냥 가져가세요.", lede: "치찰음, 클릭, 숨소리. 노브 세 개로 끝.", cta: "Just-DS 무료 다운로드" },
  footer: {
    aria: "하단 메뉴",
    otherLang: { href: "/en", hreflang: "en", label: "English" },
    legal:
      "FabFilter와 Pro-DS는 FabFilter Software Instruments B.V.의 상표입니다. Just-DS는 독립적으로 개발한 제품이며 FabFilter와 제휴, 후원, 보증 관계가 없습니다. 비교 내용은 공개된 정보를 바탕으로 작성했습니다. VST는 Steinberg Media Technologies GmbH의 상표이며, Audio Units와 macOS는 Apple Inc.의 상표입니다.",
  },
  hint: { lang: "en", text: "Looking for English?", link: "Read it in English →", href: "/en", close: "Close" },
  schema: {
    pageName: "무료 디에서 플러그인 Just-DS — 치찰음·파열음·숨소리 제거",
    description: "치찰음, ㅌ 파열음·입소리, 숨소리·후음(ㅎ)을 각각 따로 찾아 줄이는 무료 디에서 VST3/AU 플러그인. Windows·macOS.",
    featureList: [
      "무료 디에서: 치찰음 제거 (Single Vocal / Allround 검출)", "ㅌ 파열음·입소리·클릭 제거", "숨소리·후음(ㅎ) 제거", "Split / Wide 처리",
      "Lookahead 0–15 ms, 끄면 지연 0 ms", "검출 대역 HP/LP 필터", "Stereo Link 0–100 %, Mid/Side 처리", "외부 사이드체인",
      "2× / 4× 오버샘플링", "MIDI Learn", "A/B 비교, Undo/Redo, 프리셋", "한국어 / English UI",
    ],
  },
};

export const en: Dict = {
  lang: "en",
  path: "/en",
  meta: {
    title: "Free De-esser Plugin (VST3/AU): Remove Sibilance, Plosives & Breaths | Just-DS by Volta",
    description:
      "Just-DS is a free de-esser plugin for Windows and macOS (VST3/AU). It removes harsh sibilance, plosive T clicks, mouth noise and breaths from vocals. A free Pro-DS alternative. No subscription, no account.",
    keywords: ["free de-esser", "free de-esser plugin", "free de-esser VST", "de-esser VST3", "plosive removal plugin", "remove plosives from vocals", "breath remover plugin", "remove breaths from vocals", "mouth click removal", "free Pro-DS alternative", "free vocal plugin"],
    ogTitle: "Just-DS — The free de-esser that also removes plosives and breaths",
    ogDescription: "Remove sibilance, plosive T clicks, mouth noise and breaths from vocals. Free VST3/AU for Windows and macOS. No subscription, no account.",
    ogImage: "/og/og-en.png",
    ogImageAlt: "A gold knob sticking its tongue out next to the Just-DS plugin, free forever",
    ogLocale: "en_US",
    ogLocaleAlt: "ko_KR",
  },
  skip: "Skip to content",
  nav: { aria: "Main", features: "Features", compare: "Compare", download: "Download", faq: "FAQ", shop: "Shop", shopAria: "Shop — nothing to buy" },
  langToggle: { aria: "Language" },
  headerCta: "Free download",
  hero: {
    eyebrow: "Free de-esser · plosive & breath remover",
    tagline: "Free. Really.",
    claim: ["Everything Pro-DS does.", "Plus plosives & breaths.", "For"],
    priceAria: "Price comparison",
    priceNote: "Free forever · no subscription, account or trial",
    ctaPrimary: "Free download",
    ctaTrialOld: "30-day trial",
    ctaTrialNew: "Forever trial",
    metaAria: "Platforms",
    meta: ["Windows · macOS", "VST3 · AU", "English / Korean UI"],
    img: "/assets/img/ui-auto-en.webp",
    imgAlt: "Just-DS main screen: a waveform display showing sibilance, click and breath reduction, and three gold knobs sticking their tongues out",
    badge: "FREE",
  },
  ticker: ["Free forever", "Free de-esser", "Sibilance", "Plosives", "Breaths", "No subscription", "No account", "No trial", "$0.00"],
  intro: {
    title: "Free. No strings attached.",
    body: [
      "Even with great mics and pre-amps, compression and saturation push sibilance in your face. Lip smacks and breaths come up with it.",
      "But don't worry. **Just-DS comes to the rescue. For free.**",
    ],
    quote: "No need to buy Pro-DS anymore.",
    quoteBy: "User review (translated from Korean)",
  },
  detection: {
    eyebrow: "Accurate detection ×3",
    title: "Sibilance, plosives, breaths. Caught separately.",
    lede: "Single Vocal for a lead line, Allround for drums and full mixes, as you'd expect. Then Just-DS adds two detectors a regular de-esser doesn't have: one for plosive T clicks and mouth noise, one for breaths and h sounds. Three knobs, three tongues.",
    cards: [
      {
        path: "sib", tag: "Pro-DS does this too", tagNew: false, title: "Sibilance", sub: "S · SH · CH · harsh Z and J", rotate: -150,
        body: "Finds the piercing high-frequency hiss and pulls it down. SPLIT works only inside the detection band; WIDE turns down the whole signal.",
        spec: "Up to **15 dB** · HP/LP detection band",
      },
      {
        path: "click", tag: "Pro-DS can't", tagNew: true, title: "Plosives & Clicks", sub: "Plosive T · lip smacks · mouth clicks", rotate: -205,
        body: "Catches short, sharp t-type plosives and the clicks lips and tongues make. The closer the singer was to the mic, the bigger the difference.",
        spec: "Up to **6 dB** · HP/LP detection band",
      },
      {
        path: "breath", tag: "Pro-DS can't", tagNew: true, title: "Breaths", sub: "Breaths · inhales · breathy H", rotate: -255,
        body: "Picks out only the airy, non-pitched noise, and softens breathy h's and inhales. Pitched vowels are left alone.",
        spec: "Up to **12 dB** · adjustable detection band",
      },
    ],
  },
  demo: {
    title: "Try it yourself!",
    note: "Drag a knob up or down, or use the arrow keys. This is a simulation of how it works. No trial download required.",
    canvasLabel: "Simulated vocal waveform. Coloured areas show how much each path removes.",
    knobs: {
      sib: { label: "Sibilance", aria: "Sibilance amount" },
      click: { label: "Clicks", aria: "Clicks amount" },
      breath: { label: "Breath", aria: "Breath amount" },
    },
  },
  listen: {
    title: "Hear it",
    note: "A real vocal processed with Just-DS.",
    canvasLabel: "Vocal waveform. Coloured areas and the curve on top show what the selected processing removed. Click to jump there.",
    loading: "Loading…",
    play: "Play",
    pause: "Pause",
    ab: "Flip with original",
    abAria: "Switch between the original and the processed vocal",
    tracks: { original: "Original", sib: "Sibilance", click: "Clicks", breath: "Breaths", all: "All three" },
    momentsTitle: "Listen here",
    rulerAria: "Loop bar. Drag to set a section to repeat.",
    rulerHint: "Drag here to set a section to loop",
    cycle: "Loop",
    cycleClear: "Clear loop",
    zoomOut: "Show full take",
    hints: {
      sib: "S and SH sounds get less harsh",
      click: "Short lip and tongue clicks get quieter",
      breath: "Breaths between words get quieter",
    },
    deltaAria: "DELTA: hear only what the selected processing removed",
    deltaHint: "With DELTA on you hear only the removed sound inside this band. Drag the handles to change it.",
    deltaPick: "Pick Sibilance, Clicks or Breaths to adjust the band.",
    bandLabel: { sib: "SIBILANCE DETECTION", click: "CLICK DETECTION", breath: "BREATH DETECTION", all: "LISTEN BAND" },
    bandAria: "Frequency band heard in DELTA. Drag the handles to adjust it.",
    bandLow: "Band low edge",
    bandHigh: "Band high edge",
    bandReset: "Reset",
  },
  guide: {
    eyebrow: "How it works",
    title: "Free de-essing, plosive removal and breath removal, explained.",
    lede: "Just-DS gives each problem sound its own detector. Here is what it removes, by how much, and how.",
    factsTitle: "Just-DS at a glance",
    facts: [
      { k: "Price", v: "Free (no subscription, account or trial)" },
      { k: "Removes", v: "Sibilance (s, sh, ch), plosive T and mouth clicks, breaths and h sounds" },
      { k: "Formats", v: "VST3 (Windows, macOS), AU (macOS)" },
      { k: "Systems", v: "Windows 64-bit; macOS 11 or later (Apple Silicon and Intel)" },
      { k: "Max reduction", v: "Sibilance 15 dB · plosives/clicks 6 dB · breaths 12 dB" },
      { k: "Latency", v: "150 ms with lookahead on (compensated by the DAW) · 0 ms with lookahead off" },
      { k: "Developer", v: "Volta (voltamix.studio)" },
      { k: "Version", v: `${VERSION}` },
    ],
    items: [
      { q: "What does a de-esser do?", a: "A de-esser turns down harsh sibilance, the hissy s, sh and ch sounds in a vocal, only at the moments it happens, so the rest of the voice keeps its brightness. Just-DS does this with Single Vocal detection for a lead vocal or Allround detection for any other material, in split-band or wide-band mode." },
      { q: "How does Just-DS remove plosives and mouth clicks?", a: "A separate detector looks for short, sharp transients in the 3–11 kHz range that are not sibilance: t-type plosives, lip smacks and tongue clicks. It reduces only those moments, by up to 6 dB, and leaves sung notes and sibilance to the other paths." },
      { q: "How does Just-DS remove breaths?", a: "The breath path looks for airy, non-pitched sound: no clear pitch, broken-up harmonics and energy in the 300 Hz–2.5 kHz band (adjustable). When that lasts long enough to be a breath or a breathy h, it is reduced by up to 12 dB. Pitched vowels are not touched." },
      { q: "Why not just use a regular de-esser?", a: "A regular de-esser only listens for sibilance. Plosive clicks and breaths sit in different frequency ranges and behave differently, so a de-esser either misses them or squashes the whole vocal trying to catch them. Just-DS gives each problem its own detector and its own knob." },
    ],
  },
  blocks: [
    {
      id: "everything", eyebrow: "Everything you need", title: "Everything you need. It's all there.",
      body: "Split-band processing, look-ahead, stereo linking, oversampling. Plus mid/side, external side-chain, and a detection band and split / wide choice for each path. It's all there.",
      bullets: ["Split / Wide for each path", "Lookahead 0–15 ms · zero latency when off", "Stereo link 0–100 % · Mid / Side", "External side-chain · 2x / 4x oversampling", "HP/LP detection band for each path"],
      img: "/assets/img/ui-manual-en.webp", alt: "Just-DS with LOOKAHEAD switched off, running at zero latency",
      caption: "Switch LOOKAHEAD off for zero latency, so you can leave it on while tracking.",
    },
    {
      id: "goodies", eyebrow: "Just-DS goodies", title: "Goodies, on the house.",
      body: "Listen to each path on its own, flip on DELTA, start from a factory preset, and put the knobs on the MIDI controller you already own with MIDI Learn. Loop it thirty times or start mid-song: same result every pass.",
      bullets: ["MIDI Learn: click a control, move a controller", "Listen per path (headphone button) · DELTA", "4 factory presets · A/B · Undo/Redo", "Same result on every pass", "English / Korean UI"],
      img: "/assets/img/ui-midi-en.webp", alt: "Just-DS MIDI Learn screen: every learnable control is outlined and the three knobs show their CC numbers",
      caption: "MIDI Learn mode. Click a control, move a controller, done. Assignments are saved with your project.",
    },
  ],
  compare: {
    eyebrow: "Pro-DS vs Just-DS",
    title: "Same features. Plus more.",
    lede: "Every core Pro-DS feature is here, plus the ones it never had. See for yourself.",
    caption: "Feature comparison: FabFilter Pro-DS vs Just-DS",
    cols: ["Feature", "FabFilter Pro-DS", "Just-DS"],
    extraBadge: "Extra",
    rows: [
      { label: "Sibilance removal", them: "Yes", us: "Yes" },
      { label: "Single Vocal / Allround detection", them: "Yes", us: "Yes" },
      { label: "Split / Wide band processing", them: "Yes", us: "Yes", note: "Separately for each path" },
      { label: "Lookahead (up to 15 ms)", them: "Yes", us: "Yes", note: "Zero latency when off, for tracking" },
      { label: "HP/LP detection filters", them: "Yes", us: "Yes", note: "Separately for each path" },
      { label: "Stereo linking · Mid/Side", them: "Yes", us: "Yes" },
      { label: "Up to 4x oversampling", them: "Yes", us: "Yes" },
      { label: "A/B compare · Undo/Redo", them: "Yes", us: "Yes" },
      { label: "MIDI Learn", them: "Yes", us: "Yes" },
      { label: "Mouth click & plosive T removal", them: "No", us: "Yes", extra: true },
      { label: "Breath & H removal", them: "No", us: "Yes", extra: true },
    ],
    footnote:
      "Pro-DS details are taken from the feature list on FabFilter's official product page, checked in November 2026. FabFilter and Pro-DS are trademarks of FabFilter Software Instruments; Just-DS is not affiliated with FabFilter in any way.",
  },
  keyFeatures: {
    eyebrow: "Key features",
    title: "Key features",
    items: [
      "'Single Vocal' detection for vocals and 'Allround' detection for anything else",
      "Dedicated detection and reduction for mouth clicks and plosive t's",
      "Dedicated detection and reduction for breaths and h's",
      "Real-time display that colours what each path removes",
      "Separate HP/LP detection band for each path",
      "Split or Wide processing for each path",
      "Lookahead 0–15 ms, zero-latency live mode when off",
      "Stereo link 0–100 %",
      "Mid-only or side-only processing",
      "External side-chain input",
      "2x / 4x oversampling",
      "MIDI Learn: map knobs and switches to a MIDI controller, saved with the project and as your default",
      "Listen to each path on its own, plus DELTA monitoring",
      "4 factory presets (Male/Female × Split/Wide)",
      "A/B comparison and undo/redo",
      "IN / GR / OUT meters",
      "Same result when looping or starting mid-song",
      "English / Korean UI",
      "No network requests, no account, no uploads",
      "VST3 on Windows, VST3 and AU on macOS",
      "And it's free. Forever.",
    ],
  },
  download: {
    eyebrow: "Download",
    title: "Download. There's no checkout.",
    lede: "We don't even want your email. Download it, drop it in the plug-in folder, rescan in your DAW. Done.",
    soonLabel: "Coming soon",
    soonNote: "The build is on its way.",
    cards: [
      { platform: "windows", name: "Windows", reqs: ["Windows 64-bit", "VST3 · any 64-bit VST3 host"], path: "C:\\Program Files\\Common Files\\VST3\\Just-DS.vst3", ready: "Download for Windows" },
      { platform: "mac", name: "macOS", reqs: ["macOS 11 or later · Apple Silicon / Intel", "VST3 · AU (Logic Pro)"], path: "/Library/Audio/Plug-Ins/Components/Just-DS.component", ready: "Download for macOS" },
    ],
    versionLine: `Version ${VERSION} · Find it in your DAW's plug-in list under **Volta › Just-DS**.`,
  },
  info: {
    title: "Information",
    blocks: [
      { title: "Plug-in formats", lines: ["Windows: VST3 (64-bit)", "macOS: VST3, Audio Units", "No AAX (Pro Tools) or CLAP yet."] },
      { title: "Latency", lines: ["LOOKAHEAD on: 150 ms (compensated by your DAW)", "LOOKAHEAD off: 0 ms (for tracking)"] },
      { title: "Help", lines: ["It's three knobs. There's no tutorial video.", "Questions? See the FAQ below."] },
      { title: "Privacy", lines: ["Everything runs on your computer.", "No network requests, no account, no uploads."] },
    ],
  },
  bundles: {
    title: "Just-DS is included in",
    body: "Nothing. You don't need a bundle for something that's free.",
    tiles: [
      { name: "Everything bundle", price: "n/a" },
      { name: "Effects bundle", price: "n/a" },
      { name: "Just-DS on its own", price: "$0" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions",
    items: [
      { q: "Is it really free?", a: "Yes. No subscription, no account, no trial period and nothing locked. Download it and use it." },
      { q: "Is there a free alternative to FabFilter Pro-DS?", a: "Yes: Just-DS. It has the core Pro-DS feature set (Single Vocal / Allround detection, split / wide processing, lookahead up to 15 ms, stereo linking, mid/side, up to 4x oversampling) and adds plosive, mouth-click and breath removal. It is free and not affiliated with FabFilter." },
      { q: "Why is it free?", a: "We don't think cleaning up a vocal should cost money. So we built one that does more, and decided not to charge for it." },
      { q: "Is it affiliated with FabFilter?", a: "No. Just-DS is made by Volta and is not affiliated with, sponsored or endorsed by FabFilter. The interface is a parody of Pro-DS, and every graphic and line of code is our own." },
      { q: "Which DAWs does it work in?", a: "Any 64-bit DAW that hosts VST3 or AU plug-ins, such as Ableton Live, FL Studio, Cubase, Studio One, Reaper and Logic Pro (AU). Windows gets VST3; macOS gets VST3 and AU. AAX for Pro Tools isn't supported yet." },
      { q: "MIDI Learn doesn't work in Logic Pro.", a: "Logic doesn't send MIDI to regular audio effects, so the macOS installer also includes **Just-DS MIDI**. Insert it from **MIDI-controlled Effects › Volta › Just-DS MIDI** instead of Audio FX and MIDI Learn works. It sounds exactly like Just-DS." },
      { q: "Does it add latency?", a: "With LOOKAHEAD on, it reports 150 ms to the DAW for precise analysis, and the DAW compensates automatically. Turn LOOKAHEAD off while tracking and it runs at zero latency." },
      { q: "Does it remove P and B pops?", a: "Not directly. P and B pops are low-frequency bursts of air hitting the microphone. Just-DS's plosive path targets sharp, high-frequency t-type plosives and mouth clicks. For low-frequency pops, use a high-pass filter or a dedicated pop remover before Just-DS." },
      { q: "Does it work on English vocals?", a: "Yes. It was tuned on Korean vocals, but s, sh and ch sibilance, t clicks and h breaths are the same kinds of sound in English, and it catches them the same way." },
      { q: "Does my audio leave my computer?", a: "No. Everything runs locally. No network requests, no account, no uploads." },
    ],
  },
  final: { title: "Don't pay for it. Just take it.", lede: "Sibilance, clicks, breaths. Three knobs and you're done.", cta: "Download Just-DS free" },
  footer: {
    aria: "Footer",
    otherLang: { href: "/ko", hreflang: "ko", label: "한국어" },
    legal:
      "FabFilter and Pro-DS are trademarks of FabFilter Software Instruments B.V. Just-DS is an independent product and is not affiliated with, sponsored or endorsed by FabFilter. Comparisons are based on publicly available information. VST is a trademark of Steinberg Media Technologies GmbH. Audio Units and macOS are trademarks of Apple Inc.",
  },
  hint: { lang: "ko", text: "한국어로 보시겠어요?", link: "한국어 페이지 →", href: "/ko", close: "닫기" },
  schema: {
    pageName: "Free De-esser Plugin Just-DS — Sibilance, Plosive & Breath Removal",
    description: "Free de-esser VST3/AU plugin for Windows and macOS that removes sibilance, plosive T clicks, mouth noise and breaths from vocals, each with its own detector.",
    featureList: [
      "Free de-esser: sibilance removal with Single Vocal / Allround detection", "Plosive T and mouth click removal", "Breath and h-sound removal",
      "Split / Wide band processing", "Lookahead 0–15 ms, zero latency when off", "HP/LP detection band filters",
      "Stereo link 0–100 %, mid/side processing", "External side-chain", "2x / 4x oversampling",
      "MIDI Learn", "A/B compare, undo/redo, presets", "English / Korean UI",
    ],
  },
};
