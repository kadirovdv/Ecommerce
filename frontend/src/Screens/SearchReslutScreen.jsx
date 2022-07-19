import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Helmet } from "react-helmet-async";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const SearchResultScreen = () => {
  const { keyword } = useParams();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);


  return ( 
    <div>
      <Helmet>
        <title>
          Search
        </title>
      </Helmet>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style = {{ height: "85vh" }}>
            <Loader />
          </div>
          ) : error ? (
            <Message variant = "danger">
              {error}
            </Message>
            ) : (
              <>
              {!products && <Loader />}
              <Row>
                {products.map((product) =>  (
                    <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product._id}>
                      <Product product = {product} />
                    </Col>
                ))}
              </Row>
         </>
        )}
    </div>
  )
}

export default SearchResultScreen;