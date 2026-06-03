export const initTestimonialCarousel = () => {
  const carousel = document.querySelector(".testimonial-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".testimonial-track");
  const slides = Array.from(carousel.querySelectorAll(".testimonial-slide"));
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const dotsWrap = carousel.querySelector(".carousel-dots");
  let currentIndex = 0;
  let autoplayTimer;

  if (!track || slides.length === 0) return;

  const slidesPerView = () => {
    if (window.matchMedia("(max-width: 680px)").matches) return 1;
    if (window.matchMedia("(max-width: 980px)").matches) return 2;
    return 3;
  };

  const maxIndex = () => Math.max(slides.length - slidesPerView(), 0);

  const createDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";

    for (let i = 0; i <= maxIndex(); i += 1) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
    }
  };

  const updateCarousel = () => {
    currentIndex = Math.min(currentIndex, maxIndex());
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * (width + gap)}px)`;

    dotsWrap?.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  const next = () => {
    currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
    updateCarousel();
  };

  const previous = () => {
    currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
    updateCarousel();
  };

  const startAutoplay = () => { autoplayTimer = window.setInterval(next, 10000); };
  const stopAutoplay = () => window.clearInterval(autoplayTimer);
  const restartAutoplay = () => { stopAutoplay(); startAutoplay(); };

  nextBtn?.addEventListener("click", () => { next(); restartAutoplay(); });
  prevBtn?.addEventListener("click", () => { previous(); restartAutoplay(); });
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  window.addEventListener("resize", () => { createDots(); updateCarousel(); });

  createDots();
  updateCarousel();
  startAutoplay();
};
