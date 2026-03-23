import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <div className="w-full rounded-lg border bg-card p-4">
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-5/6 rounded-md" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton