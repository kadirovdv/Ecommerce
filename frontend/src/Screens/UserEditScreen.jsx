import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../Constants/userConstants";
import { Helmet } from "react-helmet-async";
import FormContainer from "../Components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";

const UserEditScreen = () => {
  const params = useParams()
  const userId = params.id;

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ isAdmin, setAdmin ] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
    } else {
        if(!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else{
            setName(user.name)
            setEmail(user.email)
            setAdmin(user.isAdmin)
        }
    }
  }, [dispatch, userId, user, successUpdate])

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }


  return (
      <>
        <Helmet>
            <title>Edit User</title>
        </Helmet>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant = "danger">{error}</Message>}
        <h3 className = "text-center mb-0">Edit User</h3>
        <Link to = "/admin/userlist" className = "custom--centered--btn" style = {{ top: "85px", cursor: "pointer" }}>
            <ArrowLeftCircleFill size = "2.4rem" fill = "#343a40" />
        </Link>
        {loading ? 
            <div className="custom--positioned">
                <Loader />
            </div> : 
        error ? 
            <Message variant = "danger">
                {error}
            </Message> :
        <FormContainer>
            <Form onSubmit = {handleUpdate} className = "p-4">
                <Form.Group controlId = "name" className = "mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId = "email" className = "mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" placeholder = "Enter email" value = {email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <div className = "d-flex justify-content-between align-items-center">
                    {userInfo._id === user._id ? (
                        <Form.Group controlId = "isAdmin">
                            <Form.Check type = "checkbox" label = "Current Admin" checked  disabled></Form.Check>
                        </Form.Group>
                ) : (
                    <Form.Group controlId = "isAdmin">
                        <Form.Check type = "checkbox" label = "Is Admin?" checked = {isAdmin} onChange = {(e) => setAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>
                )}
                    <Button type = "submit" variant = "success">
                        Update
                    </Button>
                </div>
            </Form>
        </FormContainer>
        }
      </>
  )
}

export default UserEditScreen;