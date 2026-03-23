import { useEffect, useState } from "react"
import { getVisiblePages } from "@/lib/utils"

// Shadcn UI Imports
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

// Icon Imports
import { Search } from "lucide-react"

// Custom Hooks
import { useCategories } from "../hooks/queries/useCategories"
import { useProducts } from "../hooks/queries/useProducts"

// Component Imports
import CategoryChip from "../components/catalog/CategoryChip"
import CategoryChipSkeleton from "../components/skeletons/catalog/CategoryChipSkeleton"
import ProductCard from "@/components/catalog/ProductCard"
import ProductCardSkeleton from "@/components/skeletons/catalog/ProductCardSkeleton"

// Type Imports
import type { GetProductParams } from "@/types/product.type"

const LIMIT = 8

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [page, setPage] = useState(1)
  const [productParams, setProductParams] = useState<GetProductParams>({
    limit: LIMIT,
  })

  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError, refetch: refetchCategories } = useCategories()
  const { data: products, isLoading: isProductsLoading, isError: isProductsError, refetch: refetchProducts } = useProducts(productParams, selectedCategory)

  const totalProducts = products?.total || 0
  const totalPages = Math.max(1, Math.ceil(totalProducts / (productParams.limit || LIMIT)))
  const visiblePages = getVisiblePages(page, totalPages)

  // Debounce search input to avoid excessive API calls while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      setProductParams((prev) => ({ ...prev, search: searchQuery || undefined, skip: 0 }))
    }, 500)

    // Cleanup function to clear the previous timer on each new input
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Reset to first page and update product parameters when the selected category changes
  useEffect(() => {
    setPage(1)
    setProductParams((prev) => ({ ...prev, skip: 0 }))
  }, [selectedCategory])

  // Update product parameters when the page changes to fetch the correct set of products for the new page
  useEffect(() => {
    setProductParams((prev) => ({ ...prev, limit: LIMIT, skip: (page - 1) * LIMIT }))
  }, [page])

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return
    setPage(nextPage)
  }

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
          <InputGroup className="md:max-w-md h-10 border-2 border-border">
            <InputGroupInput
              disabled={isProductsLoading || isProductsError || selectedCategory !== "all"}
              placeholder="Search Products..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            <div className="flex min-h-16 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                We could not load categories right now. Please try again in a moment.
              </p>
              <Button className="ml-2" onClick={() => refetchCategories()}>
                Retry
              </Button>
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
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: LIMIT }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )
          : isProductsError ? (
            <div className="mt-6 flex flex-col gap-4 h-120 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-5 text-center">
              <p className="text-sm text-muted-foreground">
                We could not load products right now. Please try again in a moment.
              </p>
              <Button className="px-4" onClick={() => refetchProducts()}>
                Retry
              </Button>
            </div>
          )
            : products?.products.length === 0 ? (
              <div className="mt-6 flex flex-col gap-4 h-120 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-5 text-center">
                <p className="text-sm text-muted-foreground">
                  No products found for the selected category or search query. Please try adjusting your filters or search terms.
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
        {/* Pagination */}
        {!isProductsLoading && !isProductsError && totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(event) => {
                    event.preventDefault()
                    handlePageChange(page - 1)
                  }}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {visiblePages.map((pageItem, index) => (
                <PaginationItem key={`${pageItem}-${index}`}>
                  {pageItem === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink

                      isActive={pageItem === page}
                      onClick={(event) => {
                        event.preventDefault()
                        handlePageChange(pageItem)
                      }}
                    >
                      {pageItem}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={(event) => {
                    event.preventDefault()
                    handlePageChange(page + 1)
                  }}
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </>
  )
}

export default Catalog