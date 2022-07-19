import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listtTopRatedProducts } from "../actions/productActions";
import Message from "../Components/Message";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const TopRatedProductsScreen = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { error, products } = productTopRated;

  useEffect(() => {
    dispatch(listtTopRatedProducts());
  }, [dispatch])

  return (
    <div>
      {error && <Message variant = "danger">{error}</Message>}
        <Swiper slidesPerView={"auto"} spaceBetween={10} pagination = {{ clickable: true, }} navigation = {true} modules={[ Pagination, Navigation ]} className="mySwiper-2">
            {products.map((product) => (
                <SwiperSlide key = {product._id}>
                    <a href = {`/products/${product._id}`} className = "d-flex justify-content-center align-items-center flex-column w-100">
                        <img src = {product.image} alt = {product.name}/>
                        <h4 className = "text-center">{product.name} (${product.price})</h4>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default TopRatedProductsScreen