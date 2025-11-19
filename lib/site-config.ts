export const siteConfig = {
  name: "Gay Men's Field Guide",
  description:
    "Vibecoding meets culture: Creative coding tutorials, tech insights, and developer lifestyle. Shop unique dev merch and join the Cleveland coding community.",
  tagline: "Where code meets culture—vibecoding tutorials, tech wellness, and creative developer resources.",
  hero: {
    kicker: "Vibecoding for the Modern Developer",
    headline: "Code with style, build with purpose, vibe with community",
    subheading:
      "Explore creative coding tutorials, tech culture insights, and developer lifestyle content from Cleveland's vibecoding community—now live on the open web.",
    cta: {
      label: "Explore the latest posts",
      href: "#latest",
    },
  },
  contactEmail: "hello@gaymensfieldguide.com",
  nav: [
    { label: "Articles", href: "/posts" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/gaymensfieldguide" },
    { label: "YouTube", href: "https://www.youtube.com/@GayMensFieldGuide" },
  ],
  location: "Cleveland, Ohio",
}

export type SiteConfig = typeof siteConfig
