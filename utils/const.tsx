export const licenseOptions = [
  {
    key: "1",
    text: "Creative Commons - Public Domain",
    value: "Creative Commons - Public Domain",
  },
  {
    key: "2",
    text: "Creative Commons - Attribution",
    value: "Creative Commons - Attribution",
  },
  {
    key: "3",
    text: "Creative Commons - Attribution-ShareAlike",
    value: "Creative Commons - Attribution-ShareAlike",
  },
  {
    key: "4",
    text: "Creative Commons - Attribution-NoDerivatives",
    value: "Creative Commons - Attribution-NoDerivatives",
  },
  {
    key: "5",
    text: "Creative Commons - Attribution-NonCommercial",
    value: "Creative Commons - Attribution-NonCommercial",
  },
  {
    key: "6",
    text: "Creative Commons - Attribution-NonCommercial-NoDerivatives",
    value: "Creative Commons - Attribution-NonCommercial-NoDerivatives",
  },
  {
    key: "7",
    text: "Creative Commons - Attribution-NonCommercial-ShareAlike",
    value: "Creative Commons - Attribution-NonCommercial-ShareAlike",
  },
]

export const typeOptions = [
  { key: "1", text: "Filament & Resin", value: "Both" },
  { key: "2", text: "Filament", value: "Filament" },
  { key: "3", text: "Resin", value: "Resin" },
]

export const statusOptions = [
  { key: "1", text: "Not Started", value: "Not Started" },
  { key: "2", text: "In Progress", value: "In Progress" },
  { key: "3", text: "Paused", value: "Paused" },
  { key: "4", text: "Complete", value: "Complete" },
]

export const sortOptions = [
  { key: "1", text: "Sort by Name A-Z", value: "nameA" },
  { key: "2", text: "Sort by Name Z-A", value: "nameZ" },
  { key: "3", text: "Newest Created", value: "date" },
]

export const jobStatusOptions = [
  { key: "1", text: "Complete", value: "Complete" },
  { key: "2", text: "Incomplete", value: "Incomplete" },
]

export const materialOptions = [
  { key: "2", text: "Filament", value: "Filament" },
  { key: "3", text: "Resin", value: "Resin" },
]

export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}
