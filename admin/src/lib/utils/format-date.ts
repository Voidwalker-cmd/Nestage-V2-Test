export const formatDate = (date: Date): string => {
  return date
    .toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/(\d+)(?=(st|nd|rd|th))/, "$1th")
}

