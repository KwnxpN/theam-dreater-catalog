import type { Product } from "@/types/product.type";
import RatingBars from "./RatingBars";

export default function ReviewSection({ product }: { product: Product }) {
  return (
    <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row gap-20 md:gap-55">
        {/* Score */}
        <div className="min-w-37.5">
          <div className="text-5xl text-primary font-extrabold">
            {product.rating.toFixed(2)}
          </div>
          <div className="text-primary font-semibold text-lg mt-1">★★★★★</div>
          <div className="text-gray-400 text-sm mt-1">
            Based on {product.reviews.length} reviews
          </div>
        </div>

        {/* Bars */}
        <RatingBars product={product} />
      </div>
    </div>
  );
}