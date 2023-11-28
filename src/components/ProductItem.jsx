/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function ProductItem({ product }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/product/${product.id}`}>
        <img
          src={
            product.images[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='product cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {product.title}
          </p>
          <div className='flex items-center gap-1'>
            <FaStar className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {product.rating}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {product.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            Rs.
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}
