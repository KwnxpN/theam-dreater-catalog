import { useParams } from "react-router-dom";
import { mockProducts } from "@/mock/products";
import ProductDetail from "@/components/product/ProductDetail";

export default function ProductDetailPage() {
  const { id } = useParams();

  const product = mockProducts.find(
    (p) => p.id === Number(id)
  );

  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}