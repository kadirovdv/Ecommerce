import React, { useEffect, useState } from "react";
import Rating from "../Components/Rating";
import Loader from "../Components/Loader";
import { Card, Badge } from "react-bootstrap";


const RelatedProductScreen = ({ item}) => {
    // Custom loader here
    const [ loading, setLoading ] = useState(false);
    const RandomizedSeconds = Math.floor((Math.random() * 3000) + 1000);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, RandomizedSeconds)
    }, [])

  return (
    <div>
        {loading ? (
        <div className = "custom-loader">
            <Loader />
        </div>
        ) : (
        <Card className = "p-3 mb-3 rounded">
            {item.countInStock === 0 ? 
                <div className = "badge--content">
                    <Badge bg = "danger">Out of stock</Badge>{' '}
                </div>
                : <div className = "badge--content">
                    <Badge bg = "success">In stock</Badge>{' '}
                </div>
            }
            <a href = {`/products/${item._id}`}>
            <div className="card-image-flexed">
                <Card.Img src = {item.image} alt = {item.name}/>
            </div>
            <Card.Body className = "ps-0 pb-0 pt-1 pe-0">
            <div className="d-flex justify-content-between">
                <Card.Title className = "pt-3">
                    {item.name}
                </Card.Title>
                <Card.Title className = "pt-3">
                    ${item.price}
                </Card.Title>
            </div>
            <Card.Text as = "div">
                <Rating value = {item.rating} text = { item.numberOfReviews > 1 ? `${item.numberOfReviews} reviews` : `${item.numberOfReviews} review`} />
            </Card.Text>
            </Card.Body>
            </a>
        </Card>
        )}
    </div>
  )
}

export default RelatedProductScreen;