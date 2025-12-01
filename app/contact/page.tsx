import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Gay Men's Field Guide for collaborations, story pitches, and community contributions.",
  openGraph: {
    title: "Contact | Gay Men's Field Guide",
    description: "Reach Gay Men's Field Guide for collaborations, story pitches, and community contributions.",
  },
}

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <header className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1B4332]/70 via-[#2C2C2C] to-black p-8 text-white shadow-2xl">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Contact</p>
            <h1 className="text-4xl font-semibold leading-tight">Let&apos;s collaborate</h1>
            <p className="text-base text-white/80">
              Send story pitches, product ideas, or guide recommendations. We respond within two business days and center consent, accessibility, and community care in every reply.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span className="rounded-full border border-white/20 px-3 py-1">Editorial</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Shop</span>
              <span className="rounded-full border border-white/20 px-3 py-1">Guides</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Response promise</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4A574]" aria-hidden />
                Clear timelines and next steps in every message.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#E07A5F]" aria-hidden />
                Inclusive language and accessibility-first requests.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" aria-hidden />
                Confidentiality respected—no sharing without consent.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Send a note</h2>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Required fields are marked with an asterisk. We&apos;ll reply from hello@gaymensfieldguide.com.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#D4A574] focus:outline-none focus:ring-2 focus:ring-[#D4A574]/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#D4A574] focus:outline-none focus:ring-2 focus:ring-[#D4A574]/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="topic">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-[#D4A574] focus:outline-none focus:ring-2 focus:ring-[#D4A574]/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Story pitch</option>
              <option>Product collaboration</option>
              <option>Guide recommendation</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-100" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#D4A574] focus:outline-none focus:ring-2 focus:ring-[#D4A574]/40 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Share details, timelines, or links."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#1B4332] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A574]"
          >
            Send message
          </button>
          <p className="text-xs text-slate-600 dark:text-slate-300">We keep submissions private and respond within two business days.</p>
        </form>

        <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Other ways to reach us</h2>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <div>
              <p className="font-semibold">Email</p>
              <Link
                href="mailto:hello@gaymensfieldguide.com"
                className="inline-flex items-center gap-2 text-[#1B4332] underline-offset-4 transition hover:text-[#D4A574] dark:text-[#D4A574]"
              >
                hello@gaymensfieldguide.com
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div>
              <p className="font-semibold">Social</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://www.instagram.com/gaymensfieldguide"
                  className="inline-flex items-center gap-2 text-[#1B4332] underline-offset-4 transition hover:text-[#D4A574] dark:text-[#D4A574]"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.youtube.com/@GayMensFieldGuide"
                  className="inline-flex items-center gap-2 text-[#1B4332] underline-offset-4 transition hover:text-[#D4A574] dark:text-[#D4A574]"
                >
                  YouTube
                </Link>
              </div>
            </div>
            <div>
              <p className="font-semibold">Hours</p>
              <p className="text-sm text-slate-700 dark:text-slate-200">Monday–Friday, 9am–5pm EST. Expect a response within two business days.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 p-4 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Need an urgent resource?</h3>
            <p className="mt-2">If you need immediate support, please reach out to local emergency services or the Trevor Project at 1-866-488-7386.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
