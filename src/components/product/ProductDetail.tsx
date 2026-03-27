import type { Product } from "@/types/product.type";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";
import { useReviewStats } from "@/hooks/useReviewStats";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const { average, counts } = useReviewStats(product.reviews ?? []);

  return (
    <div className="min-h-screen text-gray-900 dark:text-white py-10">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <NavLink to="/catalog">
          <button
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6"
          >
            <ChevronLeft className="size-4" />
            Back to Catalog
          </button>
        </NavLink>
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