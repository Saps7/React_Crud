import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-[#67e8f9] shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Product</span>
            <span className='text-slate-700'>Search</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-white hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/search'>
            <li className='hidden sm:inline text-white hover:underline'>
              Search Products
            </li>
          </Link>
          <Link to='/create-product'>
            <li className='hidden sm:inline text-white hover:underline'>
              Add a new Product
            </li>
          </Link>
          <Link to='/sign-in'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.image}
                alt='profile'
              />
            ) : (
              <li className=' text-white hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
