import { useState } from "react";

type Props = {
  thumbnail: string;
  images: string[];
};

export default function ProductImages({ thumbnail, images }: Props) {
  const allImages = [thumbnail, ...images];
  const [mainImage, setMainImage] = useState(allImages[0]);

  return (
    <div>
      <div className="bg-gray-50 dark:bg-[#140d08] rounded-xl p-3 h-100 flex items-center justify-center">
        <img src={mainImage} className="max-h-full object-contain" />
      </div>

      <div className="flex gap-3 mt-10">
        {allImages.map((img) => (
          <img
            key={img}
            src={img}
            onClick={() => setMainImage(img)}
            className={`w-16 h-16 object-cover rounded-lg border cursor-pointer
              ${mainImage === img ? "border-orange-500" : "border-gray-200"}
            `}
          />
        ))}
      </div>
    </div>
  );
}