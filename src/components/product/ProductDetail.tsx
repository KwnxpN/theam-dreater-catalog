import type { Product } from "@/types/product.type";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-10  p-6 rounded-xl">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>

        <ReviewSection product={product} />
      </div>
    </div>
  );
}