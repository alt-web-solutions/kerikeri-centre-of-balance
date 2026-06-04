export const initRevealAnimations = () => {
  const desktopQuery = window.matchMedia("(min-width: 981px)");
  let observer;

  const syncRevealState = () => {
    observer?.disconnect();
    observer = undefined;

    const revealEls = document.querySelectorAll(".reveal, [data-reveal-disabled-mobile]");

    if (!desktopQuery.matches) {
      revealEls.forEach((el) => {
        if (el.classList.contains("reveal")) {
          el.classList.remove("reveal");
          el.dataset.revealDisabledMobile = "true";
        }
      });
      return;
    }

    revealEls.forEach((el) => {
      if (el.dataset.revealDisabledMobile === "true") {
        el.classList.add("reveal");
        delete el.dataset.revealDisabledMobile;
      }
    });

    const activeRevealEls = document.querySelectorAll(".reveal:not(.visible)");

    if (!("IntersectionObserver" in window)) {
      activeRevealEls.forEach((el) => el.classList.add("visible"));
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    activeRevealEls.forEach((el) => observer.observe(el));
  };

  syncRevealState();
  desktopQuery.addEventListener("change", syncRevealState);
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
