import Link from "next/link"

import { ModeToggle } from "@/components/mode-toggle"

const navigation = [
  { href: "/posts", label: "Field Notes" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-stone-50/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Gay Men’s Field Guide
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200 sm:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-slate-900 hover:underline dark:hover:text-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
        <nav className="flex items-center justify-between border-t border-slate-200/70 py-3 text-xs font-medium uppercase tracking-wide text-slate-600 dark:border-slate-800/80 dark:text-slate-300 sm:hidden">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-slate-900 dark:hover:text-slate-50">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
