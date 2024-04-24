import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  const handleReportClick = () => {
    toast("Product Listing Reported");
  };


  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.imgUrl}
        alt=""
      />
      <div className="product-like" onClick={handleReportClick}>
        <ion-icon name="alert-circle-outline"></ion-icon>

      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>

        <div className="d-flex justify-content-between align-items-center self-pickup-label">
          <div className="chip">Self Pickup <span><FcApproval /></span></div>
          <div className="d-flex align-items-center location-icon-label">
            {/* &nbsp;&nbsp;&nbsp; */}
            <div className="location-icon-text">
              <span className="ms-2"> <FaMapMarkerAlt /> Mumbai</span>
            </div>
          </div>
        </div>

        <div className="price">
          <h4>
            <span className="optical-price">₹{productItem.opticalPrice}</span>{" "}
            <span className="actual-price">₹{productItem.price}</span>
          </h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
