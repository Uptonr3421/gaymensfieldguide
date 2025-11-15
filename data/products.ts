export type Product = {
  id: string
  title: string
  description: string
  price: string
  image: string
  checkoutUrl: string
  tags: string[]
  printDetails: string
}

export const products: Product[] = [
  {
    id: "atlas-tee",
    title: "Field Guide Atlas Tee",
    description: "Super-soft midnight cotton with a chest print that reads ‘Strategies from the Margins’.",
    price: "$32",
    image: "/blog-post-1.jpg",
    checkoutUrl: "https://buy.stripe.com/test_7sI4jPcBTfZ87l68wx",
    tags: ["small batch", "unisex", "sizes XS-4X"],
    printDetails: "Printed locally in Cleveland with water-based ink. Ships in 5-7 days.",
  },
  {
    id: "night-hoodie",
    title: "Night Signal Hoodie",
    description: "Heavyweight fleece with glow-in-the-dark coordinates to Lake Erie and a hidden interior pocket.",
    price: "$68",
    image: "/blog-post-2.jpg",
    checkoutUrl: "https://buy.stripe.com/test_aEUg2l4cH3B6gEw6op",
    tags: ["pre-order", "sizes S-3X", "benefits mutual aid"],
    printDetails: "Each hoodie funds 1 hour of pro-bono coaching for queer founders.",
  },
  {
    id: "zine-pack",
    title: "Systems & Softness Zine Pack",
    description: "Three risograph zines on tech, sex, and rest plus a sticker sheet.",
    price: "$24",
    image: "/blog-post-3.jpg",
    checkoutUrl: "https://buy.stripe.com/test_4gw4jPcBTdOq27S3cd",
    tags: ["limited run", "risograph", "ships worldwide"],
    printDetails: "Edition of 250 printed by our friends at Dunlap Press.",
  },
]
