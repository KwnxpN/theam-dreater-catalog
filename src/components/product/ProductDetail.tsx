import type { Product } from "@/types/product.type";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";
import { useReviewStats } from "@/hooks/useReviewStats";
type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { average, counts } = useReviewStats(product.reviews ?? []);

  return (
    <div className="min-h-screen text-gray-900 dark:text-white py-10">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-xl">
          <ProductImages
            thumbnail={product.thumbnail}
            images={product.images}
          />
          <ProductInfo product={product} averageRating={average} />
        </div>
        <ReviewSection
          product={product}
          averageRating={average}
          counts={counts}
        />

      </div>
    </div>
  );
}