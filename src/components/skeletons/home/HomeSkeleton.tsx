import HeroSkeleton from "./HeroSkeleton"
import ProductCarouselSkeleton from "./ProductCarouselSkeleton"

const HomeSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-22">
      <HeroSkeleton />
      <ProductCarouselSkeleton />
    </div>
  )
}

export default HomeSkeleton
