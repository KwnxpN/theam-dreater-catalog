import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_COUNT = 3

const ProductCarouselSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-10 px-8 lg:px-22 mt-32 mb-22">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-64 md:w-80" />
          <Skeleton className="h-5 w-48 md:w-72" />
        </div>
        {/* Nav buttons placeholders (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      </div>

      {/* Carousel items */}
      <div className="w-full mt-4">
        <div className="flex gap-4 md:gap-8 overflow-hidden">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 basis-[75%] sm:basis-1/2 lg:basis-1/3"
            >
              <Skeleton className="w-full aspect-square sm:aspect-4/3 rounded-3xl" />
            </div>
          ))}
        </div>

        {/* Mobile nav buttons */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-12 mb-8 h-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <Skeleton key={i} className="w-2.5 h-2.5 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCarouselSkeleton
