export const initRevealAnimations = () => {
  const revealEls = document.querySelectorAll(".reveal");

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach((el) => observer.observe(el));
};

export const initPageTransitions = () => {
  document.body.classList.add("page-loaded");

  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      const linkUrl = new URL(link.href);

      if (currentUrl.origin !== linkUrl.origin) return;

      event.preventDefault();
      document.body.classList.remove("page-loaded");
      document.body.classList.add("page-exit");

      window.setTimeout(() => {
        window.location.href = link.href;
      }, 250);
    });
  });
};
