import React, { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProducts, deleteProduct, addProduct } from "../actions/productActions";
import { PRODUCT_ADD_RESET } from "../Constants/productConstants";
import { Helmet } from "react-helmet-async";
import { Button, Table } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { ArrowLeftCircleFill, PencilSquare, Plus, Trash2Fill } from "react-bootstrap-icons";

const AdminProductListScreen = () => {
    const params = useParams();
    const navigateTo = useNavigate()
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productAdd = useSelector(state => state.productAdd);
    const { loading: loadingAdd, success: successAdd, error: errorAdd, product: addedProduct } = productAdd;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    useEffect(() => {
        dispatch({ type: PRODUCT_ADD_RESET });
        if(!userInfo.isAdmin) {
            navigateTo("/login")
        }

        if(successAdd) {
            navigateTo(`/admin/product/${addedProduct._id}/edit`);
            console.log("Successfully got to edit screen!");
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, navigateTo, userInfo, successDelete, successAdd, addedProduct]);

    const handleUploadProduct = () => {
        console.log("Get to upload product");
        dispatch(addProduct())
    }

    const handleProductDelete = (id) => {
        console.log(`Product with the id of ${id} has been deleted!`);
        // DELETE THE PRODUCT
        dispatch(deleteProduct(id));
    }

    return (
        <>
            <Helmet>
                <title>
                    Admin Products
                </title>
            </Helmet>
            <div className = "d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h3 className = "ps-5 m-0">Products</h3>
                    <div onClick = {() => navigateTo(-1)} className = "custom--centered--btn" style = {{ cursor: "pointer" }}>
                        <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
                    </div>
                </div>
                <div>
                    <Button variant = "primary" onClick = {handleUploadProduct}>
                        <Plus size = "1.4rem" fill = "#fff" />
                    </Button>
                </div>
            </div>
            {loadingDelete && <div className="custom--positioned"> <Loader /> </div> }
            {errorDelete && <Message variant = "danger"> {errorDelete} </Message> }
            {loadingAdd && <div className="custom--positioned"> <Loader /> </div> }
            {errorAdd && <Message variant = "danger"> {errorAdd} </Message> }
            {loading ? (
                <div className="custom--positioned">
                    <Loader />
                </div>
            ) : error ? (
                <Message variant = "danger">{error}</Message>
            ) : (
                <div style = {{ minHeight: "60vh" }}>
                    <Table striped bordered hover responsive className = "table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th>INFO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key  = {product._id}>
                                    <td>
                                        {product._id.substring(0, 15)}..
                                    </td>
                                    <td>
                                        {product.name}
                                    </td>
                                    <td>
                                        ${product.price}
                                    </td>
                                    <td>
                                        {product.category}
                                    </td>
                                    <td>
                                        {product.brand}
                                    </td>
                                    <td className = "d-flex">
                                        <Link to = {`/admin/product/${product._id}/edit`} className = "me-3 btn btn-primary">
                                            <PencilSquare fill = "#fff" size = "1.3rem" />
                                        </Link>
                                        <Button variant = "danger" onClick = {() => handleProductDelete(product._id)}>
                                            <Trash2Fill fill = "#fff" size = "1.3rem" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    )
}

export default AdminProductListScreen