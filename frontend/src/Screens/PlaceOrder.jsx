import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions"
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import CheckoutSteps from "../Components/CheckoutSteps";
import Message from "../Components/Message";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

const PlaceOrder = () => {
  const navigateTo = useNavigate(); 
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  
  // Calculate prices   
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if(success) {
      navigateTo(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigateTo, success])

  const handlePlaceOrder = () => {
    if(!cart.paymentMethod) {
        alert("Choose payment method!");
        return
    }
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice 
    }))
  }

  return (
    <div>
        <Helmet>
            <title>Place Order</title>
        </Helmet>
        <CheckoutSteps step_1 step_2 step_3 step_4 />
        <div onClick = {() => navigateTo(-1)} className = "custom--centered--btn" style={{ top: "85px", cursor: "pointer" }}>
            <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
        </div>
        <Row>
            <Col md = {8}>
                <ListGroup className = "mb-rs">
                    <ListGroup.Item>
                        <h4>Shipping</h4>
                        <p>
                            <b className = "fw-bold pe-2">Address:</b>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            <br />
                            <b className = "fw-bold pe-2">Customer:</b> {userInfo.name}, {userInfo.email}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Payment</h4>
                        <b className = "fw-bold pe-2">Method:</b>
                        {cart.paymentMethod}
                        <Link className ="text-primary ps-3" to = "/payment">Edit</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h4>Order items</h4>
                        {cart.cartItems.length === 0 ? (
                        <Card>
                            <Card.Body>You chose no items, please <Link to = "/" className = "text-primary">choose</Link> and come back here</Card.Body> 
                        </Card>) : (
                            <ListGroup variant = "flush">
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key = {index} className = "p-2">
                                    <div className = "d-flex justify-content-between align-items-center">
                                        <div>
                                            <Link to = {`/products/${item.product}`}>
                                                <img src = {item.image} alt = {item.name} className = "img-fluid rounded img-thumbnail me-4" />
                                                <span>{item.name}</span>
                                                
                                            </Link>
                                        </div>
                                        <div className = "text-end">
                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md = {4}>
                <Card>
                    <ListGroup variant = "flush">
                        <ListGroup.Item>
                            <h3>Order summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className = "d-flex justify-content-between">
                                <Col md = {4}>Items:</Col>
                                <Col md = {8}>
                                    {cart.cartItems.map((item) => (
                                        <span key = {item.product}>
                                            <span>{item.name}</span>, &nbsp;
                                        </span>
                                    ))}
                                    {cart.cartItems.reduce((fTarget, sTarget) => fTarget + sTarget.quantity, 0)}
                                </Col>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className = "d-flex justify-content-between">
                                <Col md = {4}>Price:</Col>
                                <Col md = {8}>
                                ${cart.itemsPrice}
                                </Col>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className = "d-flex justify-content-between">
                                <Col md = {4}>Shipping:</Col>
                                <Col md = {8}>
                                ${cart.shippingPrice}
                                </Col>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className = "d-flex justify-content-between">
                                <Col md = {4}>Tax:</Col>
                                <Col md = {8}>
                                ${cart.taxPrice}
                                </Col>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className = "d-flex justify-content-between">
                                <Col md = {4}>Total:</Col>
                                <Col md = {8}>
                                ${cart.totalPrice}
                                </Col>
                            </div>
                        </ListGroup.Item>
                        {error && (
                            <ListGroup.Item>
                                <Message variant = "danger">{error}</Message>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button variant = "primary" className = "w-100" disabled = {cart.cartItems === 0} onClick = {handlePlaceOrder}>
                                Place order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrder