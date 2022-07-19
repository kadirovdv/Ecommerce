import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { login } from "../actions/userActions";
import { EyeFill } from "react-bootstrap-icons";
import { Helmet } from "react-helmet-async";

const LoginScreen = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordShown, setPasswordShown ] = useState(false);
  const navigateTo = useNavigate();

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if(userInfo) {
      navigateTo(redirect)
    }
  }, [navigateTo, userInfo, redirect])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch Login
    dispatch(login(email, password))
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <FormContainer>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
        <h3 className = "text-center mb-0 p-0">Sign In</h3>
        {error && <Message variant = "danger">{error}</Message>}
        {loading && <div className="custom--positioned"><Loader /></div>}
        <Form onSubmit = {handleSubmit} className = "p-4">
            <Form.Group controlId = "email" className = "mb-3">
              <Form.Label>Email</Form.Label>
                <Form.Control type = "email" placeholder = "Enter email" value = {email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId = "password" className = "mb-3 position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control type = {passwordShown ? "text" : "password"} placeholder = "Enter password" value = {password} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                <EyeFill className = "password-show" onClick = {togglePasswordVisiblity} />
            </Form.Group>
            <Button type = "submit" variant = "success">
              Sign In
            </Button>
        </Form>
        <div className = "ps-4">
          <p className = "mb-0">New Customer? <Link to = {redirect ? `/register?redirect=${redirect}` : "/register"}  className = "text-success">Sign Up</Link></p>
        </div>
    </FormContainer>
  )
}

export default LoginScreen;