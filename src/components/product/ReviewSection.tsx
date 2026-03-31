import type { Product } from "@/types/product.type";
import RatingBars from "./RatingBars";
import StarRating from "./StarRating";

type Props = {
  product: Product;
  averageRating: number;
  counts: number[];
};

export default function ReviewSection({
    product,
    averageRating,
    counts,
  }: Props) {
  const reviews = product.reviews ?? [];

  return (
    <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row gap-5 md:gap-55">
        {/* Score */}
        <div className="min-w-37.5">
          <div className="text-5xl text-primary font-extrabold">
            {averageRating.toFixed(2)}
          </div>

          <div className="md:mt-1">
            <StarRating rating={averageRating} />
          </div>

          <div className="text-gray-400 text-sm mt-1">
            Based on {reviews.length} reviews
          </div>
        </div>

        {/* Bars */}
        <RatingBars counts={counts} total={reviews.length} />
      </div>
    </div>
  );
}