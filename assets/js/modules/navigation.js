const isMobile = () => window.matchMedia("(max-width: 980px)").matches;

export const initNavigation = () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 12);
  });

  toggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(":scope > a");
    const panel = dropdown.querySelector(".dropdown-panel");
    let closeTimer;

    if (!trigger || !panel) return;

    const openDropdown = () => {
      if (isMobile()) return;
      clearTimeout(closeTimer);
      panel.classList.add("open");
    };

    const closeDropdown = () => {
      if (isMobile()) return;
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => panel.classList.remove("open"), 350);
    };

    dropdown.addEventListener("mouseenter", openDropdown);
    dropdown.addEventListener("mouseleave", closeDropdown);
    panel.addEventListener("mouseenter", openDropdown);
    panel.addEventListener("mouseleave", closeDropdown);

    trigger.addEventListener("click", (event) => {
      if (isMobile()) return;
      event.preventDefault();
      panel.classList.toggle("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (isMobile()) return;
    document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.querySelector(".dropdown-panel")?.classList.remove("open");
      }
    });
  });
};
