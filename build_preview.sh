#!/bin/bash
# index.html + _includes/*.html  →  preview_local.html 을 다시 만듭니다.
# 조각 파일을 고친 뒤 ./build_preview.sh 를 실행하면 미리보기가 최신이 됩니다.
set -euo pipefail
cd "$(dirname "$0")"

python3 - "$PWD" <<'PY'
import pathlib, re, sys

root = pathlib.Path(sys.argv[1])
src = (root / "index.html").read_text(encoding="utf-8")

# Jekyll front matter (맨 위 --- --- ) 제거
src = re.sub(r"\A---\s*\n---\s*\n", "", src)

def expand(m):
    name = m.group(1).strip()
    return (root / "_includes" / name).read_text(encoding="utf-8").rstrip("\n")

out = re.sub(r"\{%-?\s*include\s+([^\s%]+?)\s*-?%\}", expand, src)

banner = "<!-- 자동 생성 파일. 직접 고치지 말고 ./build_preview.sh 를 실행하세요. -->\n"
(root / "preview_local.html").write_text(banner + out, encoding="utf-8")
print("preview_local.html 갱신 완료")
PY
