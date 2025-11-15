import Image from "next/image"
import { products } from "@/data/products"

export const metadata = {
  title: "Shop",
  description: "Small-batch merch that keeps the lights on."
}

export default function ShopPage() {
  return (
    <section className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Shop</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Field Guide Merch</h1>
        <p className="mt-2 text-sm text-slate-300">
          Static catalog, transparent pricing, and hosted Stripe Checkout links so we never touch your card data.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {products.map((product) => (
          <article key={product.id} className="flex flex-col rounded-3xl border border-white/10 bg-slate-900/50">
            <div className="relative h-64 w-full overflow-hidden rounded-t-3xl">
              <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="font-semibold uppercase tracking-wide text-fuchsia-200">{product.price}</span>
                <span>{product.printDetails}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{product.title}</h2>
                <p className="mt-2 text-sm text-slate-300">{product.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-[0.7rem] text-slate-300">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              >
                Purchase via Stripe Checkout ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="rounded-3xl border border-dashed border-white/20 p-6 text-sm text-slate-300">
        <p>
          Inventory lives in third-party fulfillment tools. Update requests? Email <a className="underline" href="mailto:hello@gaymensfieldguide.com">hello@gaymensfieldguide.com</a>.
        </p>
      </div>
    </section>
  )
}
