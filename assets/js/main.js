(() => {
  "use strict";

  const initNavigation = () => {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;

    toggle.hidden = false;
    document.documentElement.classList.add("has-nav-js");

    const setOpen = (open, returnFocus = false) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);

      if (!open && returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false, true);
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 56.25em)");
    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) {
        setOpen(false);
      }
    });
  };

  const initActiveSection = () => {
    const links = Array.from(document.querySelectorAll('[data-nav] a[href^="#"]'));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const hero = document.getElementById("hero");

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const setCurrent = (id) => {
      links.forEach((link) => {
        if (id && link.getAttribute("href") === `#${id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === hero) {
            setCurrent(null);
          } else {
            setCurrent(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    [hero, ...sections].filter(Boolean).forEach((section) => observer.observe(section));
  };

  const initFooterYear = () => {
    const year = document.querySelector("[data-year]");
    if (!year) return;
    year.textContent = String(new Date().getFullYear());
  };

  const init = () => {
    [initNavigation, initActiveSection, initFooterYear].forEach((enhancement) => {
      try {
        enhancement();
      } catch {
        // Content and navigation remain usable if an enhancement fails.
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
