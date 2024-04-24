import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct?.imgUrl} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2> <br />
            {/* <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div> */}
            <div className="info">

              <span className="optical-price">₹{selectedProduct?.opticalPrice}</span>
              <span className="price">₹{selectedProduct?.price}</span>

              <span className="chip-outline">{selectedProduct?.category}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center self-pickup-label-prod-detail">
              <div className="chip">Self Pickup <span><FcApproval /></span></div>
              <div className="d-flex align-items-center location-icon-label">
                {/* &nbsp;&nbsp;&nbsp; */}
                <div className="location-icon-text">
                  <span className="ms-2"> <FaMapMarkerAlt /> Mumbai</span>
                </div>
              </div>
            </div>

            <p>{selectedProduct?.shortDesc}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
