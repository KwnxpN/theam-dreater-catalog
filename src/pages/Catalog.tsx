import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useCategories } from "../hooks/queries/useCategories"

const Catalog = () => {
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories()

  return (
    <>
      <header className="flex flex-col gap-4">
        {/* Header Content */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          {/* Title */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold">Product Catalog</h1>
            <span className="text-neutral-400">Explore Our Product Collection</span>
          </div>

          {/* Search Product Bar */}
          <InputGroup className="max-w-md h-10 border-2 border-border">
            <InputGroupInput placeholder="Search Products..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Category Filters */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {isCategoriesLoading && <p>Loading categories...</p>}
          {isCategoriesError && <p>Failed to load categories</p>}
          {categories?.map((category) => (
            <button
              key={category.slug}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>
    </>
  )
}

export default Catalog