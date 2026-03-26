import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to determine visible page numbers for pagination
export const getVisiblePages = (currentPage: number, totalPages: number): Array<number | "ellipsis"> => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  // Use a Set to ensure unique page numbers and include the first, last, current, and adjacent pages
  // * e.g., for currentPage = 5 and totalPages = 10, this will include 1, 4, 5, 6, and 10
  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1])

  // Filter out invalid page numbers and sort them in ascending order
  // * e.g., if currentPage = 1, it will include 1, 2, and totalPages, but not 0 or negative numbers
  const filteredPages = [...pages]
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((a, b) => a - b)

  const visiblePages: Array<number | "ellipsis"> = []

  // Iterate through the filtered page numbers and insert "ellipsis" where there are gaps
  // * e.g., for filteredPages = [1, 4, 5, 6, 10], this will produce [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
  filteredPages.forEach((pageNumber, index) => {
    const previousPage = filteredPages[index - 1]
    if (previousPage && pageNumber - previousPage > 1) {
      visiblePages.push("ellipsis")
    }
    visiblePages.push(pageNumber)
  })

  return visiblePages
}