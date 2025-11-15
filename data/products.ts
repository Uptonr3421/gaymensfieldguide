export interface Product {
  slug: string
  title: string
  price: string
  description: string
  image: string
  checkoutUrl: string
}

export const products: Product[] = [
  {
    slug: "field-guide-tee",
    title: "Field Guide Tee",
    price: "$32",
    description: "Soft-washed cotton with a hand-drawn compass rose for the romantics who wander.",
    image: "/images/products/field-guide-tee.svg",
    checkoutUrl: "https://buy.stripe.com/test_6oE6oobvQ9T74Iw9AA",
  },
  {
    slug: "campfire-crewneck",
    title: "Campfire Crewneck",
    price: "$58",
    description: "A midweight fleece for chilly porches, featuring the Gay Men's Field Guide monogram.",
    image: "/images/products/campfire-crewneck.svg",
    checkoutUrl: "https://buy.stripe.com/test_6oEdQcdvu6Df5qEcMM",
  },
  {
    slug: "trailmate-tote",
    title: "Trailmate Tote",
    price: "$28",
    description: "Recycled canvas with an interior pocket—room for snacks, zines, and spontaneous adventures.",
    image: "/images/products/trailmate-tote.svg",
    checkoutUrl: "https://buy.stripe.com/test_9AQcOIdvu9T71WM6oo",
  },
]
