import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateProduct from './pages/CreateProduct';
import Product from './pages/Product';
import ProductListing from './pages/ProductListing';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/products' element={<ProductListing />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/search' element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path='/create-product' element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
