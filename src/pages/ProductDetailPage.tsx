import { useParams } from "react-router-dom";
import ProductDetail from "@/components/product/ProductDetail";
import ProductDetailSkeleton from "@/components/skeletons/product/ProductDetailSkeleton";
import { useProductById } from "@/hooks/queries/useProducts";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useProductById(Number(id));

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}