export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}
export const formattedDate = (date: any) =>
  new Date(date).toLocaleDateString("fr-CA") // YYYY-MM-DD

export const refresh = () => {
  window.location.reload()
}
