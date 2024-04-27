import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Cart = () => {

  const auth = getAuth();
  const db = getFirestore();

  const { cartList } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = (index) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems];
      const maxQuantity = newCartItems[index][0]; // Get max quantity from the first element of the array
      let currentQuantity = newCartItems[index][1]; // Get current quantity from the second element of the array
      if (currentQuantity < maxQuantity) {
        currentQuantity += 1; // Increase quantity by 1
        newCartItems[index][1] = currentQuantity; // Update quantity in the cart array
      } else {
        toast.error("The seller does not have the required quantity for the requested product");
      }
      return newCartItems;
    });
  };

  const handleDecreaseQuantity = (index) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems];
      let currentQuantity = newCartItems[index][1]; // Get current quantity from the second element of the array
      if (currentQuantity > 1) {
        currentQuantity -= 1; // Decrease quantity by 1 if it's greater than 1
        newCartItems[index][1] = currentQuantity; // Update quantity in the cart array
      } else {
        toast.error("The quantity set by user cannot be 0 or less");
      }
      return newCartItems;
    });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Fetch the current user's document from the "Users" collection
        const user = auth.currentUser; // Assuming you have Firebase authentication set up
        if (!user) {
          throw new Error("User not authenticated");
        }

        const userDocRef = doc(db, "Users", user.email);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const cartMap = userDocSnap.data().cart || {};
          const cartItemKeys = Object.keys(cartMap);
          const promises = cartItemKeys.map(async (bookId) => {
            const bookDocRef = doc(db, "BookListing", bookId);
            const bookDocSnap = await getDoc(bookDocRef);
            const bookData = bookDocSnap.exists() ? bookDocSnap.data() : null;
            return bookData ? { id: bookId, ...bookData } : null;
          });
          const cartItemsData = await Promise.all(promises);
          setCartItems(cartItemsData.filter(Boolean));
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);


  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartItems.length === 0 && (
              <h1 className="no-items product">No Items are added in Cart</h1>
            )}
            {cartItems.map((item) => {
              const productQty = quantity * item.sellingPrice;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.bookPicture} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.bookName}</h3>
                          <h4>
                            ₹{item.sellingPrice}.00 * {item.quantity}
                            <span>₹{productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => handleIncreaseQuantity()}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>

                          <button
                            className="desCart"
                            onClick={() => handleDecreaseQuantity()}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>
                  ₹{cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0)}.00
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
