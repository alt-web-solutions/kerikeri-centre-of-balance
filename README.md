# Kerikeri Centre of Balance website

Static HTML/CSS/JavaScript website concept for Kerikeri Centre of Balance.

## Structure

- `*.html` — individual website pages. Each page now keeps only page-specific content inside `<main>`.
- `assets/css/styles.css` — shared design tokens, layout styles, components and responsive rules.
- `assets/js/main.js` — main JavaScript entry point.
- `assets/js/site-data.js` — shared site data, navigation labels, service links and contact details.
- `assets/js/modules/` — modular scripts for shared components, navigation, animations and the testimonial carousel.
- `assets/images/` — website images and logos.

## Notes for deployment

- External booking buttons have been changed to internal contact links until the final booking/deployment plan is confirmed.
- The shared header and footer are generated from `assets/js/modules/components.js` using data from `assets/js/site-data.js`, which keeps repeated markup out of every page.
- Phone links and footer Facebook link are still present. Update or remove these in `assets/js/site-data.js` if the client changes their preferred contact details.

## Local preview

From this folder, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
- Treatment-page duplicate list/paragraph content has been cleaned and related lists have been merged into single semantic lists.
