import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/api/product.api";
import ProductDetailSkeleton from "@/components/skeletons/product/ProductDetailSkeleton";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <ProductDetailSkeleton/>;
  if (isError || !product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}