import type { Product } from "@/types/product.type";

export default function RatingBars({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = product.reviews.filter(
          (r) => Math.round(r.rating) === star
        ).length;

        const percent =
          product.reviews.length > 0
            ? (count / product.reviews.length) * 100
            : 0;

        return (
          <div key={star} className="flex items-center gap-4 w-full">
            {/* Star */}
            <div className="w-6 text-sm">{star}</div>

            {/* Bar */}
            <div className="flex-1 h-3 bg-primary/10 dark:bg rounded-full overflow-hidden">
              <div
                className="h-3 bg-primary rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Percent */}
            <div className="w-12 text-sm text-gray-400 text-right">
              {Math.round(percent)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}