/* Valley · theme switcher: follows the system, remembers the choice */
(function () {
  var KEY = "valley-theme", root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function systemDark() { return !(window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches); }
  function apply(t) {
    root.setAttribute("data-theme", t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "dark" ? "#0c0706" : "#fff3ea");
    var b = document.querySelector(".theme-toggle");
    if (b) {
      b.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
      b.setAttribute("aria-pressed", t === "dark");
    }
  }
  apply(saved() || (systemDark() ? "dark" : "light"));

  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)"),
        onChange = function () { if (!saved()) apply(mq.matches ? "dark" : "light"); };
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener && mq.addListener(onChange);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".nav");
    if (!nav || nav.querySelector(".theme-toggle")) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "theme-toggle";
    b.innerHTML =
      '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    b.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.classList.add("theme-anim");
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      setTimeout(function () { root.classList.remove("theme-anim"); }, 450);
    });
    nav.appendChild(b);
    apply(root.getAttribute("data-theme"));
  });
})();
