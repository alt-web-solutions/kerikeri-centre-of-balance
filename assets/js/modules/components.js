import { footerServices, navItems, site } from "../site-data.js";

const isCurrentPage = (href) => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  return href === current;
};

const renderNavItem = (item) => {
  if (!item.children) {
    return `<a href="${item.href}" ${isCurrentPage(item.href) ? 'aria-current="page"' : ""}>${item.label}</a>`;
  }

  const childLinks = item.children
    .map(
      (child) =>
        `<a href="${child.href}" ${isCurrentPage(child.href) ? 'aria-current="page"' : ""}>${child.label}</a>`,
    )
    .join("");

  return `
    <div class="nav-dropdown">
      <a href="${item.href}" ${isCurrentPage(item.href) ? 'aria-current="page"' : ""}>${item.label}</a>
      <div class="dropdown-panel">${childLinks}</div>
    </div>`;
};

const headerTemplate = () => `
  <header class="site-header">
    <a href="index.html" class="brand" aria-label="${site.name} home">
      <img src="assets/images/logo-withbyline.avif" alt="${site.name} logo" />
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" aria-label="Main navigation">
      ${navItems.map(renderNavItem).join("")}
      <a class="book-btn" href="${site.bookingHref}">Contact to Book</a>
    </nav>
  </header>`;

const footerLinkList = (items) =>
  items.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");

const footerNavItems = [
  { label: "Home", href: "index.html" },
  { label: "Services", href: "services.html" },
  { label: "About", href: "about.html" },
  { label: "Before You Visit", href: "what-else-do-you-need-to-know.html" },
  { label: "Contact", href: "contact.html" },
  { label: "Privacy", href: "privacy.html" },
];

const applyHeadAssets = () => {
  const headAssets = [
    { rel: "icon", href: site.faviconHref, type: "image/png" },
    { rel: "apple-touch-icon", href: site.faviconHref },
    { rel: "shortcut icon", href: site.faviconHref },
  ];

  headAssets.forEach((asset) => {
    const existingLink = document.head.querySelector(
      `link[rel="${asset.rel}"]`,
    );
    const link = existingLink || document.createElement("link");

    link.rel = asset.rel;
    link.href = asset.href;

    if (asset.type) {
      link.type = asset.type;
    }

    if (!existingLink) {
      document.head.appendChild(link);
    }
  });
};

const footerTemplate = () => `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <img class="footer-logo" src="assets/images/logo-stacked.avif" alt="${site.name}" />
      </div>
      <div>
        <h2 class="footer-heading">Navigation</h2>
        ${footerLinkList(footerNavItems)}
      </div>
      <div>
        <h2 class="footer-heading">Services</h2>
        ${footerLinkList(footerServices)}
      </div>
      <div>
        <h2 class="footer-heading">Contact</h2>
        <p>${site.address}</p>
        <a href="${site.phoneHref}">${site.phone}</a>
        <a href="${site.socialHref}" target="_blank" rel="noopener">Facebook</a>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} ${site.name}. Website concept prepared by Alt. Web Solutions for client review.
    </div>
  </footer>`;

export const renderComponents = () => {
  applyHeadAssets();

  const headerSlot = document.querySelector('[data-component="site-header"]');
  const footerSlot = document.querySelector('[data-component="site-footer"]');

  if (headerSlot) headerSlot.outerHTML = headerTemplate();
  if (footerSlot) footerSlot.outerHTML = footerTemplate();
};
