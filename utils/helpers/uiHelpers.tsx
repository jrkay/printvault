export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}
export const formattedDate = (date: any) =>
  new Date(date).toLocaleDateString("fr-CA") // YYYY-MM-DD

export const formatDateForModel = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const formatDateMonth = (dateString: string) => {
  const date = new Date(dateString)

  // Get month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sepr",
    "Oct",
    "Nov",
    "Dec",
  ]
  const monthName = monthNames[date.getMonth()]
  // Get day of the month
  const day = date.getDate()
  // Get full year
  const year = date.getFullYear()

  return `${monthName} ${day}, ${year}`
}

export const refresh = () => {
  window.location.reload()
}
