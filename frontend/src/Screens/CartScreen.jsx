import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import { Row, Col, Form, Button, Card, Offcanvas, ListGroup } from "react-bootstrap";
import { TrashFill, ListUl, ArrowLeftCircleFill } from "react-bootstrap-icons";

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const productId = params.id;
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const [ loading, setLoading ] = useState(false)

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1350);
    if(productId) {
      dispatch(
        addToCart(productId, quantity)
      )
    }
  }, [dispatch, productId, quantity]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    cartItems.length === 1 && setTimeout(() => {
      window.location.replace("/");
    }, 2300);
  }

  const handleCheckout = () => {
    navigateTo("/login?redirect=/shipping")
  };


  return (
    <div id = "cart--content" style = {{ minHeight: "80vh" }}>
      <Helmet>
        <title>
          Cart
        </title>
      </Helmet>
     {loading ? (
       <div className="d-flex justify-content-center align-items-center" style = {{ height: "85vh" }}>
          <Loader />
        </div>
     ) : (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className = "ps-5 mb-0">Cart</h3>
          <Link to = "/" className = "custom--centered--btn">
            <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
          </Link>
          <Button variant = "primary" className = "customized--ulBtn" onClick = {handleShow}>
            <ListUl size = "1.5rem" fill = "#fff" />
          </Button>
          </div>
            {cartItems.length === 0 ? (
              <Row className = "pt-2">
                <Col  md = {8}>
                <Card>
                  <Card.Body>
                  Your cart is empty 
                    <Link to = "/" className = "ms-2">
                      <Button variant = "success">
                        Go shopping.
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              </Row>
            ) : (
              <Row className = "pt-2">
              {cartItems.map((item) => (
                  <Col sm = {12} md = {6} lg = {4} xl = {3} key = {item.product}>
                    <Card className = "p-3 mb-3 rounded">
                      <a href = {`/products/${item.product}`}>
                        <Card.Img src = {item.image} alt = {item.name} variant = "top"/>
                        <div className="d-flex justify-content-between">
                          <Card.Title className = "pt-3">
                            {item.name}
                          </Card.Title>
                          <Card.Title className = "pt-3">
                            ${item.price}
                          </Card.Title>
                        </div>
                      </a>
                        <Card.Body className = "ps-0 pe-0 pb-0 d-flex justify-content-between">
                          <div>
                            <Form.Control as = "select" value = {item.quantity} onChange = {(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                              {
                                [...Array(item.countInStock).keys()].map((first) => (
                                    <option key = {first + 1} value = {first + 1}>
                                        {first + 1}
                                    </option>
                                ))
                              }
                            </Form.Control>    
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <Button variant = "danger" onClick = {() => handleRemoveFromCart(item.product)}>
                              <TrashFill fill = "#fff" />
                            </Button>
                          </div>
                        </Card.Body>
                    </Card>
                  </Col>
              ))}
              </Row>
            )}
          <Offcanvas show = {show} onHide = {handleClose} placement = "end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Results</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div aria-label = "Subtotal" className = "d-flex flex-wrap">
              <ListGroup className = "w-100">
                <ListGroup.Item className = "d-flex justify-content-between">
                  <h5>Subtotal: </h5>
                  <h5>$({cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)})</h5>
                </ListGroup.Item>
                <ListGroup.Item className = "d-flex justify-content-between">
                  <h5>Items: </h5>
                  <h5>{cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}</h5>
                </ListGroup.Item>
                <ListGroup.Item className = "d-flex justify-content-between">
                  <Button type = "button" variant = "dark" className = "w-100" disabled = {!cartItems.length} onClick = {handleCheckout}>
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
          </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
     )}
    </div>
  )
}

export default CartScreen;