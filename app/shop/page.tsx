import type { Metadata } from "next"
import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

export const metadata: Metadata = {
  title: "Shop Developer Merch - Vibecoding Apparel & Accessories",
  description: "Shop unique developer merchandise, coding apparel, and creative tech accessories. Support the vibecoding community with premium quality merch.",
  keywords: ["developer merch", "coding apparel", "tech merchandise", "programmer clothing", "developer shop", "coding accessories", "vibecoding merch"],
  openGraph: {
    title: "Shop Developer Merch - Gay Men's Field Guide",
    description: "Shop unique developer merchandise, coding apparel, and creative tech accessories.",
    type: "website",
  },
}

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Merch Table
        </p>
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-slate-50">
          Shop Gay Men&apos;s Field Guide
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Unique developer merchandise and vibecoding apparel. Each item links to a secure Stripe-hosted checkout. 
          Support the community while looking great in premium quality merch designed for creative developers.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
