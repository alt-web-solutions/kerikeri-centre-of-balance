import { initPageTransitions, initRevealAnimations } from "./modules/animations.js";
import { initTestimonialCarousel } from "./modules/carousel.js";
import { renderComponents } from "./modules/components.js";
import { initNavigation } from "./modules/navigation.js";

renderComponents();
initNavigation();
initRevealAnimations();
initTestimonialCarousel();
initPageTransitions();
