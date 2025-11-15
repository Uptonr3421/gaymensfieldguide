import Image from "next/image"
import Link from "next/link"

import type { Product } from "@/data/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/60">
      <div className="relative aspect-square w-full bg-stone-100 dark:bg-slate-800">
        <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-50">{product.title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between text-sm font-medium text-slate-900 dark:text-slate-100">
          <span>{product.price}</span>
          <Link
            href={product.checkoutUrl}
            className="inline-flex items-center rounded-full border border-slate-900 px-4 py-1 text-xs uppercase tracking-wide transition hover:bg-slate-900 hover:text-white dark:border-slate-100 dark:hover:bg-slate-100 dark:hover:text-slate-900"
          >
            Buy now
          </Link>
        </div>
      </div>
    </article>
  )
}
