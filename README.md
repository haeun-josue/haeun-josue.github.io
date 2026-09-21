# 파일 구성

```
haeun-josue.github.io/
├── index.html            ← 뼈대. {% include %} 로 조각을 불러옴 (맨 위 --- 두 줄 필수)
├── 00_style.css
├── 01_script.js          ← 썸네일 클릭 확대(라이트박스)
├── _includes/            ← 조각 HTML은 반드시 이 폴더 안에!
│   ├── 01_header.html
│   ├── 02_about.html        ← 항상 표시 (소개)
│   ├── 03_news.html         ← 탭 · News
│   ├── 04_experience.html   ← 탭 · Experience & Education (하위 탭 2개)
│   ├── 05_awards.html       ← 탭 · Award
│   ├── 06_publications.html ← 탭 · Publications
│   ├── 07_chips.html        ← 탭 · Chip Gallery
│   └── 08_contact.html      ← 탭 · Contact (맨 오른쪽)
├── images/               ← 사진은 전부 여기에
├── build_preview.sh      ← preview_local.html 을 다시 만드는 스크립트
└── preview_local.html    ← 로컬 확인용 (자동 생성물. 직접 고치지 말 것)
```

---

# 페이지 구성 (탭)

`About Me` 는 **항상 표시**되고, 나머지 섹션은 위쪽 버튼으로 **한 번에 하나씩** 전환됩니다.
즉 화면에는 언제나 `About Me` + 선택한 섹션, 두 개만 보입니다.

```
Haeun Ji
About Me                                                       ← 항상 표시
[News] [Experience & Education] [Award] [Publications] [Chip Gallery] [Contact]
선택한 섹션 하나                                                ← 여기만 바뀜
      └ Experience & Education 안에는 하위 탭이 하나 더:
        [Main] [Extracurricular Exp.]
```

Research Interests 는 별도 탭 없이 About Me 본문에 들어가 있습니다.

## 하위 탭 (탭 안의 탭)

`_includes/04_experience.html` 처럼 쓰면 됩니다. 그룹 이름(`expedu`)만 겹치지 않게 지으면
어느 섹션에서든 똑같이 만들 수 있습니다.

```html
<nav class="tabs tabs-sub" data-tabs="expedu"></nav>

<div class="tab-panel" data-tabgroup="expedu" data-tab-label="Main"> ... </div>
<div class="tab-panel" data-tabgroup="expedu" data-tab-label="Extracurricular Exp."> ... </div>
```

- 버튼 이름은 `data-tab-label` 값이 그대로 쓰입니다 (없으면 `<h2>`/`<h3>` 글자).
- 상위 탭 `<nav class="tabs" data-tabs="main" data-tabs-hash>` 의 `data-tabs-hash` 는
  주소창 해시 연동 표시입니다. 하위 탭에는 붙이지 않습니다.

## 탭 버튼은 자동 생성됩니다

버튼 목록을 따로 관리하지 않습니다. `01_script.js` 가 `class="tab-panel"` 인 섹션들을 훑어서
각 섹션의 `<h2>` 글자를 그대로 버튼으로 만듭니다.

- **탭 이름을 바꾸려면** 해당 섹션의 `<h2>` 만 고치면 됩니다.
- **탭 순서를 바꾸려면** `index.html` 의 `{% include %}` 순서만 바꾸면 됩니다.
- **항상 보이게 하려면** 그 섹션에서 `class="tab-panel"` 을 지우면 됩니다 (About Me 처럼).

## 섹션을 새로 추가할 때

1. `_includes/08_새섹션.html` 을 만들고
   `<section id="new" class="tab-panel" data-tabgroup="main"> <h2>제목</h2> ... </section>`
2. `index.html` 에 `{% include 08_새섹션.html %}` 한 줄 추가

탭 버튼은 저절로 생깁니다.

## News 항목 추가

`_includes/03_news.html` 맨 위에 `<li>` 를 하나 더 쓰면 됩니다 (최신이 위).

```html
<li>
    <span class="news-date">2026.10</span>
    <span class="news-text">여기에 소식. <strong>강조</strong>도 가능.</span>
</li>
```

## Chip Gallery 카드 추가

`_includes/07_chips.html` 의 `<article class="gallery-card">` 블록을 통째로 복사하세요.

```html
<article class="gallery-card">
    <span class="thumbs">
        <img class="thumb" loading="lazy" src="images/칩.png" alt="설명" data-caption="확대 시 설명">
    </span>
    <h3>칩 이름</h3>
    <p class="gallery-meta">공정 <span class="badge badge-done">Silicon Proven</span></p>
    <p class="gallery-desc">설명</p>
</article>
```

배지 종류: `badge` (기본 · 회색) / `badge-done` (초록) / `badge-wip` (노랑)


## 연락처 수정

`_includes/08_contact.html` 에 있습니다 (맨 오른쪽 탭). 줄 하나가 항목 하나입니다.

```html
<li>Email: <a href="mailto:주소" class="contact-link">표시할 글자</a></li>
<li>GitHub: <a href="https://..." class="contact-link" target="_blank" rel="noopener">표시할 글자</a></li>
```

## 그 밖에

- 주소창에 `#awards` 같은 해시를 붙이면 그 탭이 열린 채로 시작합니다. 탭을 누르면 주소도 같이 바뀌므로
  특정 탭 링크를 그대로 공유할 수 있습니다.
- 탭 버튼에 포커스를 두고 `←` `→` 로도 이동됩니다.
- 브라우저에서 JS가 꺼져 있으면 탭 없이 **모든 섹션이 그냥 펼쳐져** 보입니다 (내용이 사라지지 않음).
- 탭 줄의 위치를 옮기고 싶으면 `index.html` 의 `<nav id="tabs" class="tabs"></nav>` 줄만 옮기면 됩니다.

---

# 사진 추가하는 법

## 1. 사진 파일을 `images/` 에 넣는다

## 2. `<span class="thumbs">` 안에 `<img>` 한 줄을 붙여넣는다

Awards / Publications / Activities 의 모든 항목에는 이미 빈 자리틀이 들어가 있습니다.

```html
<span class="thumbs"></span>          ← 지금 상태 (프레임 + "No Image" 표시)
```

여기 안에 `<img>` 줄만 넣으면 끝입니다. 다른 건 손댈 필요 없습니다.

```html
<li>
    <span class="thumbs">
        <img class="thumb" loading="lazy" src="images/내사진.jpg" alt="짧은 설명" data-caption="확대했을 때 밑에 뜰 설명">
    </span>
    <div class="item-body">
        <span class="item-title">제목</span>
        <span class="item-desc">부연 설명</span>
    </div>
</li>
```

각 항목 바로 위 주석에 붙여넣을 `<img>` 줄이 그대로 적혀 있으니 복사해 쓰면 됩니다.
사진이 없는 항목은 그냥 두면 **4:3 프레임에 "No Image"** 가 표시돼 목록 높이가 일정하게 유지됩니다.
(문구를 바꾸려면 `00_style.css` 의 `.thumbs:not(:has(.thumb))::before` 의 `content` 값을 수정)

## 3. 사진첩 — 여러 장 넣기

`<img>` 줄을 계속 추가하면 됩니다. **목록에는 첫 장만** 4:3 썸네일로 보이고,
클릭하면 라이트박스에서 `←` `→` 로 전부 넘겨 볼 수 있습니다.

```html
<span class="thumbs">
    <img class="thumb" loading="lazy" src="images/a.jpg" alt="A" data-caption="첫 번째">   <!-- ← 목록에 보이는 대표 사진 -->
    <img class="thumb" loading="lazy" src="images/b.jpg" alt="B" data-caption="두 번째">
    <img class="thumb" loading="lazy" src="images/c.jpg" alt="C" data-caption="세 번째">
</span>
```

- **대표 사진을 바꾸려면** `<img>` 줄의 순서만 바꾸면 됩니다 (맨 위 = 대표).
- 2장 이상이면 썸네일 우측 하단에 장수 배지(`▣ 3`)가 자동으로 붙습니다.
- 라이트박스 안에서는 **원본 비율 그대로** 보이므로 가로·세로 사진을 섞어도 됩니다.

## 알아두면 좋은 옵션

썸네일은 **4:3 상자 안에 사진 전체가 잘리지 않고** 들어갑니다.
세로 사진이든 가로 사진이든 비율 그대로 축소되고, 남는 부분은 옅은 여백이 됩니다.

| 상황 | 방법 |
| --- | --- |
| 여백 없이 상자를 꽉 채우고 싶을 때 | `class="thumb crop"` (대신 가장자리가 잘림) |
| 사진 없는 항목의 프레임을 아예 숨기고 싶을 때 | 그 항목의 `<span class="thumbs"></span>` 줄을 지우면 됨 |
| 썸네일은 가벼운 파일, 확대는 원본으로 | `data-full="images/원본.jpg"` 추가 |
| 확대했을 때 설명 문구 | `data-caption="..."` (없으면 `alt` 값이 대신 쓰임) |

**조작법** — 썸네일 클릭(또는 Tab 후 Enter)으로 열기, `←` `→` 또는 좌우 화살표 버튼으로 넘기기,
배경 클릭 · 우측 상단 × · `Esc` 로 닫기. 모바일에서도 동일하게 동작합니다.

---

# 로컬에서 미리 보기

```bash
./build_preview.sh          # _includes/ 내용을 합쳐 preview_local.html 재생성
open preview_local.html     # 브라우저로 확인
```

`preview_local.html` 은 **자동 생성 파일**이라 직접 고치면 다음 빌드 때 덮어써집니다.
항상 `_includes/` 안의 파일을 고치세요.

# 배포

```bash
./build_preview.sh
git add -A && git commit -m "Update" && git push
```

1~2분 후 https://haeun-josue.github.io 에서 확인.
