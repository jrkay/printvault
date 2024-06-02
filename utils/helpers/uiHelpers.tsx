export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}
export const formattedDate = (date: any) =>
  new Date(date).toLocaleDateString("fr-CA") // YYYY-MM-DD

export const formatDateForModel = (dateString: string) => {
  const date = new Date(dateString)
  // Use UTC methods to get month, day, and year
  const month = date.getUTCMonth() + 1 // UTC month is zero-indexed
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  return `${month}/${day}/${year}`
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

export const logoSmall =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo-p-small.png?t=2024-03-28T03%3A26%3A43.462Z"

export const logoTiny =
  "https://hxmfcfbziscxdbybkxbg.supabase.co/storage/v1/object/public/images/logo-p-Photoroom.png-Photoroom.png?t=2024-03-28T03%3A29%3A03.540Z"

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) {
    return "0 Bytes"
  }
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function generateFileName(name: string, extension: string): string {
  // Convert the name to lowercase and replace spaces with underscores
  const formattedName = name.toLocaleLowerCase().replace(/ /g, "_")

  // Generate a timestamp in the format YYYYMMDD_HHMMSS
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")
  const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`

  const fileName = `${formattedName}_${timestamp}.${extension}`

  return fileName
}

export function displayFileName(fileName: string): string {
  // Remove the extension
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."))

  // Find the position of the second to last underscore
  const underscorePosition = nameWithoutExtension.lastIndexOf(
    "_",
    nameWithoutExtension.lastIndexOf("_") - 1
  )

  return nameWithoutExtension.substring(0, underscorePosition)
}

export function getFileExtension(fileName: string): string {
  // Find the last period in the file name and return the substring after it
  const lastDotIndex = fileName.lastIndexOf(".")
  if (lastDotIndex === -1) {
    return ""
  }
  return fileName.substring(lastDotIndex + 1)
}
