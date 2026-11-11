// Small enhancements; the page works without them.
(function () {
  var KEY = 'impoluto-lang';
  var store = {
    get: function () {
      try {
        return localStorage.getItem(KEY);
      } catch (e) {
        return null;
      }
    },
    set: function (v) {
      try {
        localStorage.setItem(KEY, v);
      } catch (e) {}
    },
  };

  // Offer the other language when the browser prefers it. Never redirects on its own.
  var bar = document.querySelector('[data-lang-suggest]');
  if (bar && !store.get()) {
    var target = bar.getAttribute('data-lang-suggest');
    var current = document.documentElement.lang;
    var prefs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']).map(
      function (l) {
        return String(l).slice(0, 2).toLowerCase();
      },
    );
    var wantsTarget = prefs.indexOf(target) !== -1 && prefs.indexOf(target) < (prefs.indexOf(current) + 1 || Infinity);
    if (wantsTarget) bar.hidden = false;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-lang-choice], [data-lang-dismiss]');
    if (!el) return;
    if (el.hasAttribute('data-lang-dismiss')) {
      store.set(document.documentElement.lang);
      if (bar) bar.hidden = true;
    } else {
      store.set(el.getAttribute('data-lang-choice'));
    }
  });

  // Hairline under the header once the page scrolls.
  var top = document.querySelector('.top');
  if (top) {
    var onScroll = function () {
      top.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
