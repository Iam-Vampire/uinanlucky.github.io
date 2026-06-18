(function () {
  document.querySelectorAll('.post-content figure.highlight').forEach(function(fig) {
    var wrap = document.createElement('div');
    wrap.className = 'highlight-container';
    fig.parentNode.insertBefore(wrap, fig);
    wrap.appendChild(fig);

    var lang = '';
    var m = fig.className.match(/highlight\s+(\w+)/);
    if (m && m[1] !== 'plaintext') lang = m[1];

    var header = document.createElement('div');
    header.className = 'code-header';

    var left = document.createElement('span');
    left.className = 'code-header-left';

    var foldBtn = document.createElement('span');
    foldBtn.className = 'code-tool fold-btn';
    foldBtn.innerHTML = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>';
    foldBtn.addEventListener('click', function() {
      fig.classList.toggle('folded');
      wrap.classList.toggle('folded');
      foldBtn.innerHTML = wrap.classList.contains('folded')
        ? '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><polyline points="4.5 9 7.5 6 4.5 3"/></svg>'
        : '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>';
    });
    left.appendChild(foldBtn);

    if (lang) {
      var langEl = document.createElement('span');
      langEl.className = 'code-lang';
      langEl.textContent = lang;
      left.appendChild(langEl);
    }

    header.appendChild(left);

    var copyBtn = document.createElement('span');
    copyBtn.className = 'code-tool copy-btn';
    copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
    copyBtn.addEventListener('click', function() {
      var code = [].map.call(fig.querySelectorAll('.code .line'), function(l) { return l.innerText; }).join('\n');
      var tta = document.createElement('textarea');
      tta.style.position = 'fixed';
      tta.style.top = '-9999px';
      tta.style.left = '-9999px';
      tta.value = code;
      document.body.appendChild(tta);
      tta.select();
      try {
        document.execCommand('copy');
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>';
      } catch(e) {
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      }
      document.body.removeChild(tta);
      setTimeout(function() {
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
      }, 2000);
    });
    header.appendChild(copyBtn);

    wrap.insertBefore(header, fig);
  });
})();
