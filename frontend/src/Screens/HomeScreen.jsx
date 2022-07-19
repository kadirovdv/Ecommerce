import React, { useEffect, z } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import UpdatesScreen from "./UpdatesScreen";
import TopRatedProductsScreen from "./TopRatedProductsScreen";
import TabbedProducts from "../Components/TabbedProducts";

const HomeScreen = () => {
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  return ( 
    <div>
      <TopRatedProductsScreen />
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style = {{ height: "85vh" }}>
            <Loader />
          </div>
          ) : error ? (
            <Message variant = "danger">
              {error}
            </Message>
            ) : 
            (
              <>
                {products.length === 0 ? (
                  <div className = "w-100 d-flex justify-content-center align-items-center flex-column">
                    <img src="/images/no-products.svg" alt="no-produts" className = "w-50" />
                    <h3>No products found</h3>
                  </div>
                ) : (
                  <>
                    <Row>
                      <h3 className = "pb-2">Latest Products</h3>
                      {products.map((product) => (
                          <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product.name} className = "product-card">
                            <Product product = {product} />
                          </Col>
                      ))}
                    </Row>
                    <TabbedProducts products = {products} />
                  <UpdatesScreen />
                  </>
                )}
            </>
        )}
    </div>
  )
}

export default HomeScreen;