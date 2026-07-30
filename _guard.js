/* auto-generated — do not hand-edit. Neutralizes links to guide pages that don't exist yet. */
(function(){
  var LIVE=["difference-between-stocks","health-insurance-decoded","how-to-get-out-of-debt","how-to-negotiate-your-salary","save-on-food-without-feeling-deprived","student-loans-decoded","where-to-actually-invest","where-your-paycheck-actually-goes","your-paystub-decoded"];
  function ok(h){ if(!h) return true;
    var m=String(h).match(/\/guides\/([^\/?#]+)\.html/); if(!m) return true;
    return LIVE.indexOf(m[1])>-1; }
  function sweep(){
    var as=document.querySelectorAll('a[href*="/guides/"]');
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
