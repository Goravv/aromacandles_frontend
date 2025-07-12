import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import API from "../api";

function Product({ product }) {
  return (
    <Card className="py-3 my-3 rounded shadow-sm border-0 ">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={`https://aromacandles-backend.onrender.com${product.image}`}
          alt={product.name}
          variant="top"
          className="object-cover "
          style={{maxHeight:"250px"}}
        />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <Card.Title as="h5" className="text-primary fw-semibold">
            {product.name}
          </Card.Title>
        </Link>

        {/* <Card.Text as="div">
          <div className="my-2">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f8e825"
            />
          </div>
        </Card.Text> */}

        <Card.Text as="h5" className="text-primary fw-semibold">
          ₹ {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
