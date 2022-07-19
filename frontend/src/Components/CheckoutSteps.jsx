import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap"
 
const CheckoutSteps = ({ step_1, step_2, step_3, step_4 }) => {
  return (
    <Nav className = "justify-content-center mb-4">
        <Nav.Item>
            {step_1 ? (
                <Link to = "/shipping">
                    <h5 className = "text-dark" style = {{ borderBottom: "1px solid blue" }}>Sign In</h5>
                </Link>
            ) : (
                <h5 className = "text-muted">Sign In</h5>
            )}
        </Nav.Item>
        <Nav.Item>
            {step_2 ? (
                <Link to = "/shipping">
                    <h5 className = "text-dark" style = {{ borderBottom: "1px solid blue" }}>Shipping</h5>
                </Link>
            ) : (
                <h5 className = "text-muted">Shipping</h5>
            )}
        </Nav.Item>
        <Nav.Item>
            {step_3 ? (
                <Link to = "/payment">
                    <h5 className = "text-dark" style = {{ borderBottom: "1px solid blue" }}>Payment</h5>
                </Link>
            ) : (
                <h5 className = "text-muted">Payment</h5>
            )}
        </Nav.Item>
        <Nav.Item>
            {step_4 ? (
                <Link to = "/placeorder">
                    <h5 className = "text-dark" style = {{ borderBottom: "1px solid blue" }}>Place Order</h5>
                </Link>
            ) : (
                <h5 className = "text-muted">Place Order</h5>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps