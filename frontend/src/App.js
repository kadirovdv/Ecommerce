import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import FilteringScreen from "./Screens/FilteringScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import CartScreen from "./Screens/CartScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrder from "./Screens/PlaceOrder";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import AdminProductListScreen from "./Screens/AdminProductListScreen";
import AdminAddProductScreen from "./Screens/AdminAddProductScreen";
import AdminOrderListScreen from "./Screens/AdminOrderListScree";
import UpdatesScreen from "./Screens/UpdatesScreen";
import SearchResultScreen from "./Screens/SearchReslutScreen";
import ScrollRestoration from "./Components/ScrollRestoration";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { ArrowUpCircle } from "react-bootstrap-icons";

const App = () => {
  window.onscroll = function(ev) {
    let scrollIc = document.querySelector(".scrollUp");
    if(window.scrollY >= document.body.clientHeight / 2) {
      scrollIc.classList.remove("d-none");
    } else {
      scrollIc.classList.add("d-none");
    }
  }

  const handleScrollToUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
    <Helmet>
      <title>
        Template Mall
      </title>
    </Helmet>
    <Router>
      <Header />
      <main className = "minHeight--auto">
        <Container fluid>
          <ScrollRestoration />
        <Routes>
            <Route path = "/login" element = {<LoginScreen />} />
            <Route path = "/register" element = {<RegisterScreen />} />
            <Route path = "/profile" element = {<ProfileScreen />} />
            <Route path = "/products/:id" element = {<ProductScreen />} />
            <Route path = "/cart" element = {<CartScreen />} />
            <Route path = "/cart/:id" element = {<CartScreen />} />
            <Route path = "/products/categories/:category" element = {<FilteringScreen />} />
            <Route path = "/shipping" element = {<ShippingScreen />} />
            <Route path = "/payment" element = {<PaymentScreen />} />
            <Route path = "/placeorder" element = {<PlaceOrder />} />
            <Route path = "/orders/:id" element = {<OrderScreen />} />
            <Route path = "/admin/userlist" element = {<UserListScreen />} />
            <Route path = "/admin/user/:id/edit" element = {<UserEditScreen />} />
            <Route path = "/admin/productlist" element = {<AdminProductListScreen />} />
            <Route path = "/admin/product/:id/edit" element = {<AdminAddProductScreen />} />
            <Route path = "/admin/orderlist" element = {<AdminOrderListScreen />} />
            <Route path = "/updates" element = {<UpdatesScreen />} />
            <Route path = "/search/:keyword" element = {<SearchResultScreen />} />
            <Route path = "/" element = {<HomeScreen />} />
          </Routes>
        </Container>
        <Button className = "scrollUp d-none" onClick = {handleScrollToUp}>
          <ArrowUpCircle />
        </Button>
      </main>
      <Footer />
    </Router>
    </>
    
  );
  
}

export default App;
