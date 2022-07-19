import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions"
import { Helmet } from "react-helmet-async";
import { Button, Table } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

const AdminOrderListScreen = () => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch();

    const listOrdersAdmin = useSelector(state => state.listOrdersAdmin);
    const { loading, orders, error } = listOrdersAdmin;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            navigateTo("/login")
        }
    }, [dispatch, navigateTo, userInfo]);

    return (
        <>
            <Helmet>
                <title>
                   Admin Orders
                </title>
            </Helmet>
            <h3 className = "ps-5 mb-3">Orders</h3>
            <div onClick = {() => navigateTo(-1)} className = "custom--centered--btn" style = {{ top: "85px", cursor: "pointer" }}>
                <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
            </div>
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
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>INFO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key  = {order._id}>
                                    <td>
                                        {order._id.substring(0, 15)}..
                                    </td>
                                    <td>
                                        {order.user.name}
                                    </td>
                                    <td>
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td>
                                        ${order.totalPrice}
                                    </td>
                                    <td>
                                      {order.isPaid ? (
                                        <lord-icon src = "https://cdn.lordicon.com/hjeefwhm.json" trigger = "hover"></lord-icon>
                                      ) : (
                                        <lord-icon src = "https://cdn.lordicon.com/vfzqittk.json" trigger = "hover"></lord-icon>
                                      )}
                                    </td>
                                    <td className = "poistion-relative">
                                    {order.isDelivered ? (
                                        <lord-icon src = "https://cdn.lordicon.com/uetqnvvg.json" trigger = "hover"></lord-icon>
                                      ) : (
                                        <lord-icon src = "https://cdn.lordicon.com/vfzqittk.json" trigger = "hover"></lord-icon>
                                      )}
                                    </td>
                                    <td>
                                        <a href = {`/orders/${order._id}`}>
                                            <Button variant = "primary">
                                                Info
                                            </Button>
                                        </a>
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

export default AdminOrderListScreen;