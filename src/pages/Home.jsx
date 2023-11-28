import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

export default function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=9');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-[#5eead4] font-bold text-3xl lg:text-6xl'>
          All the best products across the globe in one place!
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          The best products at one place.
          <br />
          We have a wide range of products for you to choose from.
        </div>
        <Link
          to={'/products'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Click here to get list of all Products
        </Link>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {products && products.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Top Products</h2>
            </div>
            <div className='flex flex-wrap gap-4'>
              {products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
