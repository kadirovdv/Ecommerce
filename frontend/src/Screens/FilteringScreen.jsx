import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Row, Col, Card } from "react-bootstrap";
import Rating from "../Components/Rating";
import { listProducts } from "../actions/productActions";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

const FilteringScreen = () => {
  const params = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);


  return (
    <>
      {loading ? 
        <div className="d-flex justify-content-center align-items-center" style = {{ height: "85vh" }}>
         <Loader />
        </div>
        : error ? 
        <Message variant = "danger">
          {error}
        </Message> :
        <> 
          <h3 className = "ps-5">{params.category}</h3>
          <div onClick = {() => navigateTo(-1)} className = "custom--centered--btn" style = {{ top: "85px", cursor: "pointer" }}>
            <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
          </div>
          <Row>
            {products.map((product) => product.category === params.category && (
              <Col sm = {12} md = {6} lg = {4} xl = {3} key = {product._id}>
                <Helmet>
                    <title>
                      {product.category}
                    </title>
                  </Helmet>
                <Card className = "p-3 mb-3 rounded">
                <a href = {`/products/${product._id}`}>
                  <Card.Img src = {product.image} alt = {product.name} />
                  <Card.Title className = "pt-3">
                    {product.name}
                  </Card.Title>
                  </a>
                    <Card.Body className = "ps-0 pb-0 pt-1 pe-0">
                      <Card.Text as = "div">
                        <Rating value = {product.rating} text = { product.numberOfReviews > 1 ? `${product.numberOfReviews} reviews` : `${product.numberOfReviews} review`} />
                      </Card.Text>
                    </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>  
    }
    </>
  )
}

export default FilteringScreen;