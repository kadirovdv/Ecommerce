import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = expressAsyncHandler(async(request, response) => {
    const keyword = request.query.keyword  ? {
        name: {
            $regex: request.query.keyword,
            $options: "i"
        }
    } : {}

    const products = await Product.find({ ...keyword });

    response.json(products);
})

// @desc    Fetch single product
// @route   GET /api/products
// @access  Public


const getProductById = expressAsyncHandler(async(request, response) => {
    const product = await Product.findById(request.params.id);
    
    if(product) {
        response.json(product)
    } else {
        response.status(404)
        throw new Error("shit!, product not found")
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin


const deleteProduct = expressAsyncHandler(async(request, response) => {
    const product = await Product.findById(request.params.id);
    
    if(product) {
        await product.remove();
        response.json({ message: "Product has been deleted" })
    } else {
        response.status(404)
        throw new Error("shit!, product not found")
    }
})


// @desc    Add a product
// @route   POST /api/products
// @access  Private/Admin


const addProduct = expressAsyncHandler(async(request, response) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: request.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample Category",
        countInStock: 0,
        numberOfReviews: 0,
        description: "Sample description",
        compareTo: 0
    });

    const addedProduct = await product.save();
    response.status(201).json(addedProduct);
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin


const updateProduct = expressAsyncHandler(async(request, response) => {
    const { name, price, description, image, brand, category, countInStock, compareTo } = request.body;

    const product = await Product.findById(request.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.compareTo = compareTo;

        const updatedProduct = await product.save();
        response.json(updatedProduct);
    } else {
        response.status(404);
        throw new Error("Product not found")
    }
})


// @desc    Create bew review
// @route   POST /api/products/:id/reviews
// @access  Private

const createProductReview = expressAsyncHandler(async(request, response) => {
    const { rating, comment } = request.body;

    const product = await Product.findById(request.params.id);

    if(product) {
     const review = {
         name: request.user.name,
         rating: Number(rating),
         comment,
         user: request.user._id,
     }

     product.reviews.push(review);

     product.numberOfReviews = product.reviews.length
     product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

     await product.save();
     response.status(201).json({ message: "Review added" })
    } else {
        response.status(404);
        throw new Error("Product not found")
    }
})


// @desc    GET top rated products
// @route   GET /api/products/top
// @access  Private

const getTopProducts = expressAsyncHandler(async(request, response) => {
   const products = await Product.find({}).sort({ rating: -1} ).limit(10)

   response.json(products);
})

// @desc    GET products by time
// @route   GET /api/products/bytime
// @access  Private

const getProductsByTime = expressAsyncHandler(async(request, response) => {
    const products = await Product.find({}).sort({ createdAt: -1} ).limit(4)
 
    response.json(products);
 })
 

export { getProducts, getProductById, deleteProduct, addProduct, updateProduct, createProductReview, getTopProducts, getProductsByTime }