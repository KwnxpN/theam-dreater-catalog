import Hero from '../components/home/Hero'
import ProductCarousel from '../components/home/ProductCarousel'
import { useProducts } from '@/hooks/queries/useProducts'
import { useMemo } from 'react'
import type { GetProductParams } from '@/types/product.type'

const Home = () => {
  const productParams = useMemo<GetProductParams>(() => ({
    page: 1,
    limit: 8,
    sort: 'random',
  }), [])

  const { data: products, isLoading: isProductsLoading, isError: isProductsError, refetch: refetchProducts } = useProducts(productParams)
  return (
    <>
      <div className="flex flex-col gap-y-22">
        <Hero />
        <div className='min-h-[10vh]'></div>
        <ProductCarousel products={products?.products || []} />
      </div>
    </>
  )
}

export default Home