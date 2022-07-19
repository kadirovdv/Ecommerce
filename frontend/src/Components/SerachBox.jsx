import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SerachBox = () => {
  const navigateTo = useNavigate();

  const [ keyword, setKeyword ] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
        navigateTo(`/search/${keyword}`);
        // e.target[0].value = ""
    } else {
        navigateTo(`/`)
    }
  }

  return (
    <Form className = "d-flex" onSubmit = {handleSearch}>
        <Form.Control type = "text" value = {keyword} name = "q" onChange = {(e) => setKeyword(e.target.value)} placeholder = "Search for products.." className = "me-sm-2 ms-sm-5"></Form.Control>
        <Button type = "submit" variant = "outline-primary">
            Search
        </Button>
    </Form>
  )
}

export default SerachBox