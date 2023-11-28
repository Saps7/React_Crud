import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  console.log(formData);


  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });
      const data = await res.json();
      if(data){  
        setLoading(false);
        setProductAdded(true);
        setTimeout(() => {
          navigate('/');
        },5000);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      {productAdded ? 
        <h1 className='text-3xl font-semibold text-center my-7'>
          New Product has been sucessfully created!
        </h1> 
      : <main className='p-3 max-w-4xl mx-auto'>
          <h1 className='text-3xl font-semibold text-center my-7'>
            Create a Product
          </h1>
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
              <input
                type='text'
                placeholder='Title'
                className='border p-3 rounded-lg'
                id='title'
                maxLength='62'
                minLength='5'
                required
                onChange={handleChange}
                value={formData.title}
              />
              <textarea
                type='text'
                placeholder='Description'
                className='border p-3 rounded-lg'
                id='description'
                required
                onChange={handleChange}
                value={formData.description}
              />
              <input
                type='number'
                placeholder='Price'
                className='border p-3 rounded-lg'
                id='price'
                required
                onChange={handleChange}
                value={formData.price}
              />
              <button
                disabled={loading}
                className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
              {error && <p className='text-red-700 text-sm'>{error}</p>}

            </div>
          </form>
        </main>
      }
    </>
  );
}
