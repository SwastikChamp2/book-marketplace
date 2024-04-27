import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ProductDetails = () => {
  // const dispatch = useDispatch();

  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const db = getFirestore(); // Initialize Firestore


  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  // const handelAdd = (selectedProduct, quantity) => {
  //   dispatch(addToCart({ product: selectedProduct, num: quantity }));
  //   toast.success("Product has been added to cart!");
  // };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "BookListing", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSelectedProduct(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [db, id]);

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct?.bookPicture} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.bookName}</h2><br />

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

              <span className="optical-price">₹{selectedProduct?.marketPrice}</span>
              <span className="price">₹{selectedProduct?.sellingPrice}</span>

              <span className="chip-outline">{selectedProduct?.genre}</span>
            </div>

            {selectedProduct?.selfPickupOption && (
              <div className="d-flex justify-content-between align-items-center self-pickup-label-prod-detail">
                <div className="chip">Self Pickup <span><FcApproval /></span></div>
                <div className="d-flex align-items-center location-icon-label">
                  {/* &nbsp;&nbsp;&nbsp; */}
                  <div className="location-icon-text">
                    <span className="ms-2"> <FaMapMarkerAlt /> {selectedProduct?.address?.city},&nbsp;{selectedProduct?.address?.state}</span>
                  </div>

                </div>

              </div>
            )}

            <div>
              <strong>Author Name:</strong>&nbsp;{selectedProduct?.authorName}
            </div>

            <div>
              <strong>Book Language:</strong>&nbsp;{selectedProduct?.language}
            </div>

            <p>{selectedProduct?.bookDescription}</p>
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
            // onClick={() => handelAdd(selectedProduct, quantity)}
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
