export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}