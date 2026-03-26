import Hero from '../components/home/Hero'
import ProductCarousel from '../components/home/ProductCarousel'
import WhyTerraModern from '../components/home/FAQ'
import { useProducts } from '@/hooks/queries/useProducts'
import { useMemo } from 'react'
import type { GetProductParams } from '@/types/product.type'
import ProductCarouselSkeleton from '@/components/skeletons/home/ProductCarouselSkeleton'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Home = () => {
  const productParams = useMemo<GetProductParams>(() => ({
    page: 1,
    limit: 8,
    sort: 'random',
  }), [])

  const { data: products, isLoading: isProductsLoading, isError: isProductsError, refetch: refetchProducts } = useProducts(productParams)

  const renderProductSection = () => {
    if (isProductsLoading) {
      return <ProductCarouselSkeleton />
    }

    if (isProductsError) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-6 px-8 lg:px-22 mt-32 mb-22 py-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-gray-800">Failed to load products</h2>
              <p className="text-gray-500 text-sm max-w-sm">
                Something went wrong while fetching the featured collection. Please try again.
              </p>
            </div>
          </div>
          <Button
            onClick={() => refetchProducts()}
            variant="outline"
            className="flex items-center gap-2 rounded-2xl px-6 py-3"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return <ProductCarousel products={products?.products || []} />
  }

  return (
    <>
      <div className="flex flex-col gap-y-16">
        <Hero />
        {renderProductSection()}
        <WhyTerraModern />
      </div>
    </>
  )
}

export default Home