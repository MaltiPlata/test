/* auto-generated — do not hand-edit. Neutralizes links to guide pages that don't exist yet. */
(function(){
  var LIVE=["airline-miles-credit-card","buying-your-first-car","credit-card-interest-trap","difference-between-stocks","discipline-over-therapy-shopping","dont-grubhub-invest-the-difference","health-insurance-decoded","hotel-card-couples-combo","how-to-get-out-of-debt","how-to-negotiate-your-salary","money-legal-101-for-women","mortgage-points-worth-it","save-on-food-without-feeling-deprived","side-hustle-taxes","student-loans-decoded","sudden-money-what-to-do","the-investing-gap","the-longevity-gap","the-matilda-effect","the-pink-tax","the-stuff-nobody-taught-you","where-to-actually-invest","where-your-paycheck-actually-goes","women-money-101","your-first-apartment","your-paystub-decoded"];
  function ok(h){ if(!h) return true;
    var m=String(h).match(/guides\/([^\/?#]+)\.html/); if(!m) return true;
    if(m[1]==='index') return true;           /* never disable the library link */
    return LIVE.indexOf(m[1])>-1; }
  function sweep(){
    var as=document.querySelectorAll('a[href*="guides/"]');
    for(var i=0;i<as.length;i++){ var a=as[i];
      if(ok(a.getAttribute('href'))||a.dataset.mpSoon) continue;
      a.dataset.mpSoon='1'; a.removeAttribute('href'); a.setAttribute('aria-disabled','true');
      a.style.opacity='.55'; a.style.cursor='default'; a.style.pointerEvents='none';
      var go=a.querySelector('.a-rel-go');
      if(go) go.textContent='coming soon';
      else if(!/soon/i.test(a.textContent)) a.textContent=a.textContent.replace(/\s*\u2192\s*$/,'')+' \u00b7 soon';
    }
  }
  function start(){ sweep(); new MutationObserver(sweep).observe(document.body,{childList:true,subtree:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
