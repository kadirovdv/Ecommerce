import express from "express";
const router = express.Router();
import { getProducts, getProductById, deleteProduct, updateProduct, addProduct, createProductReview, getTopProducts, getProductsByTime } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js"

router.route("/").get(getProducts).post(protect, admin, addProduct);
router.route("/top").get(getTopProducts);
router.route("/bytime").get(getProductsByTime);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
export default router;