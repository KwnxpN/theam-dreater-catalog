import type { Product } from "@/types/product.type";

export default function ProductInfo({ product }: { product: Product }) {

    const discountedPrice =
        product.price - (product.price * product.discountPercentage) / 100;

    return (
        <div>
            {/* Stock + Brand */}
            <div className="text-primary text-xs font-bold uppercase">
                {product.availabilityStatus}
                <span className="text-gray-400 ml-2">{product.brand}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mt-2">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
                <span className="text-primary">★★★★★</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {product.rating} ({product.reviews.length} reviews)
                </span>
            </div>

            {/* Price */}
            <div className="mt-4">
                <span className="text-3xl font-bold">
                    ${discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-400 ml-3">
                    ${product.price}
                </span>
                <div className="text-primary text-sm mt-1">
                    Save {product.discountPercentage}% Today
                </div>
            </div>

            {/* Description */}
            <div className="mt-6">
                <p className="text-gray-400 text-sm font-semibold">DESCRIPTION</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {product.description}
                </p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-6 mt-6 text-sm border-t pt-6 border-gray-200 dark:border-gray-700">
                <div>
                    <p className="text-gray-400">Category</p>
                    <p className="font-semibold">{product.category}</p>
                </div>
                <div>
                    <p className="text-gray-400">Stock Status</p>
                    <p className="font-semibold text-primary">{product.stock} Items Left</p>
                </div>
                <div>
                    <p className="text-gray-400">Discount Percentage</p>
                    <p className="font-semibold">
                        {product.discountPercentage}%
                    </p>
                </div>
                <div>
                    <p className="text-gray-400">Shipping</p>
                    <p className="font-semibold">
                        {product.shippingInformation}
                    </p>
                </div>
            </div>
        </div>
    );
}