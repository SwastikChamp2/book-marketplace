import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const auth = getAuth();
  const db = getFirestore();



  const handelClick = (bookID) => {
    router(`/shop/${bookID}`);
  };

  const handelAdd = async (productItem) => {
    try {
      const user = auth.currentUser; // Get the current user
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Update the user's document in Firestore
      const userDocRef = doc(db, "Users", user.email); // Assuming email is the document ID

      // Get the current cart data from Firestore
      const userDocSnapshot = await getDoc(userDocRef);
      const cartData = userDocSnapshot.data().cart || {};

      // Add the new item to the cart
      const updatedCartData = {
        ...cartData,
        [productItem.id]: [], //[productItem.id]: [parseInt(productItem.bookQuantity), 1],
      };

      await setDoc(userDocRef, { cart: updatedCartData }, { merge: true });

      // Show success message
      toast.success("Product has been added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    }
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
        onClick={() => handelClick(productItem.id)}
        src={productItem.imgUrl}
        alt=""
      />
      <div className="product-like" onClick={handleReportClick}>
        <ion-icon name="alert-circle-outline"></ion-icon>

      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick(productItem.id)}>{productItem.productName}</h3>

        {productItem.selfPickupOption && (
          <div className="d-flex justify-content-between align-items-center self-pickup-label">
            <div className="chip">Self Pickup <span><FcApproval /></span></div>
            <div className="d-flex align-items-center location-icon-label">
              <div className="location-icon-text">
                <span className="ms-2"> <FaMapMarkerAlt /> {productItem.city}</span>
              </div>
            </div>
          </div>
        )}

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
