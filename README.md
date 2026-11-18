# Just-DS 랜딩 페이지

`https://deesser.voltamix.studio` — 무료 디에서 플러그인 Just-DS 소개 페이지.
Next.js 16 (App Router) + TypeScript, 두 페이지 모두 빌드 때 정적 HTML로 만들어진다.

| 경로 | 내용 |
|---|---|
| `/` | 한국어 |
| `/en` | English |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | 코드로 생성 (`app/sitemap.ts` 등) |

페이지 흐름은 [FabFilter Pro-DS 제품 페이지](https://www.fabfilter.com/products/pro-ds-de-esser-plug-in)를
그대로 따라가며 각 블록을 비튼다: 히어로("Pro • DS" → "Just • DS", -25% → -100%, 30일 체험판 → 평생 체험판) →
소개 + 인용("당신의 지갑") → Accurate detection ×3 + 직접 해 보세요 → Everything you need → goodies →
비교표 → Awards(없음) → Key features 번호 목록 → 다운로드 + Information → 포함된 번들(없음) → FAQ.
FabFilter 로고·이미지·문장은 가져오지 않고, 제품명은 비교와 패러디 표기에만 쓴다.

## 자주 고칠 곳

| 하고 싶은 일 | 파일 |
|---|---|
| **다운로드 링크 넣기** | `lib/site.ts`의 `DOWNLOADS.windows` / `DOWNLOADS.mac`. 비워 두면 버튼이 "곧 공개"로 비활성화된다 |
| 버전, Pro-DS 가격 | `lib/site.ts`의 `VERSION`, `PRO_DS_PRICE` |
| 문구 (한/영) | `lib/content.ts` — `**굵게**` 표기 지원 |
| 제목·설명·OG 태그 | `lib/content.ts`의 `meta`, 공통 설정은 `lib/seo.ts` |
| 스타일 | `app/globals.css` (색은 맨 위 `:root` 변수) |
| 플러그인 스크린샷 | `public/assets/img/*.webp` (900×598) |
| 공유 이미지 | `public/og/og-ko.png`, `og-en.png` (1200×630) |

## 로컬 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 배포 전 확인 (타입 검사 포함)
```

## Vercel 배포

1. 이 폴더를 GitHub 저장소로 올린 뒤 Vercel에서 **Add New → Project**로 가져온다.
   Framework는 Next.js로 자동 인식되고, 설정을 바꿀 필요는 없다.
   (CLI를 쓴다면 이 폴더에서 `npx vercel` → `npx vercel --prod`)
2. 프로젝트 **Settings → Domains**에 `deesser.voltamix.studio`를 추가한다.
3. `voltamix.studio` DNS에 Vercel이 안내하는 레코드를 추가한다.
   보통 `deesser` 이름의 `CNAME` → `cname.vercel-dns.com` 형태이며, 정확한 값은 Vercel 화면에 나온다.

## 배포 후 SEO 체크리스트

- [ ] Google Search Console에 도메인 등록 후 `https://deesser.voltamix.studio/sitemap.xml` 제출
- [ ] 네이버 서치어드바이저에 사이트 등록 후 같은 사이트맵 제출 (한국어 검색 노출에 중요)
      — 소유 확인용 메타 태그가 필요하면 `lib/seo.ts`의 `buildMetadata`에
      `verification: { google: "...", other: { "naver-site-verification": "..." } }`를 추가
- [ ] [Rich Results Test](https://search.google.com/test/rich-results)로 구조화 데이터
      (SoftwareApplication, FAQPage) 확인
- [ ] 카카오톡·슬랙·X에 링크를 붙여 공유 이미지 확인 (카카오는 캐시가 있어 [공유 디버거](https://developers.kakao.com/tool/debugger/sharing)로 초기화)

이미 들어 있는 것: 언어별 canonical·hreflang(ko / en / x-default), 언어별 OG·Twitter 카드,
JSON-LD(무료 Offer, 기능 목록, FAQ), hreflang 포함 sitemap, robots, 파비콘·앱 아이콘, 시맨틱 마크업.
언어 자동 리다이렉트는 일부러 하지 않는다 — 대신 다른 언어 사용자에게 작은 안내를 띄운다
(리다이렉트하면 검색엔진이 한쪽 페이지를 못 볼 수 있다).

## 비교표 표기 기준

Pro-DS 항목은 FabFilter 공식 제품 페이지 기능 목록과 공식 스토어 정가($199, USD, 세금 별도)를
2026-11-17에 확인한 것이다. 가격이나 기능이 바뀌면 `lib/site.ts`와 `lib/content.ts`의 비교표를 함께 고친다.
상표 고지(페이지 하단)는 지우지 않는다.
