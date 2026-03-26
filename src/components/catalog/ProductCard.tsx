import type { Product } from "@/types/product.type"
import { Star } from "lucide-react"

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
      <div className="relative h-48 bg-[#f3f3f3]">
        <img
          className="h-full w-full object-contain p-4"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold leading-tight">{product.title}</h2>
          <p className="shrink-0 text-lg font-bold text-primary">${Math.round(product.price)}</p>
        </div>

        <p className="min-h-14 text-sm leading-7 text-[#64748b]">
          {product.description.length > 68 ? `${product.description.slice(0, 68)}...` : product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Star className="size-5 fill-[#f2be1a] text-[#f2be1a]" />
            <span>{product.rating.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard