import type { Metadata } from "next"

import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"

export const metadata: Metadata = {
  title: "Shop",
  description: "A lightweight merch table with hosted checkout links—no database required.",
}

export default function ShopPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Merch Table</p>
        <h1 className="font-display text-4xl font-semibold text-slate-900 dark:text-slate-50">Shop Gay Men’s Field Guide</h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
          Each item links out to a secure third-party checkout—Stripe-hosted payment pages today, with room for other partners
          later. Update <code className="rounded bg-slate-200/70 px-1 py-0.5 text-xs dark:bg-slate-800/60">data/products.ts</code>
          to refresh inventory.
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
