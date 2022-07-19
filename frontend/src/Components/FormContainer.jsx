import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children, style }) => {
  return (
    <Container className = { style ? style  : "custom--minHeight" }>
        <Row className="justify-content-md-center">
            <Col xs = {12} md = {12} className = "form--card">
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer