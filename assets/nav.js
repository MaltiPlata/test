/* maltiplata — mobile nav.
   Under 860px the nav links are hidden by CSS, which left article pages with no
   way back except the browser button. This adds a menu button + panel, and a
   "back to top" pill on long pages. Works on any page containing .a-nav. */
(function () {
  'use strict';

  var LINKS = [
    ['start here', 'start/index.html'],
    ['topics', 'topics/index.html'],
    ['guides', 'guides/index.html'],
    ['dictionary', 'dictionary/index.html'],
    ['herstory', 'herstory/index.html'],
    ['about', 'about/index.html']
  ];

  /* how many folders deep are we? drives the ../ prefix */
  function prefix() {
    var p = location.pathname.replace(/\/+$/, '/index.html');
    var depth = p.split('/').filter(Boolean).length - 1;
    return depth > 0 ? new Array(depth + 1).join('../') : './';
  }

  function build() {
    var nav = document.querySelector('.a-nav') || document.querySelector('nav.nav');
    if (!nav || document.getElementById('mp-menu-btn')) return false;

    var pre = prefix();
    var here = location.pathname.split('/').filter(Boolean).slice(-2).join('/');

    /* menu button */
    var btn = document.createElement('button');
    btn.id = 'mp-menu-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mp-menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    /* panel */
    var panel = document.createElement('div');
    panel.id = 'mp-menu';
    panel.hidden = true;
    var html = '<nav aria-label="Site"><ul>';
    LINKS.forEach(function (l) {
      var on = here && l[1].indexOf(here.split('/')[0] + '/') === 0;
      html += '<li><a href="' + pre + l[1] + '"' + (on ? ' aria-current="page"' : '') +
              '>' + l[0] + '</a></li>';
    });
    html += '</ul>' +
      '<a class="mp-menu-cta" href="' + pre + 'index.html#join">get the money map &rarr;</a>' +
      '</nav>';
    panel.innerHTML = html;
    document.body.appendChild(panel);

    function setOpen(open) {
      panel.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      btn.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('mp-menu-lock', open);
      if (open) { var f = panel.querySelector('a'); if (f) f.focus(); }
    }

    btn.addEventListener('click', function () {
      setOpen(panel.hidden);
    });
    panel.addEventListener('click', function (e) {
      if (e.target === panel || e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { setOpen(false); btn.focus(); }
    });

    /* back-to-top pill, only on genuinely long pages */
    if (document.body.scrollHeight > innerHeight * 3) {
      var top = document.createElement('button');
      top.id = 'mp-top';
      top.type = 'button';
      top.setAttribute('aria-label', 'Back to top');
      top.innerHTML = '&uarr; top';
      document.body.appendChild(top);
      top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      var tick = false;
      addEventListener('scroll', function () {
        if (tick) return;
        tick = true;
        requestAnimationFrame(function () {
          top.classList.toggle('is-on', scrollY > innerHeight * 1.5);
          tick = false;
        });
      }, { passive: true });
    }
    return true;
  }

  /* the homepage nav is rendered by React after load, so retry a few times */
  function run() {
    if (build()) return;
    [150, 400, 900, 1600, 2600].forEach(function (t) { setTimeout(build, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
