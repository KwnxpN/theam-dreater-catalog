import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Image */}
          <Skeleton className="h-96 w-full rounded-xl" />

          {/* Info */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>

        </div>

        {/* Reviews Skeleton */}
        <div className="mt-14 space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}