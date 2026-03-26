import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductById } from "@/api/product.api";
import type { Product } from "@/types/product.type";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDetail product={product} />;
}