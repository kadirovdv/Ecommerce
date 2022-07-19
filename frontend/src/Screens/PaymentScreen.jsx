import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions"
import { Helmet } from "react-helmet-async";
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Col, Form, Button, Row } from "react-bootstrap";

const PaymentScreen = () => {
  const navigateTo = useNavigate();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress) {
    navigateTo("/shipping")
  }

  const [ paymentMethod, setPaymentMethod ] = useState("Paypal");

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigateTo("/placeorder");
  }

  return (
    <>
       <Helmet>
          <title>Payment</title>
       </Helmet>
      <CheckoutSteps step_1 step_2 step_3 />
      <FormContainer style = {{ alignItems: "start" }}>
        <h3 className = "text-center m-0">Payment Method:</h3>
        <Form onSubmit = {handleSubmit} className = "p-4">
        <Form.Group>
            <Form.Label as = "legend" className = "mb-3">Select Method</Form.Label>
        </Form.Group>
        <Row>
            <Col>
                <Form.Group>
                    <Form.Check type = "radio" label = "Telegram" id = "Telegram" name = "paymentmethod" value = "Telegram" onChange = {(e) => setPaymentMethod(e.target.value)} required></Form.Check>
                </Form.Group>
            </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button type = "submit" variant = "primary">Next</Button>
        </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen;