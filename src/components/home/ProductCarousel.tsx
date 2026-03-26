import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { animate } from "animejs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import type { Product } from "@/types/product.type"

type ProductCarouselProps = {
  products: Product[]
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current && !hasAnimated.current) {
            hasAnimated.current = true
            animate(sectionRef.current, {
              y: [100, 0],
              opacity: [0, 1],
              ease: 'out(3)',
              duration: 1200,
              delay: 100,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="w-full flex flex-col gap-10 px-8 lg:px-22 mt-32 mb-22 opacity-0">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-primary text-3xl md:text-[2.5rem] font-bold tracking-tight">Featured Collections</h2>
          <p className="text-base md:text-xl max-w-2xl">
            Curated essentials that bring nature indoors
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => api?.scrollPrev()}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 outline-none focus:outline-none custom-no-tap"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 outline-none focus:outline-none custom-no-tap"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel section */}
      <div className="w-full relative mt-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {products.map((product, i) => (
              <CarouselItem key={i} className="pl-4 md:pl-8 basis-[75%] sm:basis-1/2 lg:basis-1/3">
                <div className="group relative w-full aspect-square sm:aspect-4/3 overflow-hidden rounded-3xl bg-gray-100 cursor-pointer">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-end">
                    <span className="text-primary text-xs md:text-sm font-medium uppercase tracking-wider mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-white text-base md:text-lg font-bold line-clamp-2">
                      {product.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={() => api?.scrollPrev()}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 outline-none focus:outline-none custom-no-tap"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-slate-800 outline-none focus:outline-none custom-no-tap"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </Carousel>

        {/* Dot indicators at the bottom */}
        <div className="flex justify-center items-center gap-2 mt-12 mb-8 h-4">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className="w-4 h-4 flex items-center justify-center outline-none custom-no-tap group"
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === current ? (
                <div className="w-4 h-4 rounded-full border-2 border-orange-200 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#E56E25] rounded-full" />
                </div>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCarousel