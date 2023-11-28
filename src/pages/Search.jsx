/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);
            const res = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}&limit=10`);
            const data = await res.json();

            if (data && data.products) {
                setProducts(data.products);
                setLoading(false);
            }
        }

        fetchProducts();
    }, [searchQuery]);



    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
                    Product results:
                </h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && products.length === 0 && (
                        <p className='text-xl text-slate-700 text-center w-full'>No product found!</p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                        </p>
                    )}

                    {!loading &&
                        products &&
                        products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                </div>
            </div>
        </div>
    );
}
