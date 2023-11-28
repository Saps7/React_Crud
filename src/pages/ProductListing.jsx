/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';

export default function ProductListing() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products?limit=8&skip=${page * 8 - 8}`);
      const data = await res.json();
      console.log(data);

      if (data && data.products) {
        setProducts(data.products);
        if (data.total < 64)
          setTotalPages(data.total / 8);
        else
          setTotalPages(8);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page]);


  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage)
    }
  }


  return (
    <>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Product results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && products === undefined && (
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
      {products && products.length > 0 &&
        <div className="p-10 my-15 flex flex-wrap">
          <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>◀</span>
          {[...Array(totalPages)].map((_, i) => {
            return <span key={i} className={page === i + 1 ? "py-15 px-20 border border-gray-400 cursor-pointer bg-gray-300" : "p-15 px-20 border border-gray-400 cursor-pointer"} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
          })}
          <span onClick={() => selectPageHandler(page + 1)} className={page < totalPages ? "" : "opacity-0"}>▶</span>
        </div>}
    </>
  );
}
