/* ============================================================
   maltiplata — homepage enhancements
   sticky search · autocomplete · carousels · card art
   Runs after the React app renders; retries until DOM is ready.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 1. STICKY SEARCH HEADER ---------------- */
  function stickySearch() {
    if (document.getElementById('mp-stickybar')) return true;
    var hero = document.querySelector('.hero-search');
    var nav = document.querySelector('nav.nav');
    if (!hero || !nav) return false;

    var bar = document.createElement('div');
    bar.id = 'mp-stickybar';
    bar.innerHTML =
      '<div class="mp-sticky-in">' +
      '<a class="mp-sticky-logo" href="./index.html">malti<span>/</span>plata</a>' +
      '<div class="mp-sb-wrap">' +
      '<input id="mp-sb-input" type="search" autocomplete="off" ' +
      'placeholder="search everything — roth ira, debt, llc…" aria-label="search maltiplata" />' +
      '<div class="mp-ac" id="mp-sb-ac" role="listbox" hidden></div>' +
      '</div>' +
      '<a class="mp-sticky-cta" href="#join">join free</a>' +
      '</div>';
    document.body.appendChild(bar);

    var shown = false;
    function onScroll() {
      var r = hero.getBoundingClientRect();
      var should = r.bottom < 60;
      if (should !== shown) {
        shown = should;
        bar.classList.toggle('is-on', shown);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    wireAutocomplete(document.getElementById('mp-sb-input'), document.getElementById('mp-sb-ac'));
    return true;
  }

  /* ---------------- 2. AUTOCOMPLETE ---------------- */
  function score(item, q) {
    var t = item.t.toLowerCase(), d = (item.d || '').toLowerCase(),
        kw = (item.kw || '').toLowerCase(), c = (item.c || '').toLowerCase();
    var hay = t + ' ' + kw + ' ' + c + ' ' + d;
    if (t === q) return 100;
    if (t.indexOf(q) === 0) return 80;
    if (t.indexOf(q) > -1) return 60;
    if (kw.indexOf(q) > -1) return 50;
    if (c.indexOf(q) > -1) return 40;
    if (d.indexOf(q) > -1) return 25;
    // multi-word: ignore stopwords, score on meaningful tokens that hit
    var STOP = {'my':1,'i':1,'the':1,'a':1,'an':1,'do':1,'does':1,'how':1,'what':1,'is':1,
                'are':1,'to':1,'of':1,'for':1,'and':1,'in':1,'on':1,'me':1,'with':1,'about':1,
                'can':1,'should':1,'need':1,'want':1,'have':1,'has':1,'get':1,'find':1,'it':1,
                'this':1,'that':1,'from':1,'at':1,'be':1,'if':1,'when':1,'help':1};
    var toks = q.split(/\s+/).filter(function(x){ return x && !STOP[x] && x.length > 2; });
    if (toks.length) {
      var hits = 0, s = 0;
      for (var i = 0; i < toks.length; i++) {
        if (hay.indexOf(toks[i]) > -1) { hits++; s += (t.indexOf(toks[i]) > -1) ? 9 : 5; }
      }
      if (hits && hits >= Math.ceil(toks.length / 2)) return 15 + s;
    }
    return 0;
  }

  function search(q) {
    var data = window.MALTI_SEARCH || [];
    q = (q || '').trim().toLowerCase();
    if (!q) return [];
    return data
      .map(function (x) { return { x: x, s: score(x, q) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 7)
      .map(function (r) { return r.x; });
  }

  var KIND = { word: 'word', topic: 'topic', guide: 'guide', page: 'page' };

  function wireAutocomplete(input, box) {
    if (!input || !box || input.dataset.mpWired) return;
    input.dataset.mpWired = '1';
    var active = -1, results = [];

    function render() {
      if (!results.length) {
        box.hidden = true;
        box.innerHTML = '';
        return;
      }
      box.innerHTML = results.map(function (r, i) {
        return '<a class="mp-ac-row' + (i === active ? ' is-active' : '') + '" href="./' + r.u + '" role="option">' +
          '<span class="mp-ac-kind mp-ac-kind--' + r.k + '">' + (KIND[r.k] || r.k) + '</span>' +
          '<span class="mp-ac-txt"><b>' + esc(r.t) + '</b><i>' + esc(r.d || '') + '</i></span>' +
          '<span class="mp-ac-go">→</span></a>';
      }).join('') +
        '<a class="mp-ac-all" href="./topics/index.html">see all topics &amp; guides →</a>';
      box.hidden = false;
    }

    function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    input.addEventListener('input', function () {
      results = search(input.value); active = -1; render();
    });
    input.addEventListener('keydown', function (e) {
      if (!results.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, results.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, -1); render(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var pick = results[active > -1 ? active : 0];
        if (pick) location.href = './' + pick.u;
      } else if (e.key === 'Escape') { box.hidden = true; }
    });
    input.addEventListener('blur', function () { setTimeout(function () { box.hidden = true; }, 160); });
    input.addEventListener('focus', function () { if (results.length) box.hidden = false; });
  }

  /* ---------------- 3. HERO SEARCH → real autocomplete ---------------- */
  function heroSearch() {
    var wrap = document.querySelector('.hero-search');
    if (!wrap) return false;
    var input = wrap.querySelector('input');
    if (!input) return false;
    if (!document.getElementById('mp-hero-ac')) {
      var box = document.createElement('div');
      box.className = 'mp-ac mp-ac--hero';
      box.id = 'mp-hero-ac';
      box.hidden = true;
      wrap.style.position = 'relative';
      wrap.appendChild(box);
    }
    wireAutocomplete(input, document.getElementById('mp-hero-ac'));
    return true;
  }

  /* ---------------- 4. CAROUSEL (dictionary + wall) ---------------- */
  function makeCarousel(sectionId, cardSel, opts) {
    var sec = document.getElementById(sectionId);
    if (!sec || sec.dataset.mpCarousel) return false;
    var cards = sec.querySelectorAll(cardSel);
    if (!cards.length) return false;
    sec.dataset.mpCarousel = '1';

    var first = cards[0];
    var grid = first.parentNode;
    grid.classList.add('mp-rail');

    var wrap = document.createElement('div');
    wrap.className = 'mp-rail-wrap';
    grid.parentNode.insertBefore(wrap, grid);
    wrap.appendChild(grid);

    var ctrls = document.createElement('div');
    ctrls.className = 'mp-rail-ctrls';
    ctrls.innerHTML =
      '<button class="mp-rail-btn" data-dir="-1" aria-label="previous">&#8592;</button>' +
      '<button class="mp-rail-btn" data-rail-pause aria-label="pause">&#10073;&#10073;</button>' +
      '<button class="mp-rail-btn" data-dir="1" aria-label="next">&#8594;</button>' +
      (opts.allHref ? '<a class="mp-rail-all" href="' + opts.allHref + '">' + opts.allLabel + '</a>' : '');
    wrap.appendChild(ctrls);

    var timer = null, paused = false;
    function step(dir) {
      var w = grid.querySelector(cardSel);
      var d = (w ? w.getBoundingClientRect().width + 16 : 320) * dir;
      var atEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 8;
      if (dir > 0 && atEnd) grid.scrollTo({ left: 0, behavior: 'smooth' });
      else grid.scrollBy({ left: d, behavior: 'smooth' });
    }
    ctrls.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () { step(+b.dataset.dir); restart(); });
    });
    var pauseBtn = ctrls.querySelector('[data-rail-pause]');
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.innerHTML = paused ? '&#9654;' : '&#10073;&#10073;';
      pauseBtn.setAttribute('aria-label', paused ? 'play' : 'pause');
      if (paused) clearInterval(timer); else restart();
    });
    function restart() {
      clearInterval(timer);
      if (paused) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(function () { step(1); }, opts.delay || 4200);
    }
    grid.addEventListener('mouseenter', function () { clearInterval(timer); });
    grid.addEventListener('mouseleave', restart);
    restart();
    return true;
  }

  /* ---------------- 5. ART ON THE THREE START CARDS ---------------- */
  var ART = [
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cg fill='none' stroke='%230f0f0e' stroke-width='2.5' opacity='.16'%3E%3Ccircle cx='170' cy='55' r='42'/%3E%3Ccircle cx='170' cy='55' r='26'/%3E%3Cpath d='M120 190 L160 140 L185 165 L215 120'/%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cg fill='none' stroke='%230f0f0e' stroke-width='2.5' opacity='.16'%3E%3Crect x='128' y='30' width='70' height='48' rx='8'/%3E%3Crect x='142' y='52' width='70' height='48' rx='8'/%3E%3Cpath d='M120 185 h100 M120 165 h70'/%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cg fill='none' stroke='%230f0f0e' stroke-width='2.5' opacity='.16'%3E%3Cpath d='M150 100 q30-45 60 0 q-30 45-60 0z'/%3E%3Cpath d='M180 100 v75'/%3E%3Cpath d='M135 175 h90'/%3E%3C/g%3E%3C/svg%3E\")"
  ];
  function cardArt() {
    var cards = document.querySelectorAll('#start-here .start-step');
    if (!cards.length) return false;
    if (cards[0].dataset.mpArt) return true;
    cards.forEach(function (c, i) {
      c.dataset.mpArt = '1';
      c.style.backgroundImage = ART[i % ART.length];
      c.style.backgroundRepeat = 'no-repeat';
      c.style.backgroundPosition = 'right -14px bottom -14px';
      c.style.backgroundSize = '190px 190px';
    });
    return true;
  }


  /* ---------------- 6. DICTIONARY CARDS → their own pages ---------------- */
  var SLUGS = {};
  function linkDictCards() {
    var cards = document.querySelectorAll('#dictionary .dictionary-card');
    if (!cards.length) return false;
    if (cards[0].dataset.mpLinked) return true;
    (window.MALTI_SEARCH || []).forEach(function (r) {
      if (r.k === 'word') SLUGS[r.t.toLowerCase()] = r.u;
    });
    cards.forEach(function (c) {
      c.dataset.mpLinked = '1';
      var nameEl = c.querySelector('.dictionary-card-name');
      var name = (nameEl ? nameEl.textContent : '').trim().toLowerCase();
      var url = SLUGS[name];
      if (!url) return;
      c.style.cursor = 'pointer';
      var cta = c.querySelector('.dictionary-card-cta');
      if (cta) cta.textContent = 'read the full word →';
      c.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        location.href = './' + url;
      }, true);
    });
    return true;
  }


  /* -------- 7. SHORTEN: hide redundant sections, compact the long ones -------- */
  /* every one of these now has its own dedicated page, so the homepage
     doesn't need to carry the whole thing inline. */
  function hideSections() {
    var kill = ['decoder', 'toolkit', 'grownup', 'forms'];
    var did = false;
    kill.forEach(function (id) {
      var e = document.getElementById(id);
      if (e && e.style.display !== 'none') { e.style.display = 'none'; did = true; }
    });
    return did;
  }

  function compact(sectionId, cfg) {
    var sec = document.getElementById(sectionId);
    if (!sec || sec.dataset.mpCompact) return false;
    sec.dataset.mpCompact = '1';
    sec.innerHTML =
      '<div class="mp-strip" style="background:' + cfg.bg + '">' +
      '<div class="mp-strip-txt">' +
      '<p class="mp-strip-k">' + cfg.kicker + '</p>' +
      '<h2 class="mp-strip-h">' + cfg.head + '</h2>' +
      '<p class="mp-strip-p">' + cfg.body + '</p>' +
      '</div>' +
      '<a class="mp-strip-cta" href="' + cfg.href + '">' + cfg.cta + '</a>' +
      '</div>';
    return true;
  }



  /* -------- NAME BAND: what maltiplata means, in one glance -------- */
  function nameBand() {
    var sec = document.getElementById('matilda');
    if (!sec || sec.dataset.mpName) return false;
    sec.dataset.mpName = '1';
    sec.innerHTML =
      '<div class="mp-name">' +
        '<p class="mp-name-k">what the name means</p>' +
        '<p class="mp-name-what">Money, legal, and independence for women \u2014 explained like dinner ' +
      'with a friend, not a lecture from a bank.</p>' +
        '<div class="mp-name-split">' +
          '<div class="mp-name-half">' +
            '<p class="mp-name-word">malti</p>' +
            '<p class="mp-name-eq"><b>Multi</b> \u2014 as in multiply</p>' +
            '<p class="mp-name-eq"><b>Matilda</b> \u2014 as in the Matilda effect</p>' +
          '</div>' +
          '<div class="mp-name-half">' +
            '<p class="mp-name-word">plata</p>' +
            '<p class="mp-name-eq"><b>Money</b>, in Spanish</p>' +
            '<p class="mp-name-eq">Say it out loud: <i>multiplica la plata</i></p>' +
          '</div>' +
        '</div>' +
        '<p class="mp-name-punch">Multiply your money \u2014 and put her name back on it.</p>' +
        '<p class="mp-name-foot">Matilda Joslyn Gage was a suffragist and inventor who wrote in 1876 ' +
        'that women\u2019s ideas were routinely credited to men. A century later, historians named ' +
        'the pattern after her \u2014 the <b>Matilda effect</b> \u2014 because she had been written ' +
        'out of the record herself.</p>' +
        '<a class="mp-name-cta" href="./guides/the-matilda-effect.html">the whole story \u2192</a>' +
      '</div>';
    return true;
  }

  /* -------- MISSION BAND: who we are / why we're here -------- */
  function missionBand() {
    if (document.getElementById('mp-mission')) return true;
    // sit directly under the hero, before the "where do I start" cards —
    // a first-time visitor should learn what this is before being asked to act
    var anchor = document.getElementById('start-here') || document.getElementById('matilda');
    if (!anchor) return false;
    var sec = document.createElement('section');
    sec.id = 'mp-mission';
    sec.innerHTML =
      '<div class="mp-mission-card">' +
      '<p class="mp-mission-k">who we are \u00b7 why we\u2019re here</p>' +
      '<svg class="mp-table" viewBox="0 0 300 108" aria-hidden="true" focusable="false">' +
        /* four seated figures around a table, one chair pulled out for you */
        '<g class="mp-t-fig">' +
          '<circle cx="58" cy="30" r="11"/><path d="M44 60c0-8 6-14 14-14s14 6 14 14"/>' +
          '<circle cx="106" cy="24" r="11"/><path d="M92 56c0-8 6-15 14-15s14 7 14 15"/>' +
          '<circle cx="158" cy="24" r="11"/><path d="M144 56c0-8 6-15 14-15s14 7 14 15"/>' +
          '<circle cx="208" cy="30" r="11"/><path d="M194 60c0-8 6-14 14-14s14 6 14 14"/>' +
        '</g>' +
        '<path class="mp-t-top" d="M18 70h230"/>' +
        '<path class="mp-t-leg" d="M40 70v26M226 70v26"/>' +
        '<g class="mp-t-chair">' +
          '<path d="M262 40v38"/>' +           /* chair back */
          '<path d="M262 78h26"/>' +           /* seat */
          '<path d="M264 78v18M286 78v18"/>' + /* legs */
        '</g>' +
      '</svg>' +
      '<h2 class="mp-mission-h">pull up a chair.</h2>' +
      '<p class="mp-mission-lede">A seat at the table for life\u2019s big moves \u2014 money, legal, ' +
      'and independence, at <b>any stage</b>. No jargon, no shame, no gatekeeping.</p>' +
      '<p class="mp-mission-p">It started at a table. What began as catching up turned into money ' +
      '\u2014 what people didn\u2019t know, what they\u2019d never asked, what they\u2019d been handling ' +
      'alone. One woman rebuilding from zero after a long marriage, down to <b>her own email ' +
      'address</b>. One whose mother slowly stopped being the person who decided what anything ' +
      'cost. One doing everything right and certain she was behind, because she\u2019d never seen ' +
      'anyone else\u2019s numbers.</p>' +
      '<p class="mp-mission-p">Three stages of life, and not one of those conversations happens ' +
      'in daylight. There was nowhere obvious to send any of them. maltiplata is that table, ' +
      'written down.</p>' +
      '<p class="mp-mission-p mp-mission-punch">Money is the boring word for something that isn\u2019t ' +
      'boring at all: <b>the number of choices you get to make.</b> Learn the thing. Change the ' +
      'career. Book the trip. Start the business. Marriage can be one of the things you build \u2014 ' +
      'it doesn\u2019t have to be the only one.</p>' +
      '<a class="mp-mission-cta" href="./about/index.html">read the whole story \u2192</a>' +
      '</div>';
    anchor.parentNode.insertBefore(sec, anchor);
    return true;
  }

  /* -------- 8. "WHERE DO I START?" ENTRY BANNER -------- */
  function startBanner() {
    if (document.getElementById('mp-startbar')) return true;
    var anchor = document.querySelector('.hero-search');
    if (!anchor) return false;
    var host = anchor.parentNode;
    var bar = document.createElement('a');
    bar.id = 'mp-startbar';
    bar.href = './start/index.html';
    bar.innerHTML =
      '<span class="mp-sb-emoji">\uD83E\uDDED</span>' +
      '<span class="mp-sb-copy"><b>not sure where to start?</b>' +
      '<i>tell us what\u2019s going on \u2014 we\u2019ll point you at the 2\u20133 things that help</i></span>' +
      '<span class="mp-sb-go">\u2192</span>';
    host.insertBefore(bar, anchor.nextSibling);
    return true;
  }


  /* -------- 9. HERSTORY BAND: three receipts, visible at once -------- */
  var HERSTORY = [
    ['1963', 'Equal pay became law \u2014 the gap is still open sixty years on.'],
    ['1974', 'A credit card in her own name, without a man\u2019s signature.'],
    ['1988', 'A business loan in every state, without a male co-signer.']
  ];
  function herstoryLine() {
    if (document.getElementById('mp-herstory')) return true;
    var anchor = document.getElementById('start-here');
    if (!anchor) return false;
    var rows = HERSTORY.map(function (r) {
      return '<li><span class="mp-hs-y">' + r[0] + '</span>' +
             '<span class="mp-hs-t">' + r[1] + '</span></li>';
    }).join('');
    var sec = document.createElement('section');
    sec.id = 'mp-herstory';
    sec.innerHTML =
      '<div class="mp-hs-card">' +
        '<p class="mp-hs-k">herstory \u00b7 the receipts</p>' +
        '<h2 class="mp-hs-h">this is all newer than you think.</h2>' +
        '<p class="mp-hs-lede">Most of women\u2019s financial rights are younger than your parents. ' +
        'That\u2019s not trivia \u2014 it\u2019s why nobody taught you this.</p>' +
        '<ul class="mp-hs-list">' + rows + '</ul>' +
        '<div class="mp-hs-links">' +
          '<a class="mp-hs-btn" href="./herstory/index.html">then / now / next &rarr;</a>' +
          '<a class="mp-hs-btn mp-hs-btn--alt" href="./herstory/firsts.html">women who went first &rarr;</a>' +
        '</div>' +
      '</div>';
    anchor.parentNode.insertBefore(sec, anchor);
    return true;
  }

  /* ---------------- run + retry ---------------- */
  var done = {};
  function tick() {
    if (!done.sticky) done.sticky = stickySearch();
    if (!done.hero) done.hero = heroSearch();
    if (!done.art) done.art = cardArt();
    if (!done.dict) done.dict = makeCarousel('dictionary', '.dictionary-card',
      { delay: 4200, allHref: './dictionary/index.html', allLabel: 'all words →' });
    if (!done.wall) done.wall = makeCarousel('reclaim', '.reclaim-card',
      { delay: 5200, allHref: './wall/index.html', allLabel: 'the whole wall →' });
    if (!done.dictlink) done.dictlink = linkDictCards();
    if (!done.startbar) done.startbar = startBanner();
    if (!done.mission) done.mission = missionBand();
    if (!done.herstory) done.herstory = herstoryLine();
    if (!done.hide) done.hide = hideSections();
    if (!done.cMat) done.cMat = nameBand();
    if (!done.cWall) done.cWall = compact('reclaim', {
      bg:'var(--pink)', kicker:'the reclaim wall',
      head:'someone taught us money was private. we\u2019re done keeping secrets.',
      body:'Anonymous stories about what money was never explained \u2014 a salary nobody would name, a loan nobody explained, a bill somebody hid \u2014 and exactly what people did about it. Yours can be one of them.',
      cta:'read the wall \u2192', href:'./wall/index.html' });
  }
  function start() { tick(); [250, 700, 1400, 2500].forEach(function (t) { setTimeout(tick, t); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
