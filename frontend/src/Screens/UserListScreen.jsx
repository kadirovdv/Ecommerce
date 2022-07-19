import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listUsers, deleteUser } from "../actions/userActions"
import { Helmet } from "react-helmet-async";
import { Button, Table } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { ArrowLeftCircleFill, PencilSquare, Trash2Fill } from "react-bootstrap-icons";

const UserListScreen = () => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigateTo("/login")
        }
    }, [dispatch, navigateTo, successDelete, userInfo]);

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
        console.log(`User with the id of ${id} has been deleted!`);
    }


    return (
        <>
            <Helmet>
                <title>
                    Users
                </title>
            </Helmet>
            <h3 className = "ps-5 mb-3">Users</h3>
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
                <div style = {{ height: "60vh" }}>
                    <Table striped bordered hover responsive className = "table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIl</th>
                                <th>ADMIN</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key  = {user._id}>
                                    <td>
                                        {user._id.substring(0, 15)}..
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        <a href = {`mailto:${user.email}`}>
                                            {user.email}
                                        </a>
                                    </td>
                                    <td>
                                        {user.isAdmin ? 
                                            <lord-icon  src = "https://cdn.lordicon.com/crrnydsb.json" trigger="hover" style = {{ width: "25px", height: "42px" }}></lord-icon> :
                                            <lord-icon  src = "https://cdn.lordicon.com/fdzomkrp.json" trigger="hover" style = {{ width: "25px", height: "42px" }}></lord-icon>
                                        }
                                    </td>
                                    <td className = "d-flex">
                                        <Link to = {`/admin/user/${user._id}/edit`} className = "me-3 btn btn-primary">
                                            <PencilSquare fill = "#fff" size = "1.3rem" />
                                        </Link>
                                       {!user.isAdmin && (
                                            <Button variant = "danger" onClick = {() => handleDeleteUser(user._id)}>
                                                <Trash2Fill fill = "#fff" size = "1.3rem" />
                                            </Button>
                                       )}
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

export default UserListScreen