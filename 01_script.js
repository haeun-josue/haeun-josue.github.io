/* 썸네일 클릭 → 원본 비율 사진첩(라이트박스).

   <span class="thumbs"> 안에 <img class="thumb"> 를 여러 장 넣으면
     - 목록에는 첫 장만 3:4 썸네일로 보이고
     - 클릭하면 라이트박스가 열려 ← → 로 전부 넘겨 볼 수 있습니다.

   각 <img> 속성
     src          : 썸네일 = 확대본. 원본이 따로 있으면 data-full 로 지정
     data-full    : (선택) 확대했을 때 보여줄 원본 경로
     data-caption : (선택) 확대했을 때 아래에 뜨는 설명 (없으면 alt 사용) */
(function () {
    'use strict';

    var box, imgEl, capEl, counterEl, prevBtn, nextBtn;
    var items = [];   // 현재 열려 있는 사진첩의 <img class="thumb"> 목록
    var index = 0;

    function build() {
        box = document.createElement('div');
        box.id = 'lightbox';
        box.hidden = true;
        box.innerHTML =
            '<button type="button" class="lb-close" aria-label="닫기">&times;</button>' +
            '<button type="button" class="lb-nav lb-prev" aria-label="이전 사진">&#10094;</button>' +
            '<button type="button" class="lb-nav lb-next" aria-label="다음 사진">&#10095;</button>' +
            '<img class="lb-img" alt="">' +
            '<p class="lb-caption"></p>' +
            '<span class="lb-counter"></span>';
        document.body.appendChild(box);

        imgEl     = box.querySelector('.lb-img');
        capEl     = box.querySelector('.lb-caption');
        counterEl = box.querySelector('.lb-counter');
        prevBtn   = box.querySelector('.lb-prev');
        nextBtn   = box.querySelector('.lb-next');

        prevBtn.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
        nextBtn.addEventListener('click', function (e) { e.stopPropagation(); step(1); });
        imgEl.addEventListener('click', function (e) { e.stopPropagation(); });
        box.addEventListener('click', close);   // 배경 · 닫기 버튼 클릭 시
    }

    function show(i) {
        var thumb = items[i];
        if (!thumb) return;
        index = i;

        imgEl.src = thumb.getAttribute('data-full') || thumb.src;
        imgEl.alt = thumb.alt || '';

        var caption = thumb.getAttribute('data-caption') || thumb.alt || '';
        capEl.textContent = caption;
        capEl.hidden = !caption;

        var many = items.length > 1;
        counterEl.textContent = many ? (i + 1) + ' / ' + items.length : '';
        counterEl.hidden = !many;
        prevBtn.hidden = !many;
        nextBtn.hidden = !many;
    }

    function step(delta) {
        if (items.length < 2) return;
        show((index + delta + items.length) % items.length);   // 순환
    }

    function open(thumb) {
        if (!box) build();

        // 같은 .thumbs 안의 사진들이 하나의 사진첩
        var album = thumb.closest('.thumbs');
        items = album ? Array.prototype.slice.call(album.querySelectorAll('.thumb')) : [thumb];

        show(Math.max(0, items.indexOf(thumb)));
        box.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function close() {
        if (!box || box.hidden) return;
        box.hidden = true;
        imgEl.removeAttribute('src');
        items = [];
        document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
        var thumb = e.target.closest ? e.target.closest('.thumb') : null;
        if (thumb) open(thumb);
    });

    document.addEventListener('keydown', function (e) {
        // 라이트박스가 열려 있을 때
        if (box && !box.hidden) {
            if (e.key === 'Escape')     { close();   return; }
            if (e.key === 'ArrowLeft')  { step(-1);  return; }
            if (e.key === 'ArrowRight') { step(1);   return; }
            return;
        }
        // 닫혀 있을 때: 포커스된 썸네일을 Enter/Space 로 열기
        var focused = document.activeElement;
        if (focused && focused.classList && focused.classList.contains('thumb') &&
            (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            open(focused);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.thumbs').forEach(function (album) {
            var thumbs = album.querySelectorAll('.thumb');
            if (!thumbs.length) return;

            // 목록에 보이는 첫 장에만 포커스/역할 부여 (나머지는 숨겨져 있음)
            thumbs[0].tabIndex = 0;
            thumbs[0].setAttribute('role', 'button');

            // 여러 장이면 장수 배지 표시
            if (thumbs.length > 1) {
                var badge = document.createElement('span');
                badge.className = 'thumbs-count';
                badge.textContent = '▣ ' + thumbs.length;
                album.appendChild(badge);
            }
        });
    });
})();


/* 탭 전환 (중첩 지원) ------------------------------------------------
   <nav class="tabs" data-tabs="그룹이름"></nav>       ← 버튼이 여기 자동 생성
   <section class="tab-panel" data-tabgroup="그룹이름"> ← 이 중 하나만 표시

   버튼 이름은 data-tab-label → <h2> → <h3> 순으로 가져옵니다.
   data-tabs-hash 가 붙은 nav 는 주소창 해시(#awards)와 연동됩니다.
------------------------------------------------------------------- */
(function () {
    'use strict';

    Array.prototype.forEach.call(document.querySelectorAll('.tabs[data-tabs]'), function (nav) {
        var group = nav.getAttribute('data-tabs');
        var panels = Array.prototype.slice.call(
            document.querySelectorAll('.tab-panel[data-tabgroup="' + group + '"]')
        );
        if (!panels.length) return;

        var useHash = nav.hasAttribute('data-tabs-hash');
        nav.setAttribute('role', 'tablist');

        var buttons = panels.map(function (panel, i) {
            var label = panel.getAttribute('data-tab-label');
            if (!label) {
                var h = panel.querySelector('h2, h3');
                label = h ? h.textContent.trim() : (panel.id || 'Section ' + (i + 1));
            }
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'tab-btn';
            btn.textContent = label;
            btn.setAttribute('role', 'tab');
            if (panel.id) btn.setAttribute('aria-controls', panel.id);
            btn.addEventListener('click', function () { select(i, true); });
            nav.appendChild(btn);
            return btn;
        });

        function select(i, fromClick) {
            panels.forEach(function (panel, j) {
                var on = (j === i);
                panel.classList.toggle('is-active', on);
                buttons[j].setAttribute('aria-selected', on ? 'true' : 'false');
                buttons[j].tabIndex = on ? 0 : -1;
            });
            if (fromClick && useHash && panels[i].id) {
                history.replaceState(null, '', '#' + panels[i].id);
            }
        }

        function indexFromHash() {
            if (!useHash) return 0;
            var id = decodeURIComponent(location.hash.slice(1));
            for (var i = 0; i < panels.length; i++) {
                if (panels[i].id === id) return i;
            }
            return 0;
        }

        // 좌우 방향키로 탭 이동
        nav.addEventListener('keydown', function (e) {
            var cur = buttons.indexOf(document.activeElement);
            if (cur < 0) return;
            var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
            if (!d) return;
            e.preventDefault();
            var next = (cur + d + buttons.length) % buttons.length;
            select(next, true);
            buttons[next].focus();
        });

        select(indexFromHash(), false);
        if (useHash) {
            window.addEventListener('hashchange', function () { select(indexFromHash(), false); });
        }
    });
})();
