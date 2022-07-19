import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addOrderItems = expressAsyncHandler(async(request, response) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice 
    } = request.body;

    if(orderItems && orderItems.length === 0) {
        response.status(400);
        throw new Error("No order Items"); 
    } else {
        const order = new Order({
            orderItems,
            user: request.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice 
        })

        const createdOrder = await order.save();
        response.status(201).json(createdOrder);
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderByID = expressAsyncHandler(async (request, response) => {
    const order = await Order.findById(request.params.id).populate("user", "name email");


    if(order) {
        response.json(order)
    } else {
        response.status(404);
        throw new Error("Order not found")
    }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = expressAsyncHandler(async(request, response) => {
    const order = await Order.findById(request.params.id).populate("user", "email name")


    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now()

        const updateOrder = await order.save();
        response.json(updateOrder)
    } else {
        response.status(404);
        throw new Error("Order not found")
    }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin


const updateOrderToDelivered = expressAsyncHandler(async(request, response) => {
    const order = await Order.findById(request.params.id);

    if(order) {
        order.isDelivered = true;
        order.deliverAt = Date.now();

        const updateOrder = await order.save();
        response.json(updateOrder)
    } else {
        response.status(404);
        throw new Error("Order not found")
    }
})

// @desc    Get Logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = expressAsyncHandler(async(request, response) => {
    const orders = await Order.find({ user: request.user._id })
    response.json(orders);

})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

const getOrders = expressAsyncHandler(async(request, response) => {
    const orders = await Order.find({}).populate("user", "id name");
    response.json(orders);

})




export { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered }