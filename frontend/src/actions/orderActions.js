import axios from "axios";
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_GET_DETAILS_REQUEST,
    ORDER_GET_DETAILS_SUCCESS,
    ORDER_GET_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    LIST_MY_ORDERS_REQUEST,
    LIST_MY_ORDERS_SUCCESS,
    LIST_MY_ORDERS_FAIL,
    LIST_ORDERS_REQUEST,
    LIST_ORDERS_SUCCESS,
    LIST_ORDERS_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from "../Constants/orderConstants";


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails  = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_GET_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_GET_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_GET_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder  = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, {}, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const deliverOrder  = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listMyOrders  = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_MY_ORDERS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config);

        dispatch({
            type: LIST_MY_ORDERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_MY_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listOrders  = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_ORDERS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config);

        dispatch({
            type: LIST_ORDERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LIST_ORDERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}