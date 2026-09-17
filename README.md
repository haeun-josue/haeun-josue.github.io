# 파일 구성

```
haeun-josue.github.io/
├── index.html          ← 뼈대. {% include %} 로 조각을 불러옴 (맨 위 --- 두 줄 필수)
├── 00_style.css
├── _includes/          ← 조각 HTML은 반드시 이 폴더 안에!
│   ├── 01_header.html
│   ├── 02_about.html
│   ├── 03_education.html
│   ├── 04_interests.html
│   ├── 05_awards.html
│   ├── 06_activities.html
│   └── 07_contact.html
├── images/             ← 기존 이미지 폴더 그대로 유지
└── preview_local.html  ← 로컬 확인용 (조각을 다 합쳐둔 단일 파일, 배포와 무관)
```

## 적용 방법
1. 저장소 루트에 있던 `01_header.html` ~ `07_contact.html` 삭제
2. 이 압축의 내용을 저장소 루트에 덮어쓰기 (`images/`는 그대로)
3. `git add -A && git commit -m "Use Jekyll includes" && git push`
4. 1~2분 후 https://haeun-josue.github.io 확인

## 로컬에서 미리 보기
`preview_local.html`을 브라우저로 열면 됩니다 (Jekyll 없이 동작).
내용을 고칠 땐 `_includes/` 안 파일을 수정하고 push하세요.
