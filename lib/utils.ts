const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  "Sex Talk": { label: "Sex Talk", className: "bg-rose-500/20 text-rose-200" },
  Business: { label: "Business", className: "bg-amber-500/20 text-amber-200" },
  Health: { label: "Health", className: "bg-emerald-500/20 text-emerald-200" },
  Spirituality: { label: "Spirituality", className: "bg-indigo-500/20 text-indigo-200" },
  Retazos: { label: "Retazos", className: "bg-sky-500/20 text-sky-100" },
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatLanguage(language: string) {
  if (language === "es") return "ES"
  if (language === "fr") return "FR"
  return "EN"
}

export function getCategoryClassName(category: string) {
  return CATEGORY_STYLES[category]?.className ?? "bg-slate-500/20 text-slate-100"
}

export function getCategoryLabel(category: string) {
  return CATEGORY_STYLES[category]?.label ?? category
}

export function readingTimeLabel(minutes?: number) {
  if (!minutes || Number.isNaN(minutes)) {
    return "Quick read"
  }

  if (minutes <= 1) {
    return "1 min read"
  }

  return `${minutes} min read`
}
