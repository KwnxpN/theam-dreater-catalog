import { Skeleton } from "@/components/ui/skeleton"

const HeroSkeleton = () => {
  return (
    <div className="flex px-4 sm:px-8 lg:px-12">
      <div className="flex flex-col lg:flex-row mx-auto gap-8 lg:gap-0 lg:space-x-22 bg-secondary p-6 sm:p-8 rounded-3xl w-full">
        {/* Image placeholder */}
        <div className="flex justify-center lg:justify-start">
          <Skeleton className="w-full max-w-sm lg:max-w-xs h-64 sm:h-80 lg:h-96 rounded-2xl" />
        </div>
        {/* Text content placeholder */}
        <div className="flex flex-col gap-y-5 justify-center items-center lg:items-start">
          <Skeleton className="h-4 w-36" />
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <Skeleton className="h-12 w-64 sm:w-80" />
            <Skeleton className="h-12 w-48 sm:w-64" />
            <Skeleton className="h-12 w-56 sm:w-72" />
            <Skeleton className="h-12 w-40 sm:w-56" />
          </div>
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <Skeleton className="h-4 w-72 sm:w-96" />
            <Skeleton className="h-4 w-64 sm:w-80" />
            <Skeleton className="h-4 w-52 sm:w-72" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Skeleton className="h-12 w-40 rounded-2xl" />
            <Skeleton className="h-12 w-36 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSkeleton
