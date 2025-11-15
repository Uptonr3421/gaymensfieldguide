export const siteConfig = {
  name: "Gay Men's Field Guide",
  url: "https://gaymensfieldguide.com",
  description:
    "A multilingual blog and pop-up shop by Upton Rand covering tech, sex, culture, and the systems that keep queer people thriving.",
  tagline: "Field notes on tech, culture, money, and care from Cleveland to the cosmos.",
  location: "Cleveland, Ohio",
  email: "hello@gaymensfieldguide.com",
  social: {
    instagram: "https://instagram.com/gaymensfieldguide",
    newsletter: "https://gaymensfieldguide.com/newsletter",
  },
  nav: [
    { label: "Latest", href: "/" },
    { label: "All Posts", href: "/posts" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
  ],
}

export type SiteConfig = typeof siteConfig
