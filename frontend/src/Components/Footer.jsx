import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className = "pt-3 pb-3">
      <Container fluid>
      <Row>
        <Col md= {6}>
          <h3>About</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nemo dolorem doloribus explicabo sequi quasi, ad modi a cumque sapiente. Sed, consequatur non? Eligendi tempore nesciunt doloribus temporibus alias ratione!</p>
        </Col>
        <Col>
        <h3>Company</h3>
        <ul>
          <li>Projects</li>
          <li>Contact</li>
          <li>StartUp</li>
        </ul>
        </Col>
        <Col>
          <h3>Short-Info</h3>
          <ul>
            <li>T-Mall</li>
            <li>In the progress</li>
            <li>Bukhara, Uzbekistan</li>
          </ul>
        </Col>
        <p className = "text-center mb-0">Copyright &copy; Template Mall</p>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer;