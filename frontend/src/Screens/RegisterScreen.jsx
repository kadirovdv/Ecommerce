import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FormContainer from "../Components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { register } from "../actions/userActions";
import { EyeFill } from "react-bootstrap-icons";

const RegisterScreen = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ passwordShown, setPasswordShown ] = useState(false);
  const [ message, setMessage ] = useState(null)
  const navigateTo = useNavigate();

  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if(userInfo) {
      navigateTo(redirect)
    }
  }, [navigateTo, userInfo, redirect])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch Register
    if(password !== confirmPassword) {
        setMessage("Passowrds do not match!")
    }if(name.length < 7) {
      alert("Name must be greater than 7!");
      return
    } else {
        dispatch(register(name, email, password, confirmPassword))
    }
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <FormContainer>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
        <h3 className = "text-center mb-0 p-0">Sign Up</h3>
        {error && <Message variant = "danger">{error}</Message>}
        {message && <Message variant = "danger">{message}</Message>}
        {loading && <div className="custom--positioned"><Loader /></div>}
        <Form onSubmit = {handleSubmit} className = "p-4">
            <Form.Group controlId = "name" className = "mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId = "email" className = "mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type = "email" placeholder = "Enter email" value = {email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group  controlId = "password" className = "mb-3 position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control type = {passwordShown ? "text" : "password"} placeholder = "Enter password" value = {password} onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                <EyeFill className = "password-show" onClick = {togglePasswordVisiblity} />
            </Form.Group>
            <Form.Group controlId = "confirmPassword" className = "mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type = "password" placeholder = "Confirm password" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type = "submit" variant = "success">
              Sign Up
            </Button>
        </Form>
        <div className = "ps-4">
          <p className = "mb-0">Have an Account? <Link to = {redirect ? `/login?redirect=${redirect}` : "/login"}  className = "text-success">Sign In</Link></p>
        </div>
    </FormContainer>
  )
}

export default RegisterScreen;