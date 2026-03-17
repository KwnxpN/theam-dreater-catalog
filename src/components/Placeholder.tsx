import { useProducts } from '../hooks/queries/useProducts'

function Placeholder() {
    const { data: products, isLoading, isError } = useProducts()

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong</p>;

    return (
        <div>
            <h2>Products</h2>
            {products?.products?.map((product) => (
                <div key={product.id} style={{ marginBottom: 20 }}>
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    )
}

export default Placeholder