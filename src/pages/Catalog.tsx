import { useState } from "react"
// Shadcn UI Imports
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
// Icon Imports
import { Search } from "lucide-react"
// Custom Hooks
import { useCategories } from "../hooks/queries/useCategories"
import { useProducts } from "../hooks/queries/useProducts"
// Component Imports
import CategoryChip from "../components/catalog/CategoryChip"
import CategoryChipSkeleton from "../components/skeletons/catalog/CategoryChipSkeleton"
import ProductCard from "@/components/catalog/ProductCard"

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories()
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useProducts(undefined, selectedCategory)

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
        {isCategoriesLoading ? (
          <div className="no-scrollbar flex gap-3 overflow-x-auto whitespace-nowrap p-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <CategoryChipSkeleton key={index} />
            ))}
          </div>
        )
          : isCategoriesError ? (
            <div className="flex min-h-16 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                We could not load categories right now. Please try again in a moment.
              </p>
            </div>
          )
            : (
              <div className="no-scrollbar flex gap-3 overflow-x-auto whitespace-nowrap p-2">
                <CategoryChip
                  name="All Products"
                  isSelected={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                  aria-pressed={selectedCategory === "all"}
                />
                {categories?.map((category) => (
                  <CategoryChip
                    key={category.slug}
                    name={category.name}
                    isSelected={selectedCategory === category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    aria-pressed={selectedCategory === category.slug}
                  />
                ))}
              </div>
            )}
      </header>

      {/* Product Grid */}
      <section>
        {isProductsLoading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        )
          : isProductsError ? (
            <div className="flex min-h-16 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                We could not load products right now. Please try again in a moment.
              </p>
            </div>
          )
            : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products?.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
      </section>
    </>
  )
}

export default Catalog