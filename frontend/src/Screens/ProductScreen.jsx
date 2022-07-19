import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, listProducts, addReviewToProduct } from "../actions/productActions";
import { PRODUCT_ADD_REVIEW_RESET } from "../Constants/productConstants";
import Rating from "../Components/Rating";
import RelatedProductScreen from "./RelatedProductScreen";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Row, Col, ListGroup, Card, Button, Badge, Form } from "react-bootstrap";
import { ArrowLeftCircleFill, Cart, Share, StarFill } from "react-bootstrap-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductScreen = () => {
  const params = useParams();
  const navigateTo = useNavigate();
  const [ quantity, setQuantity ] = useState(1);
  const [ rating, setRating ] = useState(0);
  const [ comment, setComment ] = useState("");

  const dispatch = useDispatch();
  const productId = params.id;

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  
  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const productAddReview = useSelector(state => state.productAddReview);
  const { loading: loadingReview, success: successReview, error: errorReview } = productAddReview;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
      if(successReview) {
        setRating(0)
        setRating("");
        dispatch({ type: PRODUCT_ADD_REVIEW_RESET })
      }
      dispatch(listProductDetails(productId));
      dispatch(listProducts())
  }, [dispatch, productId, successReview]);


  const handleAddToCart = () => {
    navigateTo(`/cart/${productId}?quantity=${quantity}`);
  }

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        dispatch(addReviewToProduct(productId, {
            rating,
            comment,
        }))
    }

  return (
    <>
        <Helmet>
            <title>
                {product.name}
            </title>
        </Helmet>
        <Link to = "/" className = "custom--centered--btn">
            <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
        </Link>
        {loading ?   
        <div className="d-flex justify-content-center align-items-center" style = {{ height: "85vh" }}>
            <Loader />
        </div> : 
        error || errorReview ?  <Message variant  = "danger">{error}</Message>
        :  <> 
            <Row className = "pb-clc">
                <Col md = {6} className = "d-flex justify-content-center align-items-center">
                    <Card className = "product--card">
                    {product.countInStock === 0 ? 
                        <div className = "badge--content">
                            <Badge bg = "danger">Out of stock</Badge>{' '}
                        </div>
                        : <div className = "badge--content">
                            <Badge bg = "success">In stock</Badge>{' '}
                        </div>
                        }
                        <Card.Body>
                            <Card.Img src = {product.image} alt = {product.name}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm = {12} md = {6} lg = {6} xl = {5}>
                    <ListGroup variant = "flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value = {product.rating} text = { product.numberOfReviews > 1 ? `${product.numberOfReviews} reviews` : `${product.numberOfReviews} review`}/>
                        </ListGroup.Item>
                        <ListGroup.Item className = "d-flex justify-content-between">
                            <p>Price:</p> 
                            <div className = "d-flex">
                                <p>${product.price}</p>
                                <p className = "text-decoration-line-through text-danger ps-3">${product.compareTo}</p>
                            </div>
                        </ListGroup.Item>
                        {product.countInStock > 0 ? (
                            <ListGroup.Item className = "d-flex justify-content-between align-items-center">
                            <p>Quantity:</p> 
                            <div className = "d-flex">
                                <Form.Control as = "select" value = {quantity} onChange = {(e) => setQuantity(e.target.value)}>
                                    {
                                        [...Array(product.countInStock).keys()].map((first) => (
                                            <option key = {first + 1} value = {first + 1}>
                                                {first + 1}
                                            </option>
                                        ))
                                    }
                                </Form.Control>    
                            </div>
                        </ListGroup.Item>
                        ): (
                            <ListGroup.Item className = "d-flex justify-content-between align-items-center">
                            <p>Quantity:</p> 
                            <div className = "d-flex">
                                <Form.Control as = "select" value = {0} onChange = {(e) => setQuantity(0)}>
                                    <option value="0">0</option>
                                </Form.Control>    
                            </div>
                        </ListGroup.Item>
                        ) }
                        <ListGroup.Item className = "text-break">
                            Description: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item className = "d-flex justify-content-between align-items-center">
                            <div>
                                Category: <Link to = {`/products/categories/${product.category}`} className = "text-primary">
                                    #{product.category}
                            </Link>
                            </div>
                        </ListGroup.Item>
                    </ListGroup> 
                    <div className = "mt-2 mb-5 ps-2">
                        <Button variant = "primary" className = "me-3" disabled = {product.countInStock === 0} onClick = {handleAddToCart}>
                            <Cart size = "1.2rem" fill = "#fff" />
                        </Button>
                        <Button variant = "primary" className = "me-3 btn-bd-primary">
                            <Share size = "1.4rem" fill = "#fff" cursor = {"pointer"} />
                        </Button>
                    </div>
                </Col>
                <Col md = {6} className = "mt-3">
                    <h3>Reviews</h3>
                    {product.reviews.length === 0 ? <Message variant = "success" className = "w-100"><p className = "m-0">No reviews yet</p></Message> : ""}
                    <ListGroup variant = "flush">
                        {product.reviews.map((review) => (
                            <ListGroup.Item key = {review._id} className = "ps-0">
                                {review.name}
                                <Rating value = {review.rating} />
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        {loadingReview && <div style = {{ height: "10vh" }} className = "d-flex justify-content-center align-items-center w-100"><Loader /></div>}
                    </ListGroup>
                </Col>
                <Col md = {6} className = "mt-3">
                    <h3>Comment</h3>
                    {userInfo ? (
                            <Form onSubmit = {handleReviewSubmit}>
                                <Form.Group controlId = "rating" className = "mb-1">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as = "select" value = {rating} onChange = {(e) => setRating(e.target.value)} required>
                                        <option value = "">Select..</option>
                                        <option value="1">1 - Star</option>
                                        <option value="2">2 - Stars</option>
                                        <option value="3">3 - Stars</option>
                                        <option value="4">4 - Stars</option>
                                        <option value="5">5 - Stars</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="comment" className = "mb-3">
                                    <Form.Label>Leave a comment</Form.Label>
                                    <Form.Control as = "textarea" value = {comment} style = {{ height: "20vh", minHeight: "20vh" }} onChange = {(e) => setComment(e.target.value)} required></Form.Control>
                                </Form.Group>
                                <Button variant = "primary" className = "w-100" type = "submit">Comment out</Button>
                            </Form>
                        ) : (
                            <Card style = {{ backgroundColor: "#f8d7da", color: "#842029" }}>
                                <Card.Body>
                                    Please <Link className = "text-danger" to = "/login">sign in </Link>to leave a comment
                                </Card.Body>    
                            </Card>
                        )}
                </Col>
                <div className="related--products">
                    <h3>Related Products</h3>   
                        <Row>
                            <Swiper slidesPerView={"auto"} spaceBetween={10} pagination = {{ clickable: true, }} navigation = {true} modules={[ Pagination, Navigation ]} className="mySwiper">
                            {products.map((item) => (product.category === item.category && (
                                    <SwiperSlide key = {item._id} className = "product-card">
                                        <Col sm = {10} md = {12} lg = {10} xl = {12}>
                                            <RelatedProductScreen item = {item} />
                                        </Col>
                                    </SwiperSlide>
                                )
                            ))}
                            </Swiper>
                        </Row>
                </div>
            </Row>
        </> 
        }
    </>
  )
}

export default ProductScreen;