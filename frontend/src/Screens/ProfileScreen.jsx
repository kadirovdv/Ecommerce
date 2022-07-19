import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../Constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { Helmet } from "react-helmet-async";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { ArrowLeftCircleFill, EyeFill } from "react-bootstrap-icons"

const ProfileScreen = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ passwordShown, setPasswordShown ] = useState(false);
  const [ message, setMessage ] = useState(null)
  const navigateTo = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const listMyorders = useSelector(state => state.listMyorders);
  const { loading: loadingOrders, error: errorOrders, orders } = listMyorders;

  useEffect(() => {
    if(!userInfo) {
      navigateTo("/")
    } else {
        if(!user|| !user.name || success) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails("profile"));
            dispatch(listMyOrders());
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }
  }, [dispatch, navigateTo, userInfo, user, success]);

  const togglePasswordVisiblity = () => {
    if(password.length === 0) {
      alert("Enter new password first!");
      return
    }
    setPasswordShown(passwordShown ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch Register
    if(password !== confirmPassword) {
        setMessage("Passowrds do not match!")
    } 
     else {
        // DISPATCH UPDATE PROFILE
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Helmet>
        <title>
          Profile | Orders
        </title>
      </Helmet>
        <Col md = {3}>
            <div onClick = {() => navigateTo(-1)} className = "custom--centered--btn" style={{ top: "85px", cursor: "pointer" }}>
              <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
            </div>
            <h3 className = "text-center mb-0 p-0">My Profile</h3>
            {error && <Message variant = "danger">{error}</Message>}
            {message && <Message variant = "danger">{message}</Message>}
            {success && <Message variant = "success" fill = "#2d7345">Profile successfuly updated</Message>}
            {loading && <div className = "w-100 d-flex align-items-center justify-content-center" style = {{ height: "80vh" }}><Loader /></div>}
            <Form onSubmit = {handleSubmit} className = "p-4">
                <Form.Group controlId = "name" className = "mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = "email" className = "mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type = "email" placeholder = "Enter email" value = {email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = "password" className = "mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={passwordShown ? "text" : "password"} placeholder = "Enter password" value = {password} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                    <EyeFill className = "password-show" onClick = {togglePasswordVisiblity} />
                </Form.Group>
                <Form.Group controlId = "confirmPassword" className = "mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type = "password" placeholder = "Confirm password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type = "submit" variant = "success">
                Update
                </Button>
            </Form>
        </Col>
        <Col md = {9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
              <div className = "w-100 d-flex align-items-center justify-content-center" style = {{ height: "80vh" }}>
                <Loader />
              </div>
              ) : errorOrders ? (
                <Message variant = "danger">
                  {errorOrders}
                </Message>
              ) : (
                <Table striped bordered hover responsive className = "table-sm">
                  <thead>
                   <tr>
                    <th>ID</th>
                    <th>PAID</th>
                    <th>TOTAL</th>
                    <th>DELIVERED</th>
                    <th>Info</th>
                   </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key = {order._id}>
                        {console.log(order)}
                        <td>{order._id.substring(0, 5)}..</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.isDelivered ? order.deliverAt.substring(0, 10) : <lord-icon src = "https://cdn.lordicon.com/abgtphux.json" trigger = "loop" delay="130" style = {{ width: "25px", height: "42px" }}></lord-icon>}</td>
                        <td>
                          <a href = {`/orders/${order._id}`} className = "text-primary p-0">
                            <Button className = "w-100" variant = "primary">
                              Info
                            </Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
        </Col>
    </Row>
  )
}

export default ProfileScreen;