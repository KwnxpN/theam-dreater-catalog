import { useState } from "react";
import type { Product } from "@/types/product.type";

export default function ProductImages({ product }: { product: Product }) {
    const [mainImage, setMainImage] = useState(
        product.thumbnail || product.images[0]
    );

    const images = [product.thumbnail, ...product.images];

    return (
        <div>
            <div className="bg-gray-50 dark:bg-[#140d08] rounded-xl p-3 h-100 flex items-center justify-center">
                <img
                    src={mainImage}
                    className="max-h-full object-contain"
                />
            </div>

            <div className="flex gap-3 mt-4">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setMainImage(img)}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-[#2a1a12] cursor-pointer hover:border-orange-500"
                    />
                ))}
            </div>
        </div>
    );
}