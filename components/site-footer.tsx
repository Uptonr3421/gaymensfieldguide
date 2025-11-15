import Link from "next/link"

const footerLinks = [
  { href: "/posts", label: "Read the Field Notes" },
  { href: "/shop", label: "Visit the Shop" },
  { href: "/about", label: "About Upton Rand" },
  { href: "/rss.xml", label: "Subscribe via RSS" },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/70 bg-stone-100/60 py-12 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-300">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-start">
          <div className="space-y-3">
            <p className="font-display text-2xl font-semibold text-slate-900 dark:text-slate-50">Keep charting kinder territory.</p>
            <p>
              Gay Men’s Field Guide is a living notebook for queer men who are building friendships, kinship, and romance beyond
              the algorithms. New essays land whenever inspiration does.
            </p>
          </div>
          <nav className="space-y-2">
            {footerLinks.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="transition hover:text-slate-900 dark:hover:text-slate-50">
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200/70 pt-6 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800/80 dark:text-slate-400 md:flex-row">
          <span>&copy; {year} Upton Rand. All rights reserved.</span>
          <span>Crafted for Vercel deployments without databases.</span>
        </div>
      </div>
    </footer>
  )
}
