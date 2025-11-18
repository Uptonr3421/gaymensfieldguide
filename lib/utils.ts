export function formatDate(date: string, locale = "en-US") {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.valueOf())) {
    return date
  }

  return parsedDate.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
