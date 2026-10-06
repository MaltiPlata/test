/* maltiplata — email signup (Kit)
   Every form with data-capture sends the email to Kit, which emails the Money Map.
   Kit form: "money map" (id below). To switch forms, change KIT_FORM_ID only. */
(function(){
  var KIT_FORM_ID = '10011994';
  var ENDPOINT = 'https://app.kit.com/forms/' + KIT_FORM_ID + '/subscriptions';
  var PDF = (document.querySelector('meta[name="mp-root"]') ? document.querySelector('meta[name="mp-root"]').content : './') + 'downloads/the-money-map-maltiplata.pdf';

  var css = document.createElement('style');
  css.textContent = '.mp-done{display:flex;flex-direction:column;gap:6px;font:inherit;color:inherit;line-height:1.5}' +
    '.mp-done b{font-size:1.15em;font-weight:900;letter-spacing:-.01em}.mp-done a{color:inherit;font-weight:800;text-decoration:underline}' +
    '.mp-note{font-size:13px;margin:6px 0 0;opacity:.9}';
  document.head.appendChild(css);

  function note(form, html){
    var n = form.querySelector('.mp-note');
    if(!n){ n = document.createElement('p'); n.className = 'mp-note'; n.setAttribute('role','status'); form.appendChild(n); }
    n.innerHTML = html;
  }
  function done(form){
    form.innerHTML = '<div class="mp-done" role="status"><b>you\u2019re in \u2726</b>' +
      '<span>check your inbox and tap <strong>confirm</strong> \u2014 the money map is on its way. ' +
      '(can\u2019t wait? <a href="' + PDF + '" download>grab it right now</a>.)</span></div>';
  }
  function send(email, mode){
    var body = new FormData(); body.append('email_address', email);
    return fetch(ENDPOINT, { method:'POST', body:body, mode:mode, headers: mode==='cors' ? {'Accept':'application/json'} : undefined });
  }

  document.querySelectorAll('form[data-capture]').forEach(function(form){
    form.setAttribute('novalidate','');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input ? input.value.trim() : '';
      if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        note(form, 'that email doesn\u2019t look right \u2014 try again?'); if(input) input.focus(); return;
      }
      var btn = form.querySelector('button'); if(btn){ btn.disabled = true; }
      note(form, 'sending\u2026');
      send(email,'cors')
        .then(function(r){ if(!r.ok && r.status !== 0) throw new Error('status ' + r.status); done(form); })
        .catch(function(){
          // some browsers block reading Kit's reply; send it plainly instead
          send(email,'no-cors').then(function(){ done(form); })
            .catch(function(){
              if(btn){ btn.disabled = false; }
              note(form, 'something went sideways. <a href="' + PDF + '" download>download the map directly</a> and try your email again later.');
            });
        });
    });
  });
})();
