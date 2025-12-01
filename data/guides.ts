export interface Guide {
  slug: string
  title: string
  category: string
  description: string
  image: string
  action: string
}

export const guides: Guide[] = [
  {
    slug: "city-guides/cleveland-night-outs",
    title: "Cleveland After Dark",
    category: "City Guides",
    description: "Cocktail dens, lakeside walks, and queer-owned staples that feel like home base.",
    image: "/images/guides/cleveland.svg",
    action: "Plan the route",
  },
  {
    slug: "camping/lake-erie-camps",
    title: "Lake Erie Camps",
    category: "Camping",
    description: "Tent-friendly shoreline escapes with sunrise swims and nearby coffee runs.",
    image: "/images/guides/lake-erie.svg",
    action: "See campsite list",
  },
  {
    slug: "resources/queer-wellness",
    title: "Queer Wellness Kit",
    category: "Resources",
    description: "Therapists, support orgs, and crisis lines curated for queer men who explore.",
    image: "/images/guides/wellness.svg",
    action: "Open the kit",
  },
]
