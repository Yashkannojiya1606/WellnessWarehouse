import React from 'react'
import Categories from './Administrator/Categories';
import DisplayAllCategories from './Administrator/DisplayAllCategories';
import SubCategories from './Administrator/SubCategories';
import DisplayAllSubCategories from './Administrator/DisplayAllSubCategories';
import Brands from './Administrator/Brands';
import DisplayAllBrands from './Administrator/DisplayAllBrands';
import Products from './Administrator/Products';
import DisplayAllProducts from './Administrator/DisplayAllProducts';
import Adminlogin from './Administrator/Adminlogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminDashboard from './Administrator/AdminDashboard';
import DisplayProductImage from './Administrator/DisplayProductImage';
import Footer from './UserInterface/Footer';
import Header from './UserInterface/Header';
import Home from './UserInterface/Home';
import Banner from './UserInterface/Banner';
import CartButton from './UserInterface/CartButton';
import DisplayAllBanner from './UserInterface/DisplayAllBanner';
import SignIn from './UserInterface/SignIn';
import SignUp from './UserInterface/SignUp';
import Productview from './UserInterface/Productview';
import Showcart from './UserInterface/Showcart'
import ProductList from './UserInterface/ProductList'
import CartBanner from './Administrator/CartBanner';
import SideBar from './UserInterface/SideBar';
import Coupon from './UserInterface/Coupon';
import ShowCartReview from './UserInterface/ShowCartReview';
import CartReview from './UserInterface/CartReview'
import PaymentGateway from './UserInterface/PaymentGateway';
import UserAccount from './Account/UserAccount';
function App(props) {
  return (
    <div >

      <Router>
        <Routes>
          <Route element={<Categories />} path={"/categories"} history={props.history} />
          <Route element={<DisplayAllCategories />} path={"/displayallcategories"} history={props.history} />
          <Route element={<SubCategories />} path={"/subcategories"} history={props.history} />
          <Route element={<DisplayAllSubCategories />} path={"/displayallsubcategories"} history={props.history} />
          <Route element={<Brands />} path={"/brands"} history={props.history} />
          <Route element={<DisplayAllBrands />} path={"/displayallbrands"} history={props.history} />
          <Route element={<Products />} path={"/products"} history={props.history} />
          <Route element={<DisplayAllProducts />} path={"/displayallproducts"} history={props.history} />
          <Route element={<Adminlogin />} path={"/adminlogin"} history={props.history} />
          <Route element={<AdminDashboard />} path={"/admindashboard"} history={props.history} />
          <Route element={<DisplayProductImage />} path={"/displayproductimage"} history={props.history} />
          <Route element={<Footer />} path={"/footer"} history={props.history} />
          <Route element={<Header />} path={"/header"} history={props.history} />
          <Route element={<Home />} path={"/home"} history={props.history} />
          <Route element={<Banner />} path={"/banner"} history={props.history} />
          <Route element={<DisplayAllBanner />} path={"/displayallbanner"} history={props.history} />
          <Route element={<CartButton />} path={"/cartbutton"} history={props.history} />
          <Route element={<SignIn />} path={"/signin"} history={props.history} />
          <Route element={<SignUp />} path={"/signup"} history={props.history} />
          <Route element={<Productview />} path={"/productview"} history={props.history} />
          <Route element={<Showcart />} path={"/showcart"} history={props.history} />
          <Route element={<ProductList />} path={"/productlist"} history={props.history} />
          <Route element={<CartBanner />} path={"/cartbanner"} history={props.history} />
          <Route element={<SideBar />} path={"/sidebar"} history={props.history} />
          <Route element={<Coupon />} path={"/coupon"} history={props.history} />
          <Route element={<ShowCartReview />} path={"/showcartreview"} history={props.history} />
          <Route element={<CartReview />} path={"/cartreview"} history={props.history} />
          <Route element={<PaymentGateway />} path={"/PaymentGateway"} history={props.history} />
          <Route element={<UserAccount />} path={"/Useraccount/*"} history={props.history} />
        </Routes>
      </Router>


    </div>
  );
}


export default App;
