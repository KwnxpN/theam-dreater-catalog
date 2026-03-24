import type { Product } from "@/types/product.type";

export default function RatingBars({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = product.reviews.filter(
          (r) => Math.round(r.rating) === star
        ).length;

        const percent =
          product.reviews.length > 0
            ? (count / product.reviews.length) * 100
            : 0;

        return (
          <div key={star} className="flex items-center gap-3">
            <span className="w-4">{star}</span>
            <div className="w-full h-2 bg-gray-200 dark:bg-[#2a1a12] rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-gray-400 text-sm">
              {Math.round(percent)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}