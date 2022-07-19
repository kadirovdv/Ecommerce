import Rating from "./Rating";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <>
        <Card className = "p-3 mb-3 rounded">
        <a href = {`/products/${product._id}`}>
          <div className="card-image-flexed">
            <Card.Img src = {product.image} alt = {product.name}/>
          </div>
            <Card.Body className = "ps-0 pb-0 pt-1 pe-0">
            <div className="d-flex justify-content-between">
            <p className = "pt-3">
              {product.name}
            </p>
            <p className = "pt-3">
              ${product.price}
            </p>
          </div>
              <Card.Text as = "div">
                <Rating value = {product.rating} 
                text = { product.numberOfReviews > 1 ? `${product.numberOfReviews} reviews` : `${product.numberOfReviews} review`} />
              </Card.Text>
            </Card.Body>
            </a>
        </Card>
    </>
  )
}

export default Product;