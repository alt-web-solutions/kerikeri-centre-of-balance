export const site = {
  name: "Kerikeri Centre of Balance",
  tagline: "All healing begins with the wisdom that you play the leading role.",
  phone: "021 229 7489",
  phoneHref: "tel:0212297489",
  address: "Inside Hardy's Health Store, 69 Kerikeri Road, Kerikeri",
  bookingHref: "contact.html",
  socialHref: "https://www.facebook.com/kerikericentreofbalance",
  faviconHref: "assets/images/favicon.png",
};

export const navItems = [
  { label: "Home", href: "index.html" },
  {
    label: "Services",
    href: "services.html",
    children: [
      { label: "Acupuncture", href: "acupuncture.html" },
      {
        label: "Traditional Chinese Herbal Medicine",
        href: "herbal-medicine.html",
      },
      { label: "Massage Therapy — Tui Na", href: "massage-tui-na.html" },
      { label: "Tapping Techniques", href: "tapping.html" },
      { label: "Yang Family Tai Chi", href: "tai-chi.html" },
    ],
  },
  { label: "About", href: "about.html" },
  { label: "Before You Visit", href: "what-else-do-you-need-to-know.html" },
  { label: "Contact", href: "contact.html" },
];

export const footerServices = [
  { label: "Acupuncture", href: "acupuncture.html" },
  { label: "Chinese Herbal Medicine", href: "herbal-medicine.html" },
  { label: "Tui Na Massage Therapy", href: "massage-tui-na.html" },
  { label: "Tapping Techniques", href: "tapping.html" },
  { label: "Yang Family Tai Chi", href: "tai-chi.html" },
];
