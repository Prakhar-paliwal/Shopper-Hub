import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './Pages/Product.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Shop from './Pages/shop.jsx';
import ShopCategory from './Pages/shopCategory.jsx';
import Cart from './Pages/Cart.jsx';
import Footer from './Components/Footer/Footer.jsx';
import mens_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'

function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path = '/' element = {<Shop/>}/>
          <Route path = '/mens' element = {<ShopCategory banner={mens_banner} category = "men"/>}/>
          <Route path = '/womens' element = {<ShopCategory banner={women_banner}  category = "women"/>}/>
          <Route path = '/kids' element = {<ShopCategory banner={kids_banner}  category = "kid"/>}/>
          <Route path = "/product" element = {<Product/>}>
            <Route path = ':productId' element = {<Product/>}>
          </Route></Route>
          <Route path = "/cart" element = {<Cart/>}></Route>
          <Route path = '/login' element = {<LoginSignup/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
