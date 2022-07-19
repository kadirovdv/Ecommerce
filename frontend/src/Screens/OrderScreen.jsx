import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../Constants/orderConstants";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

const OrderScreen = () => {
  const navigateTo = useNavigate(); 
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;
  
  const orderDeliver = useSelector(state => state.orderDeliver);
  const {  loading: loadingDeliver, success: successDeliver } = orderDeliver;
  
  if(!loading) {
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
      
      // Calculate prices   
      order.itemsPrice = addDecimals(order.orderItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0));
    
  }
  
  useEffect(() => {

    if(!order || successPay || successDeliver) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
        localStorage.removeItem("cartItems");
        window.location.reload();
    }

    const handlePaymentTg = () => {
        dispatch(payOrder(orderId));
        localStorage.removeItem("cartItems");
    }

    const handleDeliver = () => {
        dispatch(deliverOrder(order));
        setTimeout(() => {
            window.location.reload() 
        }, 1200);
    }


  return (
    <>
        {loading ? 
            <div className="custom--positioned"><Loader /></div>
        : error ? 
            <Message variant = "danger">{error}</Message>
        : (
            <>
                <Helmet>
                    <title>Order</title>
                </Helmet>
                <div onClick = {() => navigateTo(userInfo.isAdmin ? "/admin/orderlist" : -1)} className = "custom--centered--btn" style={{ top: "85px", cursor: "pointer" }}>
                    <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
                </div>
                <h3 style = {{ wordBreak: "break-all" }} className = "ps-5">Order: {order._id.substring(0, 15)}..</h3>
                <Row>
                    <Col md = {8}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h4>Shipping</h4>
                                <p>
                                    <b className = "fw-bold pe-2">Address:</b>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    <br />
                                    <b className = "fw-bold pe-2">Name:</b>
                                    {order.user.name}
                                    <br />
                                    <b className = "fw-bold pe-2">Email:</b>
                                    <a href = {`mailto:${order.user.email}`} className = "text-primary">{order.user.email}</a>
                                </p>
                                {order.isDelivered ? (
                                    <Message variant =  "success">
                                        Delivered on {order.deliverAt.substring(0, 10)}
                                    </Message>
                                ) : (
                                    <Message variant = "danger">Not Delivered</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Payment</h4>
                                <b className = "fw-bold pe-2">Method:</b>
                                {order.paymentMethod}
                                <br />
                                {order.isPaid ? (
                                        <Message variant = "success">Paid on {order.paidAt.substring(0, 10)}</Message>
                                    ) : (
                                        <Message variant = "danger" >Not Paid</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Order items</h4>
                                {order.orderItems.length === 0 ? (
                                <Card>
                                    <Card.Body>You made no orders, please <Link to = "/" className = "text-primary">make one</Link> and come back here</Card.Body> 
                                </Card>) : (
                                    <ListGroup>
                                        {order.orderItems.map((item, index) => (
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
                                            {order.orderItems.map((item) => (
                                                <span key = {item.product}>
                                                    <span>{item.name}</span> &nbsp;
                                                </span>
                                            ))}
                                            {order.orderItems.reduce((fTarget, sTarget) => fTarget + sTarget.quantity, 0)}
                                        </Col>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className = "d-flex justify-content-between">
                                        <Col md = {4}>Price:</Col>
                                        <Col md = {8}>
                                        ${order.itemsPrice}
                                        </Col>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className = "d-flex justify-content-between">
                                        <Col md = {4}>Shipping:</Col>
                                        <Col md = {8}>
                                        ${order.shippingPrice}
                                        </Col>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className = "d-flex justify-content-between">
                                        <Col md = {4}>Tax:</Col>
                                        <Col md = {8}>
                                        ${order.taxPrice}
                                        </Col>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className = "d-flex justify-content-between">
                                        <Col md = {4}>Total:</Col>
                                        <Col md = {8}>
                                        ${order.totalPrice}
                                        </Col>
                                    </div>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        <Button variant = "primary" onClick = {handlePaymentTg} className = "w-100">
                                            Pay
                                        </Button> 
                                    </ListGroup.Item>
                                )}
                                {order.isPaid && (
                                    <ListGroup.Item>
                                        <Button variant = "success" className = "w-100" style = {{ pointerEvents: "none" }}>
                                            Paid
                                        </Button>
                                    </ListGroup.Item>
                                )}
                                {loadingDeliver && <div className="custom--positioned"><Loader /></div>}
                                <ListGroup.Item>
                                    {userInfo.isAdmin && !order.isDelivered && order.isPaid ? (
                                        <Button type = "button" variant = "primary" onClick = {handleDeliver} className = "w-100">
                                            Mark As Delivered
                                        </Button>
                                    ) : (
                                        <Button variant = "primary" disabled className = "w-100">
                                            Mark As Delivered
                                        </Button>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )}   
    </>
  )
}

export default OrderScreen;