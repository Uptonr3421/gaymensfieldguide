export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ")
}

export function formatDate(date: string | Date) {
  const value = typeof date === "string" ? new Date(date) : date

  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(value)
}
