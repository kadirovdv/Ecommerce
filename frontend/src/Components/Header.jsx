import React from "react";
import { Link, useNavigate, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SerachBox";
import { Container, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { Cart, CreditCard, PersonFill, Power, BoxArrowInRight, CalendarDate } from "react-bootstrap-icons";

const Header = () => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const handleLogout = () => {
    dispatch(logout());
    navigateTo("/");
  }
  return (
    <header>
      <Navbar bg = "dark" variant = "dark" expand = "lg" collapseOnSelect fixed = "top">
        <Container fluid>
          <Navbar.Brand as = {Link} to = "/">T-Mall</Navbar.Brand>
          <Navbar.Toggle aria-controls = "basic-navbar-nav" />
          <Navbar.Collapse id = "basic-navbar-nav">
          <div className = "w-100 sb-rs">
           <SearchBox />
          </div>
            <Nav className = "ms-auto">
              <Nav.Link as = {Link} to = "/updates" className = "position-relative d-flex align-items-center">
                <CalendarDate size = "1.4rem" fill="#fff" />
                <span className = "ms-3 nav-hidden">T-Updates</span>
              </Nav.Link>
              <Nav.Link as = {Link} to = "/cart" className = "position-relative d-flex align-items-center">
                <Cart size = "1.4rem" fill="#fff" />
                <Badge bg = "success" pill className = "animated-badge">{cartItems.length ? cartItems.reduce((fTarget, sTarget) => fTarget + sTarget.quantity, 0) : ""}</Badge>
                <span className="ms-3 nav-hidden">Cart</span>
              </Nav.Link>
              <Nav.Link as = {Link} to = "/shipping" className = {!cartItems.length ? "disabled d-flex align-items-center" : "position-relative d-flex align-items-center"}>
                <CreditCard size = "1.4rem" fill = { !cartItems.length ? "#ffffff8c" : "#fff" } />
                <span className="ms-3 nav-hidden">Pay Now</span>
              </Nav.Link>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title = {<PersonFill size = "1.4rem" style = {{ color: "#fff" }} />} id = "username" className = "me-0">
                <Nav.Link as = {Link} to = "/admin/userlist" className = "dropdown-item ps-2">
                  <span className = "ms-1 text-black">Users</span>
                </Nav.Link>
                <Nav.Link as = {Link} to = "/admin/productlist" className = "dropdown-item ps-2">
                  <span className = "ms-1 text-black">Products</span>
                </Nav.Link>
                <Nav.Link as = {Link} to = "/admin/orderlist" className = "dropdown-item ps-2">
                  <span className = "ms-1 text-black">Orders</span>
                </Nav.Link>
              </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title = {userInfo.name} id = "username" className = "me-0">
                    <Nav.Link as = {Link} to = "/profile" className = "dropdown-item ps-2">
                      <PersonFill size = "1.4rem" style = {{ color: "#000" }} />
                      <span className = "ms-1 text-black">Profile</span>
                    </Nav.Link>
                    <NavDropdown.Item className = "nav-link ps-2" onClick = {handleLogout}>
                      <Power size = "1.4rem" style = {{ color: "#000" }} />
                      <span className = "ms-1 text-black">Logout</span>
                    </NavDropdown.Item>
                </NavDropdown>
              ) : (
              <NavDropdown title = "Authent">
                <Nav.Link as = {Link} to = "/login" className = "dropdown-item ps-2">
                  <BoxArrowInRight size = "1.4rem" style = {{ color: "#000" }} />
                  <span className = "ms-1 text-black">Sign In</span>
                </Nav.Link>
                <Nav.Link as = {Link} to = "/register" className = "dropdown-item ps-2">
                  <PersonFill size = "1.4rem" style = {{ color: "#000" }} />
                  <span className = "ms-1c text-black">Sign Up</span>
                </Nav.Link>
              </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;