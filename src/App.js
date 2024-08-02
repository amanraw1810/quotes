// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


import DeskTopHeader from './component/DeskTopHeader';
import MobileHeader from './component/MobileHeader';
import DeskTopFooter from './component/DeskTopFooter';
import MobileFooter from './component/MobileFooter';


// path
import Home from './page/Home';
import ProductDetails from './page/ProductDetails';
import Contact from './page/Contact';
import Cart from './page/Cart';
import PageNotFound from './PageNotFound';
import Login from './page/Login';
import RegistrationListEdit from './edit/RegistrationListEdit';
import RegistrationList from './component/RegistrationList';
import Registration from './component/Registration';
import SubCategory from './page/SubCategory';
import Search from './page/Search';
import Category from './page/Category';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <div className="mobilenone">
            <DeskTopHeader />
          </div>

          <div className="displaynone">
            <MobileHeader />
          </div>
          <ToastContainer />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="product-detail/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="registration" element={<Registration />} />
            <Route path="registration-list" element={<RegistrationList />} />
            <Route path="edit/:id" element={<RegistrationListEdit />} />
            <Route path="sub-category/:sub_category_name" element={<SubCategory />} />
            <Route path="category/:category_name" element={<Category />} />
            <Route path="login" element={<Login />} />
            <Route path="searching-product/:searchQuery" element={<Search />} />
            <Route path="*" element={<PageNotFound />} />


          </Routes>

          {/* <Footer /> */}

          <div className="mobilenone">
            <DeskTopFooter />
          </div>
          <div className="displaynone">
            <MobileFooter />
          </div>
        </BrowserRouter>



      </>
    </div>
  );
}

export default App;
