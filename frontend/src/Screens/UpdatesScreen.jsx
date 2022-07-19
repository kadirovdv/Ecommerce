import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductsByTime } from "../actions/productActions";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import { ArrowLeftCircleFill, CalendarCheck, GraphUpArrow } from "react-bootstrap-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const UpdatesScreen = () => {
  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const productByTime = useSelector(state => state.productByTime);
  const { loading, error, products } = productByTime;

  useEffect(() => {
    dispatch(listProductsByTime());
  }, [dispatch])
  
  return (
  <>
    {window.location.pathname === "/updates" ? (
      <>
        <h3 className = "pb-2 ps-5">Latest updates</h3>
        <div onClick = {() => navigateTo(-1)} className = "custom--centered--btn" style = {{ top: "85px", cursor: "pointer" }}>
        <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
      </div>
    </>
    ): <h3 className = "pb-2">Latest updates</h3>}
    <Row className = "update-cards">
      <Helmet>
        {window.location.pathname === "/updates" && (
          <title>Updates</title>
        )}
      </Helmet>
      <Col sm = {12} md = {6} lg = {4} xl = {3}>
      {error && <Message variant = "danger">{error}</Message>}
      <Card style = {{ minHeight: "310px"}}>
        <Card.Header className = "d-flex align-items-center">
          <CalendarCheck className = "me-2" size = "1.4rem" />
          <span>Newest Arrivals</span>
          </Card.Header>
          <Card.Body className = "d-flex flex-wrap justify-content-around">
          {loading && <div className = "d-flex justify-content-center align-items-center w-100" style = {{ height: "100%" }}>
            <Loader />
          </div>}
            {products.map((product) => (
              <div key = {product._id}>
                <Link to = {`/products/categories/${product.category}`} className = "me-1">
                  <CardImg src = {product.image} style = {{ width: "125px" }} />
                </Link>
              </div>
            ))}
          </Card.Body>
      </Card>
    </Col>
    <Col sm = {12} md = {6} lg = {4} xl = {3}>
      <Card style = {{ minHeight: "310px"}}>
        <Card.Header className = "d-flex align-items-center">
          <GraphUpArrow className = "me-2" size = "1.4rem" />
          <span>Top-Ranked products</span>
          </Card.Header>
          {loading ? <div className = "d-flex justify-content-center align-items-center w-100" style = {{ height: "100%" }}>
            <Loader />
          </div> : (
           <>
            <Card.Body className = "d-flex">
            <Link to = "/products/categories/Phones" className = "me-1">
              <CardImg src = "/images/iphone-13.jpg" className="w-100" />
            </Link>
            <Link to = "/products/categories/Sneakers" className = "me-1">
              <CardImg src = "/images/vans.jpg" className="w-100" />
            </Link>
            <Link to = "/products/categories/Sneakers">
            <CardImg src = "/images/adidas-x.jpg" className="w-100" />
            </Link>
          </Card.Body>
          <Card.Body className = "pt-0">
            <Link to = "/products/categories/Cameras" className = "d-flex justify-content-center">
              <CardImg src = "/images/sony-cyber-shot.jpg" className="w-50" />
            </Link>
          </Card.Body>
           </>
          )}
          
      </Card>
    </Col>
    <Col md = {6}>
      <Card>
        <Swiper slidesPerView={"auto"} spaceBetween={10} navigation = {true} modules={[ Navigation ]} className="mySwiper">
          <SwiperSlide>
            <Row>
              <Col md = {6}>
                <Card.Img src = "/images/converse.jpg" className = "w-100" style = {{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}/>
              </Col>
              <Col md = {6}>
                <Card.Body>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium explicabo velit  ad distinctio vel, quidem similique sequi tempora libero soluta tempore nihil! Error   molestias eaque, eius iure nesciunt labore dicta.
                </Card.Body>
              </Col>
            </Row>
          </SwiperSlide>
          <SwiperSlide>
            <Row>
              <Col md = {6}>
                <Card.Img src = "/images/iphone-13.jpg" className = "w-100" style = {{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}/>
              </Col>
              <Col md = {6}>
                <Card.Body>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium explicabo velit  ad distinctio vel, quidem similique sequi tempora libero soluta tempore nihil! Error   molestias eaque, eius iure nesciunt labore dicta.
                </Card.Body>
              </Col>
            </Row>
            </SwiperSlide>
          </Swiper>
        </Card>
      </Col>
  </Row>
  </>
  )
}

export default UpdatesScreen;