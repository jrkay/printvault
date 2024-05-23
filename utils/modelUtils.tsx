import { ModelProps } from "@/utils/appTypes"

export type SortOption = "nameA" | "nameZ" | "date"
export type FilterType = "Resin" | "Filament" | "Both" | string

export const filterModels = (
  modelData: ModelProps[],
  filterType: FilterType
): ModelProps[] => {
  switch (filterType) {
    case "Resin":
      return modelData.filter(
        (model) => model.type === "Resin" || model.type === "Both"
      )
    case "Filament":
      return modelData.filter(
        (model) => model.type === "Filament" || model.type === "Both"
      )
    case "Both":
      return modelData
    default:
      return modelData
  }
}

export const sortModels = (
  modelData: ModelProps[],
  sortOption: SortOption
): ModelProps[] => {
  const sortedData = [...modelData]

  switch (sortOption) {
    case "nameA":
      return sortedData.sort((a, b) => a.name.localeCompare(b.name))
    case "nameZ":
      return sortedData.sort((a, b) => b.name.localeCompare(a.name))
    case "date":
      return sortedData.sort((a, b) => b.created_at.localeCompare(a.created_at))
    default:
      return sortedData
  }
}

export const getFilteredAndSortedModels = (
  modelData: ModelProps[],
  filterType: FilterType,
  sortOption: SortOption
): ModelProps[] => {
  if (!modelData || !Array.isArray(modelData)) {
    return []
  }

  const filteredModels = filterModels(modelData, filterType)
  return sortModels(filteredModels, sortOption)
}
