(function() {
  var searchData = null;
  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var toggle = document.getElementById('searchToggle');
  var close = document.getElementById('searchClose');

  if (!overlay || !input || !results || !toggle) return;

  function loadData() {
    if (searchData) return Promise.resolve(searchData);
    return fetch('/content.json', { cache: 'no-cache' }).then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function(data) {
      searchData = data;
      return data;
    });
  }

  function search(query) {
    if (!query.trim()) { results.innerHTML = ''; return; }
    var q = query.toLowerCase();
    loadData().then(function(data) {
      var hits = [];
      (data.posts || []).forEach(function(post) {
        if ((post.title && post.title.toLowerCase().indexOf(q) >= 0) ||
            (post.text && post.text.toLowerCase().indexOf(q) >= 0) ||
            (post.tags && post.tags.some(function(t) { return (typeof t === 'string' ? t : t.name || '').toLowerCase().indexOf(q) >= 0; })) ||
            (post.categories && post.categories.some(function(c) { return (c.name || '').toLowerCase().indexOf(q) >= 0; }))) {
          hits.push(post);
        }
      });
      if (!hits.length) { results.innerHTML = '<div class="search-result-empty">未找到匹配结果</div>'; return; }
      function fmtDate(d) {
        if (!d) return '';
        var m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
        return m ? m[1] + '-' + m[2] + '-' + m[3] : d.slice(0, 10);
      }
      var html = '';
      hits.forEach(function(post) {
        html += '<a class="search-result-item" href="/' + post.path + '">' +
          '<span class="search-result-title">' + (post.title || '(无标题)') + '</span>' +
          '<span class="search-result-date">' + fmtDate(post.date) + '</span></a>';
      });
      results.innerHTML = html;
    }).catch(function(err) {
      results.innerHTML = '<div class="search-result-empty">搜索加载失败: ' + err.message + '</div>';
    });
  }

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    overlay.classList.add('active');
    setTimeout(function() { input.focus(); }, 100);
  });

  close.addEventListener('click', function() {
    overlay.classList.remove('active');
    input.value = '';
    results.innerHTML = '';
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      input.value = '';
      results.innerHTML = '';
    }
  });

  var timer = null;
  input.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(function() { search(input.value); }, 200);
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      overlay.classList.remove('active');
      input.value = '';
      results.innerHTML = '';
    }
  });
})();
