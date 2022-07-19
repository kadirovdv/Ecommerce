import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listProductDetails, deleteProduct, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../Constants/productConstants";
import { Helmet } from "react-helmet-async";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Row, Col, Card, Form, Button } from "react-bootstrap"
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

const AdminAddProductScreen = () => {
  const navigateTo = useNavigate();
  const params = useParams();
  const inputFile = useRef(null);

  const dispatch = useDispatch()

  const productId = params.id;

  const [ imagePlaceholder, setImagePlaceholder ] = useState(false);
  const [ image, setImage ] = useState("");
  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState(0);
  const [ brand, setBrand ] = useState("");
  const [ countInStock, setCountInStock ] = useState(0);
  const [ category, setCategory ] = useState("");
  const [ compareTo, setCompareTo ] = useState(0);
  const [ description, setDescription ] = useState("");
  const [ uploading, setUploading ] = useState(false);

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if(successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        window.location.reload()
    } else {
        if(!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setImage(product.image);
            setName(product.name);
            setPrice(product.price);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
            setCategory(product.category);
            setCompareTo(product.compareTo);
            setDescription(product.description);
        }
    }
    setImagePlaceholder(true);
    setTimeout(() => {
        setImagePlaceholder(false);
    }, 2345);
  }, [dispatch, productId, product, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({
        _id: productId,
        image,
        name,
        price,
        brand,
        countInStock,
        category,
        compareTo,
        description,
    }))
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        } 

        const { data } = await axios.post("/api/upload", formData, config);

        setImage(data)
        setUploading(false)
    } catch (error) {
        alert("Please choose an image")
        setUploading(false);
    }
  }

  const openInput = () => {
    inputFile.current.click();
  }

  const handleProductReset = () => {
    if(product.name === "Sample name") {
        dispatch(deleteProduct(productId))
    }
    navigateTo(-1);
    }


  return (
    <>
        <Helmet>
            <title>
                Product Edit
            </title>
        </Helmet>
        <h3 className = "ps-5 mb-3">Edit</h3>
        <div onClick = {() => handleProductReset()} className = "custom--centered--btn" style = {{ top: "85px", cursor: "pointer" }}>
            <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
        </div>
        {loadingUpdate && <div className="custom--positioned"> <Loader /> </div>}
        {errorUpdate && <Message variant = "danger">{errorUpdate}</Message>}
        {loading ? <div className="custom--positioned"> <Loader /> </div> :
         error ? <Message variant = "dager">{error}</Message> :
         <>
            <Form onSubmit = {handleSubmit}>
            <Row>
                <Col md = {4}>
                    <Card style = {{ width: "100%", height: "100%" }}>
                        {imagePlaceholder ? <div style = {{ width: "100%", height: "100%" }} className = "d-flex justify-content-center align-items-center"><Loader /></div> : <Card.Img src = {product.image === "/images/sample.jpg" ? "/images/placeholder-image.jpg" : product.image} alt = {product.image === "/images/sample.jpg" ? "Product add placeholder" : product.name} onClick = {openInput} style = {{ cursor: "pointer", width: "100%", height: "100%" }} />}
                        <Card.Body className = "pt-1 pb-1">
                            <Form.Group className = "mb-3" controlId = "image">
                                <Form.Control type = "file" ref = {inputFile} hidden onChange = {handleUpload}></Form.Control>
                                <Form.Control type = "text" value = {image} onChange = {(e) => setImage(e.target.value)} className = "mt-2"></Form.Control>
                                {uploading && <div className = "w-100 d-flex justify-content-center"> <Loader /> </div>}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md = {8}>
                    <Form.Group className = "mb-3 d-flex justify-content-between" controlId = "name-price">
                        <div className = "w-100 me-1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange= {(e) => setName(e.target.value)}></Form.Control>
                        </div>
                        <div className = "w-100 ms-1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type = "number" placeholder = "Enter price" value = {price} onChange = {(e) => setPrice(e.target.value)}></Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group className = "mb-3 d-flex justify-content-between" controlId = "brand-quantity">
                        <div className = "w-100 me-1">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type = "text" placeholder = "Enter brand" value = {brand} onChange = {(e) => setBrand(e.target.value)}></Form.Control>
                        </div>
                        <div className = "w-100 ms-1">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type = "number" placeholder = "Enter quantity" value = {countInStock} onChange = {(e) => setCountInStock(e.target.value)}></Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group className = "mb-3 d-flex justify-content-between" controlId = "category-compareto">
                        <div className = "w-100 me-1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type = "text" placeholder = "Enter categoty" value = {category} onChange = {(e) => setCategory(e.target.value)}></Form.Control>
                        </div>
                        <div className = "w-100 ms-1">
                            <Form.Label>Compare To</Form.Label>
                            <Form.Control type = "number" placeholder = "Enter name" value = {compareTo} onChange = {(e) => setCompareTo(e.target.value)}></Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group controlId = "description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as = "textarea" style = {{ height: "120px", maxHeight: "120px" }} className = "mb-3" value = {description} onChange = {(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <div className = "d-flex">
                        <Button variant = "danger" type = "submit" className = "w-100 me-1" onClick = {() => handleProductReset()}>Cancel</Button>
                        <Button variant = "primary" type = "submit" className = "w-100 ms-1">Upload</Button>
                    </div>
                </Col>
            </Row>
            </Form>
         </>
        }
    </>
  )
}

export default AdminAddProductScreen;