// Marco Túlio Ribeiro Advocacia — interações da página
(function () {
  "use strict";

  // Ano automático no rodapé
  var yearEl = document.getElementById("year");
  if (yearEl) {
    var now = new Date().getFullYear();
    yearEl.textContent = "© " + now + " Marco Túlio Ribeiro Advocacia. Todos os direitos reservados.";
  }

  // Navbar: sombra ao rolar
  var navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.getElementById("navToggle");
  var close = document.getElementById("navClose");
  var menu = document.getElementById("mobileMenu");
  function openMenu() {
    menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (toggle) toggle.addEventListener("click", openMenu);
  if (close) close.addEventListener("click", closeMenu);
  if (menu) {
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  // Realce do link ativo no menu, conforme a seção visível
  var sections = document.querySelectorAll("main section[id], .about[id]");
  var navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  // Revelar elementos ao rolar a página
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
