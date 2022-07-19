import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions"
import { Helmet } from "react-helmet-async";
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Form, Button } from "react-bootstrap";

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const navigateTo = useNavigate();
  const [ address, setAddress ] = useState(shippingAddress.address);
  const [ city, setCity ] = useState(shippingAddress.city);
  const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
  const [ country, setCountry ] = useState(shippingAddress.country);

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigateTo("/payment");
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    console.log(e.target[3].value);
  }

  return (
    <>
      <Helmet>
        <title>Shipping</title>
      </Helmet>
      <CheckoutSteps step_1 step_2 />
      <FormContainer>
        <h3 className = "text-center">Shipping</h3>
        <Form onSubmit = {handleSubmit} className = "p-4">
        <Form.Group controlId = "address" className = "mb-2">
          <Form.Label>Address</Form.Label>
          <Form.Control type = "text" placeholder = "Your address" value = {address} onChange = {(e) => setAddress(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group controlId = "city" className = "mb-2">
          <Form.Label>City</Form.Label>
          <Form.Control type = "text" placeholder = "Your city" value = {city} onChange = {(e) => setCity(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group controlId = "postalCode" className = "mb-2">
          <Form.Label>Zip / Postal code</Form.Label>
          <Form.Control type = "text" placeholder = "Your code" value = {postalCode} onChange = {(e) => setPostalCode(e.target.value)} required maxLength = {6}></Form.Control>
        </Form.Group>
        <Form.Group controlId = "country" className = "mb-2">
          <Form.Label>Country</Form.Label>
          <Form.Control type = "text" placeholder = "Your country" value = {country} onChange = {(e) => setCountry(e.target.value)} required></Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type = "submit" variant = "primary">Next</Button>
        </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen