/* All page copy, per language. **text** renders as <strong>.
   The page flow follows the Pro-DS product page (hero → intro + quote → feature blocks →
   awards → key features → information → bundles) and parodies each block. */
import { PRO_DS_PRICE, VERSION } from "./site";

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
  meta: { title: string; description: string; ogTitle: string; ogDescription: string; ogImage: string; ogImageAlt: string; ogLocale: string; ogLocaleAlt: string };
  skip: string;
  nav: { aria: string; features: string; compare: string; download: string; faq: string; shop: string; shopAria: string };
  langSwitch: { href: string; hreflang: Lang; html: [string, string] };
  headerCta: string;
  hero: {
    eyebrow: string; h1Extra: string; tagline: string; claim: [string, string, string];
    priceAria: string; priceNote: string; ctaPrimary: string; ctaTrialOld: string; ctaTrialNew: string;
    metaAria: string; meta: string[]; img: string; imgAlt: string; badge: string;
  };
  ticker: string[];
  intro: { title: string; body: string[]; quote: string; quoteBy: string };
  detection: { eyebrow: string; title: string; lede: string; cards: Card[] };
  demo: { title: string; note: string; canvasLabel: string; knobs: Record<PathKey, { label: string; aria: string }> };
  blocks: Block[];
  compare: { eyebrow: string; title: string; lede: string; caption: string; cols: [string, string, string]; priceLabel: string; extraBadge: string; rows: Row[]; footnote: string };
  awards: { title: string; note: string; badges: { top: string; main: string; bottom: string }[] };
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
  path: "/",
  meta: {
    title: "Just-DS — 무료 디에서 VST3·AU | 치찰음·클릭·숨소리 제거, Pro-DS 무료 대안",
    description:
      "Just-DS는 치찰음(ㅅ·ㅆ·ㅊ)에 클릭·입소리(ㅌ)와 숨소리(ㅎ) 제거까지 하는 무료 디에서 플러그인입니다. Single Vocal/Allround, Split/Wide, Lookahead, Mid/Side, 4배 오버샘플링. Windows·macOS VST3/AU.",
    ogTitle: `Just-DS — ${PRO_DS_PRICE} 디에서가 하는 일, 무료로`,
    ogDescription: "치찰음은 기본, Pro-DS엔 없는 클릭·입소리·숨소리 제거까지. 구독·계정·체험 기간 없는 무료 VST3/AU 디에서.",
    ogImage: "/og/og-ko.png",
    ogImageAlt: `혀를 내민 금색 노브와 Just-DS 플러그인 화면, ${PRO_DS_PRICE} 대신 $0`,
    ogLocale: "ko_KR",
    ogLocaleAlt: "en_US",
  },
  skip: "본문으로 건너뛰기",
  nav: { aria: "주요 메뉴", features: "기능", compare: "비교", download: "다운로드", faq: "FAQ", shop: "Shop", shopAria: "Shop — 살 게 없습니다" },
  langSwitch: { href: "/en", hreflang: "en", html: ["KO", "EN"] },
  headerCta: "무료 다운로드",
  hero: {
    eyebrow: "무료 디에서 플러그인 · VST3 / AU",
    h1Extra: " — 무료 디에서 플러그인",
    tagline: "똑똑하고, 투명하고, 공짜.",
    claim: ["Pro-DS가 하는 일 그대로.", "입소리·숨소리까지 더해서.", "가격은"],
    priceAria: "가격 비교",
    priceNote: "FabFilter Pro-DS 공식 정가 대비 · 2026년 11월 기준",
    ctaPrimary: "무료 다운로드",
    ctaTrialOld: "30일 체험판",
    ctaTrialNew: "평생 체험판",
    metaAria: "지원 환경",
    meta: ["Windows · macOS", "VST3 · AU", "한국어 / English UI"],
    img: "/assets/img/ui-auto-ko.webp",
    imgAlt: "Just-DS 플러그인 메인 화면: 치찰·클릭·숨소리 감쇄를 보여주는 파형 디스플레이와 혀를 내민 금색 노브 세 개",
    badge: "-100%",
  },
  ticker: ["Free forever", "치찰음", "클릭", "숨소리", "No subscription", "No account", "No trial", "$0.00"],
  intro: {
    title: "똑똑하고 투명하게. 그리고 공짜로.",
    body: [
      "좋은 마이크와 프리앰프로 녹음해도, 컴프레서와 새츄레이션을 거치고 나면 ㅅ 소리가 귀를 찌릅니다. 입술이 붙었다 떨어지는 쩝 소리와 숨소리도 같이 커집니다.",
      "걱정 마세요. **Just-DS가 구하러 왔습니다. 공짜로.**",
    ],
    quote: `${PRO_DS_PRICE} 아꼈다.`,
    quoteBy: "당신의 지갑",
  },
  detection: {
    eyebrow: "Accurate detection ×3",
    title: "정확한 검출. 그것도 세 군데서.",
    lede: "보컬 한 줄에는 Single Vocal, 드럼이나 믹스 전체에는 Allround. 여기까지는 익숙하죠. Just-DS는 클릭과 숨소리를 찾는 검출기가 하나씩 더 있습니다. 노브도 셋, 혀도 셋.",
    cards: [
      {
        path: "sib", tag: "Pro-DS도 함", tagNew: false, title: "Sibilance", sub: "치찰·파찰음 — ㅅ · ㅆ · 거친 ㅈ · ㅊ", rotate: -150,
        body: "귀를 찌르는 고역 마찰음을 찾아서 줄입니다. SPLIT은 검출 대역만, WIDE는 신호 전체를 감쇄합니다.",
        spec: "최대 감쇄 **15 dB** · 검출 대역 HP/LP 지정",
      },
      {
        path: "click", tag: "Pro-DS엔 없음", tagNew: true, title: "Clicks", sub: "클릭·입소리 — ㅌ 파열음 · 쩝 · 혀 차는 소리", rotate: -205,
        body: "짧고 날카로운 ㅌ 계열 파열음과, 입술과 혀에서 나는 클릭을 잡습니다. 마이크 가까이에서 부른 보컬일수록 차이가 큽니다.",
        spec: "최대 감쇄 **6 dB** · 처리 대역 AUTO / MANUAL",
      },
      {
        path: "breath", tag: "Pro-DS엔 없음", tagNew: true, title: "Breath", sub: "숨소리 — ㅎ · 들숨 · 바람 소리", rotate: -255,
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
  blocks: [
    {
      id: "everything", eyebrow: "Everything you need", title: "필요한 건 다 있습니다.",
      body: "Split 처리, lookahead, 스테레오 링크, 오버샘플링. 그리고 Mid/Side, 외부 사이드체인, 처리마다 따로 정하는 검출·감쇄 대역까지. 다 들어 있습니다.",
      bullets: ["처리마다 Split / Wide", "Lookahead 0–15 ms · 끄면 지연 0 ms", "Stereo Link 0–100 % · Mid / Side", "외부 사이드체인 · 2× / 4× 오버샘플링", "감쇄 대역 AUTO 또는 MANUAL(Hz)"],
      img: "/assets/img/ui-manual-ko.webp", alt: "Just-DS 수동 대역 화면: 처리별 감쇄 대역을 Hz로 지정",
      caption: "감쇄 대역을 MANUAL로 바꾸면 처리마다 줄일 주파수 범위를 직접 정합니다.",
    },
    {
      id: "goodies", eyebrow: "Just-DS goodies", title: "덤으로 주는 것들.",
      body: "가장 거친 구간을 재생하면 목소리를 듣고 세 노브 값을 추천하는 LEARN, 처리별 청취, 팩토리 프리셋. 같은 구간을 몇 번 돌려도, 중간부터 재생해도 결과는 같습니다.",
      bullets: ["LEARN: 목소리 학습 후 노브 추천 · UNDO", "처리별 청취(헤드폰 버튼) · DELTA", "팩토리 프리셋 4종 · A/B · Undo/Redo", "반복·중간 재생에도 같은 결과", "한국어 / English UI"],
      img: "/assets/img/ui-learn-ko.webp", alt: "Just-DS LEARN 화면: 혀를 내민 큰 금색 노브가 목소리를 듣는 중",
      caption: "LEARN 화면. 거친 구간을 재생하는 동안 혀를 흔들며 목소리를 듣습니다.",
    },
  ],
  compare: {
    eyebrow: `${PRO_DS_PRICE} vs $0`,
    title: "틀린 그림 찾기. 가격 말고는 없습니다.",
    lede: "Pro-DS의 핵심 기능은 그대로 갖췄고, 없는 기능을 더했습니다. 직접 비교해 보세요.",
    caption: "FabFilter Pro-DS와 Just-DS 기능 비교",
    cols: ["기능", "FabFilter Pro-DS", "Just-DS"],
    priceLabel: "가격",
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
      { label: "클릭·입소리·ㅌ 파열음 제거", them: NO_KO, us: YES_KO, extra: true },
      { label: "숨소리·ㅎ 제거", them: NO_KO, us: YES_KO, extra: true },
      { label: "목소리 학습 후 자동 세팅 (LEARN)", them: NO_KO, us: YES_KO, extra: true },
      { label: "한국어 UI", them: NO_KO, us: YES_KO, extra: true },
    ],
    footnote:
      "Pro-DS 항목은 FabFilter 공식 제품 페이지의 기능 목록과 공식 스토어 정가(USD, 세금 별도)를 기준으로 2026년 11월에 확인했습니다. 할인 행사 중에는 판매가가 다를 수 있습니다. FabFilter와 Pro-DS는 FabFilter Software Instruments의 상표이며, Just-DS는 FabFilter와 아무 관련이 없습니다.",
  },
  awards: {
    title: "Awards",
    note: "아직 없습니다. 나온 지 얼마 안 됐거든요. 대신 이런 건 있습니다.",
    badges: [
      { top: "가격", main: "$0", bottom: "영원히" },
      { top: "구독", main: "없음", bottom: "월 0원" },
      { top: "계정", main: "없음", bottom: "가입 안 함" },
      { top: "체험 기간", main: "∞", bottom: "끝나지 않음" },
      { top: "혀", main: "3개", bottom: "노브마다" },
    ],
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
      "감쇄 대역 AUTO / MANUAL(Hz 직접 지정)",
      "처리마다 Split / Wide 선택",
      "Lookahead 0–15 ms, 끄면 지연 0 ms 라이브 모드",
      "Stereo Link 0–100 %",
      "Mid만 / Side만 처리",
      "외부 사이드체인 입력",
      "2× / 4× 오버샘플링",
      "LEARN: 목소리를 듣고 세 노브 값 추천, UNDO로 되돌리기",
      "처리별 청취와 DELTA 모니터링",
      "팩토리 프리셋 4종(Male/Female × Split/Wide)",
      "A/B 비교와 Undo/Redo",
      "IN / GR / OUT 미터",
      "반복 재생·중간부터 재생해도 같은 결과",
      "한국어 / English UI",
      "네트워크 요청·계정·업로드 없음",
      "Windows VST3, macOS VST3 · AU",
      `그리고 가격 $0 (Pro-DS 정가 ${PRO_DS_PRICE})`,
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
      { q: "왜 무료예요?", a: `보컬의 ㅅ 소리 하나 정리하는 데 ${PRO_DS_PRICE}를 내는 건 너무하다고 생각했습니다. 그래서 더 많이 하는 걸 만들고, 값은 받지 않기로 했습니다.` },
      { q: "FabFilter와 관련이 있나요?", a: "아니요. Just-DS는 Volta가 직접 만든 플러그인이며 FabFilter와 제휴, 후원, 보증 관계가 없습니다. 화면과 이 페이지는 Pro-DS를 패러디한 디자인이고, 모든 그래픽과 코드는 직접 만들었습니다." },
      { q: "어떤 DAW에서 쓸 수 있나요?", a: "VST3 또는 AU를 지원하는 64비트 DAW에서 쓸 수 있습니다. Windows는 VST3, macOS는 VST3와 AU를 제공합니다. Pro Tools용 AAX는 아직 지원하지 않습니다." },
      { q: "지연(레이턴시)이 있나요?", a: "LOOKAHEAD를 켜면 정밀 분석을 위해 150 ms의 지연을 DAW에 알리고, DAW가 자동으로 보상합니다. 녹음하면서 모니터링할 때는 LOOKAHEAD를 끄면 지연 0 ms로 동작합니다." },
      { q: "영어 보컬에도 쓸 수 있나요?", a: "네. 한국어 보컬로 다듬었지만 s, sh, ch 같은 치찰음과 t 클릭, h 숨소리는 영어에서도 같은 성격의 소리라 그대로 잡습니다." },
      { q: "오디오가 외부로 전송되나요?", a: "아니요. 모든 처리는 컴퓨터 안에서만 이루어집니다. 네트워크 요청, 계정, 업로드가 없습니다." },
    ],
  },
  final: { title: `${PRO_DS_PRICE} 아끼고, 마이크 케이블이나 사세요.`, lede: "치찰음, 클릭, 숨소리. 노브 세 개로 끝.", cta: "Just-DS 무료 다운로드" },
  footer: {
    aria: "하단 메뉴",
    otherLang: { href: "/en", hreflang: "en", label: "English" },
    legal:
      "FabFilter와 Pro-DS는 FabFilter Software Instruments B.V.의 상표입니다. Just-DS는 독립적으로 개발한 제품이며 FabFilter와 제휴, 후원, 보증 관계가 없습니다. 이 페이지는 Pro-DS 제품 페이지를 패러디했으며, 비교 내용은 공개된 정보를 바탕으로 작성했습니다. VST는 Steinberg Media Technologies GmbH의 상표이며, Audio Units와 macOS는 Apple Inc.의 상표입니다.",
  },
  hint: { lang: "en", text: "Looking for English?", link: "Read it in English →", href: "/en", close: "Close" },
  schema: {
    pageName: "Just-DS — 무료 디에서 VST3·AU",
    description: "치찰음, 클릭·입소리(ㅌ), 숨소리(ㅎ)를 따로 찾아 줄이는 무료 디에서 VST3/AU 플러그인.",
    featureList: [
      "치찰·파찰음 제거 (Single Vocal / Allround 검출)", "클릭·입소리·ㅌ 파열음 제거", "숨소리·ㅎ 제거", "Split / Wide 처리",
      "Lookahead 0–15 ms, 끄면 지연 0 ms", "검출 대역 HP/LP 필터", "Stereo Link 0–100 %, Mid/Side 처리", "외부 사이드체인",
      "2× / 4× 오버샘플링", "LEARN: 목소리 학습 후 자동 추천", "A/B 비교, Undo/Redo, 프리셋", "한국어 / English UI",
    ],
  },
};

export const en: Dict = {
  lang: "en",
  path: "/en",
  meta: {
    title: "Just-DS — Free De-esser VST3 / AU | Free Pro-DS Alternative with Click & Breath Removal",
    description:
      "Just-DS is a free de-esser plugin that tames sibilance and also removes mouth clicks, plosive t's and breaths. Single Vocal/Allround, Split/Wide, lookahead, mid/side, 4x oversampling. VST3/AU for Windows and macOS.",
    ogTitle: `Just-DS — Does what a ${PRO_DS_PRICE} de-esser does. For $0.`,
    ogDescription: "Sibilance, plus the mouth clicks and breaths Pro-DS doesn't touch. A free VST3/AU de-esser: no subscription, no account, no trial.",
    ogImage: "/og/og-en.png",
    ogImageAlt: `A gold knob sticking its tongue out next to the Just-DS plugin, ${PRO_DS_PRICE} crossed out, $0`,
    ogLocale: "en_US",
    ogLocaleAlt: "ko_KR",
  },
  skip: "Skip to content",
  nav: { aria: "Main", features: "Features", compare: "Compare", download: "Download", faq: "FAQ", shop: "Shop", shopAria: "Shop — nothing to buy" },
  langSwitch: { href: "/", hreflang: "ko", html: ["KO", "EN"] },
  headerCta: "Free download",
  hero: {
    eyebrow: "Free de-esser plugin · VST3 / AU",
    h1Extra: " — free de-esser plugin",
    tagline: "Intelligent, transparent and free.",
    claim: ["Everything Pro-DS does.", "Plus clicks & breaths.", "For"],
    priceAria: "Price comparison",
    priceNote: "vs. FabFilter Pro-DS list price · November 2026",
    ctaPrimary: "Free download",
    ctaTrialOld: "30-day trial",
    ctaTrialNew: "Forever trial",
    metaAria: "Platforms",
    meta: ["Windows · macOS", "VST3 · AU", "English / Korean UI"],
    img: "/assets/img/ui-auto-en.webp",
    imgAlt: "Just-DS main screen: a waveform display showing sibilance, click and breath reduction, and three gold knobs sticking their tongues out",
    badge: "-100%",
  },
  ticker: ["Free forever", "Sibilance", "Clicks", "Breaths", "No subscription", "No account", "No trial", "$0.00"],
  intro: {
    title: "Intelligent and transparent. And free.",
    body: [
      "Even with great mics and pre-amps, compression and saturation push sibilance in your face. Lip smacks and breaths come up with it.",
      "But don't worry. **Just-DS comes to the rescue. For free.**",
    ],
    quote: `I just saved ${PRO_DS_PRICE}.`,
    quoteBy: "Your wallet",
  },
  detection: {
    eyebrow: "Accurate detection ×3",
    title: "Accurate detection. Three times over.",
    lede: "Single Vocal for a lead line, Allround for drums and full mixes. You know the drill. Just-DS adds one more detector for clicks and another for breaths. Three knobs, three tongues.",
    cards: [
      {
        path: "sib", tag: "Pro-DS does this too", tagNew: false, title: "Sibilance", sub: "S · SH · CH · harsh Z and J", rotate: -150,
        body: "Finds the piercing high-frequency hiss and pulls it down. SPLIT works only inside the detection band; WIDE turns down the whole signal.",
        spec: "Up to **15 dB** · HP/LP detection band",
      },
      {
        path: "click", tag: "Pro-DS can't", tagNew: true, title: "Clicks", sub: "Plosive T · lip smacks · tongue clicks", rotate: -205,
        body: "Catches short, sharp t-type plosives and the clicks lips and tongues make. The closer the singer was to the mic, the bigger the difference.",
        spec: "Up to **6 dB** · AUTO / MANUAL treatment band",
      },
      {
        path: "breath", tag: "Pro-DS can't", tagNew: true, title: "Breath", sub: "H · inhales · air", rotate: -255,
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
  blocks: [
    {
      id: "everything", eyebrow: "Everything you need", title: "Everything you need. It's all there.",
      body: "Split-band processing, look-ahead, stereo linking, oversampling. Plus mid/side, external side-chain, and detection and treatment bands for each path. It's all there.",
      bullets: ["Split / Wide for each path", "Lookahead 0–15 ms · zero latency when off", "Stereo link 0–100 % · Mid / Side", "External side-chain · 2x / 4x oversampling", "Treatment band AUTO or MANUAL (Hz)"],
      img: "/assets/img/ui-manual-en.webp", alt: "Just-DS manual band screen: treatment band set in Hz for each path",
      caption: "Switch the treatment band to MANUAL to choose exactly which frequencies each path turns down.",
    },
    {
      id: "goodies", eyebrow: "Just-DS goodies", title: "Goodies, on the house.",
      body: "LEARN listens to the harshest part and suggests settings for all three knobs. Listen to each path on its own, start from a factory preset. Loop it thirty times or start mid-song: same result every pass.",
      bullets: ["LEARN: listens and suggests settings · UNDO", "Listen per path (headphone button) · DELTA", "4 factory presets · A/B · Undo/Redo", "Same result on every pass", "English / Korean UI"],
      img: "/assets/img/ui-learn-en.webp", alt: "Just-DS LEARN screen: a big gold knob sticking its tongue out while it listens",
      caption: "The LEARN screen. It wags its tongue while it listens.",
    },
  ],
  compare: {
    eyebrow: `${PRO_DS_PRICE} vs $0`,
    title: "Spot the difference. Hint: it's the price.",
    lede: "Every core Pro-DS feature is here, plus the ones it never had. See for yourself.",
    caption: "Feature comparison: FabFilter Pro-DS vs Just-DS",
    cols: ["Feature", "FabFilter Pro-DS", "Just-DS"],
    priceLabel: "Price",
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
      { label: "Mouth click & plosive T removal", them: "No", us: "Yes", extra: true },
      { label: "Breath & H removal", them: "No", us: "Yes", extra: true },
      { label: "Learns the voice and sets itself up (LEARN)", them: "No", us: "Yes", extra: true },
    ],
    footnote:
      "Pro-DS details are taken from FabFilter's official product page feature list and the official store list price (USD, excluding tax), checked in November 2026. Sale prices may differ. FabFilter and Pro-DS are trademarks of FabFilter Software Instruments; Just-DS is not affiliated with FabFilter in any way.",
  },
  awards: {
    title: "Awards",
    note: "None yet. We only just shipped. Here's what we do have.",
    badges: [
      { top: "Price", main: "$0", bottom: "forever" },
      { top: "Subscription", main: "None", bottom: "$0 / month" },
      { top: "Account", main: "None", bottom: "no sign-up" },
      { top: "Trial", main: "∞", bottom: "never ends" },
      { top: "Tongues", main: "3", bottom: "one per knob" },
    ],
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
      "Treatment band AUTO or MANUAL (type in the Hz)",
      "Split or Wide processing for each path",
      "Lookahead 0–15 ms, zero-latency live mode when off",
      "Stereo link 0–100 %",
      "Mid-only or side-only processing",
      "External side-chain input",
      "2x / 4x oversampling",
      "LEARN: listens to the voice and suggests settings, with UNDO",
      "Listen to each path on its own, plus DELTA monitoring",
      "4 factory presets (Male/Female × Split/Wide)",
      "A/B comparison and undo/redo",
      "IN / GR / OUT meters",
      "Same result when looping or starting mid-song",
      "English / Korean UI",
      "No network requests, no account, no uploads",
      "VST3 on Windows, VST3 and AU on macOS",
      `And it costs $0 (Pro-DS list price: ${PRO_DS_PRICE})`,
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
      { q: "Why is it free?", a: `Because ${PRO_DS_PRICE} to tame a few S's felt like too much. So we built one that does more, and decided not to charge for it.` },
      { q: "Is it affiliated with FabFilter?", a: "No. Just-DS is made by Volta and is not affiliated with, sponsored or endorsed by FabFilter. The plugin interface and this page are a parody of Pro-DS, and every graphic and line of code is our own." },
      { q: "Which DAWs does it work in?", a: "Any 64-bit DAW that hosts VST3 or AU. Windows gets VST3; macOS gets VST3 and AU. AAX for Pro Tools isn't supported yet." },
      { q: "Does it add latency?", a: "With LOOKAHEAD on, it reports 150 ms to the DAW for precise analysis, and the DAW compensates automatically. Turn LOOKAHEAD off while tracking and it runs at zero latency." },
      { q: "Does it work on English vocals?", a: "Yes. It was tuned on Korean vocals, but s, sh and ch sibilance, t clicks and h breaths are the same kinds of sound in English, and it catches them the same way." },
      { q: "Does my audio leave my computer?", a: "No. Everything runs locally. No network requests, no account, no uploads." },
    ],
  },
  final: { title: `Keep the ${PRO_DS_PRICE}. Buy a better mic cable.`, lede: "Sibilance, clicks, breaths. Three knobs and you're done.", cta: "Download Just-DS free" },
  footer: {
    aria: "Footer",
    otherLang: { href: "/", hreflang: "ko", label: "한국어" },
    legal:
      "FabFilter and Pro-DS are trademarks of FabFilter Software Instruments B.V. Just-DS is an independent product and is not affiliated with, sponsored or endorsed by FabFilter. This page is a parody of the Pro-DS product page; comparisons are based on publicly available information. VST is a trademark of Steinberg Media Technologies GmbH. Audio Units and macOS are trademarks of Apple Inc.",
  },
  hint: { lang: "ko", text: "한국어로 보시겠어요?", link: "한국어 페이지 →", href: "/", close: "닫기" },
  schema: {
    pageName: "Just-DS — Free De-esser VST3 / AU",
    description: "A free de-esser VST3/AU plugin that finds and reduces sibilance, mouth clicks and breaths separately.",
    featureList: [
      "Sibilance removal with Single Vocal / Allround detection", "Mouth click and plosive t removal", "Breath and h removal",
      "Split / Wide band processing", "Lookahead 0–15 ms, zero latency when off", "HP/LP detection band filters",
      "Stereo link 0–100 %, mid/side processing", "External side-chain", "2x / 4x oversampling",
      "LEARN: listens to the voice and suggests settings", "A/B compare, undo/redo, presets", "English / Korean UI",
    ],
  },
};
