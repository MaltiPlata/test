/* maltiplata — inline SVG icon system.
   Injects a category icon into every .l-card on index pages, and adds
   decorative marks where a page is otherwise all type.
   No external requests. Icons inherit --ink so they work on every card colour. */
(function () {
  'use strict';

  var P = {
    build:     '<path d="M6 40h36M12 40V22l12-9 12 9v18"/><path d="M20 40V29h8v11"/>',
    retirement:'<path d="M24 6v22"/><path d="M24 28c0-7 5-12 12-12 0 7-5 12-12 12z"/><path d="M24 28c0-7-5-12-12-12 0 7 5 12 12 12z"/><path d="M13 34h22l-3 8H16z"/>',
    legal:     '<path d="M24 7v30"/><path d="M13 41h22"/><path d="M9 15h30"/><path d="M14 15l-5 11h10zM34 15l-5 11h10z"/>',
    work:      '<rect x="6" y="15" width="36" height="24" rx="3"/><path d="M18 15v-4h12v4"/><path d="M6 25h36"/>',
    taxes:     '<path d="M12 5h24v38l-4-3-4 3-4-3-4 3-4-3-4 3z"/><path d="M18 15h12M18 22h12M18 29h7"/>',
    life:      '<path d="M24 41S8 31 8 19a8 8 0 0116-4 8 8 0 0116 4c0 12-16 22-16 22z"/>',
    insurance: '<path d="M24 6l14 5v12c0 10-7 16-14 19-7-3-14-9-14-19V11z"/><path d="M18 23l4 4 8-8"/>',
    debt:      '<path d="M9 33l9-9 7 6 13-14"/><path d="M38 16h-8m8 0v8"/><path d="M6 41h36"/>',
    save:      '<path d="M10 18h28a4 4 0 014 4v14a4 4 0 01-4 4H10a4 4 0 01-4-4V22a4 4 0 014-4z"/><path d="M32 26h6"/><path d="M12 18c0-6 5-10 12-10s12 4 12 10"/>',
    invest:    '<path d="M8 38l9-11 7 6 8-12 8 7"/><path d="M6 42h36"/><circle cx="17" cy="27" r="2.5"/><circle cx="32" cy="21" r="2.5"/>',
    safety:    '<path d="M24 5l16 6v13c0 11-8 17-16 20-8-3-16-9-16-20V11z"/><path d="M24 18v8M24 31v.5"/>',
    credit:    '<rect x="5" y="12" width="38" height="25" rx="4"/><path d="M5 20h38"/><rect x="11" y="27" width="12" height="3.5" rx="1.5"/>',
    borrow:    '<path d="M24 8v32"/><path d="M31 15c0-3-3-5-7-5s-7 2-7 5 3 4 7 5 7 2 7 5-3 5-7 5-7-2-7-5"/>',
    home:      '<path d="M6 23L24 8l18 15"/><path d="M11 21v19h26V21"/><rect x="20" y="28" width="8" height="12"/>',
    money:     '<circle cx="24" cy="24" r="16"/><path d="M24 14v20"/><path d="M29 19c0-2-2.5-3.5-5-3.5s-5 1.5-5 3.5 2.5 3 5 3.5 5 1.5 5 3.5-2.5 3.5-5 3.5-5-1.5-5-3.5"/>',
    table:     '<path d="M4 20h40"/><path d="M9 20v16M39 20v16"/><path d="M16 20v-4h6v4M26 20v-4h6v4"/><circle cx="19" cy="11" r="3"/><circle cx="29" cy="11" r="3"/>',
    shield:    '<path d="M24 6l14 5v12c0 10-7 16-14 19-7-3-14-9-14-19V11z"/>',
    stamp:     '<circle cx="24" cy="18" r="10"/><path d="M12 34h24v6H12z"/><path d="M24 13v10M20 16h8"/>',
    thread:    '<circle cx="24" cy="24" r="7"/><path d="M24 3v14M24 31v14M3 24h14M31 24h14"/>',
    tag:       '<path d="M25 5H43v18L23 43 5 25z"/><circle cx="35" cy="13" r="3"/>',
    receipt:   '<path d="M11 5h26v38l-4-3-4 3-4-3-4 3-4-3-6 3z"/><path d="M17 15h14M17 22h14M17 29h8"/>',
    badge:     '<circle cx="24" cy="18" r="11"/><path d="M17 27l-3 16 10-5 10 5-3-16"/>',
    phone:     '<rect x="14" y="4" width="20" height="40" rx="4"/><path d="M21 9h6"/><circle cx="24" cy="37" r="1.8"/>',
    box:       '<path d="M6 15l18-8 18 8v18l-18 8-18-8z"/><path d="M6 15l18 8 18-8M24 23v18"/>',
    bank:      '<path d="M5 19L24 8l19 11"/><path d="M10 19v18M19 19v18M29 19v18M38 19v18"/><path d="M5 41h38"/>',
    scroll:    '<path d="M10 8h22v32H10z"/><path d="M32 8h6v26a6 6 0 01-6 6"/><path d="M16 16h12M16 23h12M16 30h7"/>',
    pin:       '<path d="M24 43V26"/><path d="M17 5h14l-2 12 6 6H13l6-6z"/>',
    target:    '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="3.5"/>',
    medal:     '<circle cx="24" cy="30" r="10"/><path d="M17 21L12 5h24l-5 16"/><path d="M24 26l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z"/>',
    baby:      '<circle cx="24" cy="16" r="9"/><path d="M10 43c0-8 6-13 14-13s14 5 14 13"/><path d="M20 15v.5M28 15v.5"/>',
    grad:      '<path d="M24 9L44 18 24 27 4 18z"/><path d="M12 22v11c0 4 24 4 24 0V22"/><path d="M42 19v12"/>',
    heartbeat: '<path d="M24 40S9 31 9 20a7.5 7.5 0 0115-3 7.5 7.5 0 0115 3c0 11-15 20-15 20z"/><path d="M12 22h6l3-5 4 10 3-5h8"/>',
    umbrella:  '<path d="M24 7v29a5 5 0 01-10 0"/><path d="M4 22a20 20 0 0140 0z"/>',
    scale:     '<path d="M24 8v32"/><path d="M13 40h22"/><path d="M8 16h32"/><path d="M13 16l-5 11h10zM35 16l-5 11h10z"/>',
    ring:      '<circle cx="24" cy="28" r="11"/><path d="M18 17l6-8 6 8"/>',
    split:     '<path d="M24 6v14"/><path d="M24 20L12 32M24 20l12 12"/><path d="M12 32v10M36 32v10"/>',
    clock:     '<circle cx="24" cy="24" r="17"/><path d="M24 13v11l8 5"/>',
    key:       '<circle cx="16" cy="24" r="8"/><path d="M24 24h18M36 24v7M42 24v5"/>'
  };

  /* per-topic overrides so one category doesn't render fifteen identical icons */
  var BY_SLUG = {
    'trademark-your-name':'stamp', 'start-an-etsy-shop':'thread', 'price-your-work':'tag',
    'get-paid-freelance':'receipt', 'women-owned-certification':'badge', 'creator-income':'phone',
    'sell-on-amazon':'box', 'business-banking-books':'bank', 'read-a-contract':'scroll',
    'pinterest-traffic':'pin', 'grants-for-women':'target', 'military-spouse-money':'medal',
    'how-to-start-an-llc':'build', 'self-employed-retirement':'retirement',
    'freelance-taxes':'receipt', 'w4-explained':'scroll', 'kids-and-taxes':'baby',
    'how-to-file-taxes':'taxes', 'head-of-household':'home', 'child-support-basics':'scale',
    'single-parent-safety-net':'shield', 'pslf-explained':'grad', '403b-decoded':'retirement',
    'self-employed-health-insurance':'heartbeat', 'disability-insurance':'umbrella',
    'spousal-ira':'ring', 'divorce-money-checklist':'split', 'prenup-101':'scale',
    'financial-abuse':'shield', 'beneficiary-designations':'key', 'social-security-for-women':'clock',
    'caregiving-career-break':'clock', 'great-wealth-transfer':'key',
    'where-to-park-cash':'bank', 'emergency-fund':'shield', 'start-investing':'invest',
    'how-to-build-credit':'credit', 'down-payment-myth':'home', 'old-401k-rollover':'retirement',
    'hsa-stealth-retirement':'heartbeat', 'equity-compensation':'invest',
    'vet-a-financial-advisor':'target', 'crypto-honestly':'money'
  };


  function svg(kind) {
    var d = P[kind] || P.money;
    return '<svg class="mp-ico" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
           d + '</svg>';
  }

  /* strip a leading emoji from card titles once icons are present */
  var EMOJI = /^\s*(?:[\u00A9\u00AE\u2000-\u3300\uFE0F\u200D]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF])+\s*/;

  function decorateCards() {
    var cards = document.querySelectorAll('.l-card:not([data-mp-ico])');
    if (!cards.length) return false;
    cards.forEach(function (c) {
      c.setAttribute('data-mp-ico', '1');
      var slug = c.getAttribute('data-slug') ||
                 (c.getAttribute('href') || '').split('/').pop().replace('.html', '');
      var kind = BY_SLUG[slug] || c.getAttribute('data-kind') || 'money';
      var title = c.querySelector('.l-title');
      if (title) title.textContent = title.textContent.replace(EMOJI, '');
      var holder = document.createElement('span');
      holder.className = 'mp-ico-wrap';
      holder.innerHTML = svg(kind);
      c.insertBefore(holder, c.firstChild);
    });
    return true;
  }

  function run() {
    decorateCards();
    [200, 600, 1200, 2200].forEach(function (t) { setTimeout(decorateCards, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
