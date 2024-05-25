import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Cart = () => {

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);




  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty. Add items to the cart before proceeding to checkout.", {
        autoClose: 3000 // 1000 milliseconds = 1 seconds
      });
      return;
    }
    navigate('/checkout');
  };

  const fetchCartItems = async () => {
    try {
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
        setLoading(false); // Set loading to false after data is fetched
      } else {
        console.log("User document does not exist");
        setLoading(false); // Set loading to false if user document does not exist
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user data from Firestore
        fetchCartItems();
      } else {
        // Redirect to login page if user is not authenticated
        navigate('/login');
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [auth, navigate]);


  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       // Fetch the current user's document from the "Users" collection
  //       const user = auth.currentUser; // Assuming you have Firebase authentication set up
  //       if (!user) {
  //         throw new Error("User not authenticated");
  //       }

  //       const userDocRef = doc(db, "Users", user.email);
  //       const userDocSnap = await getDoc(userDocRef);
  //       if (userDocSnap.exists()) {
  //         const cartMap = userDocSnap.data().cart || {};
  //         const cartItemKeys = Object.keys(cartMap);
  //         const cartItemsData = cartItemKeys.map((bookId) => {
  //           return { id: bookId, userSetQuantity: cartMap[bookId][1] };
  //         });
  //         setCartItems(cartItemsData);
  //       } else {
  //         console.log("User document does not exist");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart items:", error);
  //     }
  //   };

  //   fetchCartItems();
  // }, []);



  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseInt(item.sellingPrice);
    });
    setTotalPrice(totalPrice);
  }, [cartItems]);

  if (loading) {
    return <Loader />;
  }

  const handleDeleteCartItem = async (bookId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const userDocRef = doc(db, "Users", user.email);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const newCart = { ...userData.cart };
        delete newCart[bookId];
        await updateDoc(userDocRef, { cart: newCart });

        // Update local state to remove deleted item
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== bookId));

        // Dispatch action to remove item from Redux store
        dispatch(deleteProduct({ id: bookId }));

        toast.success("Item removed from cart successfully!");
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      toast.error("Failed to remove item from cart");
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
            {cartItems.map((item, index) => (
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
                          ₹{item.sellingPrice}.00

                        </h4>
                      </Col>
                      {/* <Col xs={12} sm={3} className="cartControl">
                        <button
                          className="incCart"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <input
                          className="qty-input"
                          type="number"
                          value={item.userSetQuantity}
                          readOnly
                        />
                        <button
                          className="desCart"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      </Col> */}
                    </Row>
                  </Col>
                  <button
                    className="delete"
                    onClick={() => handleDeleteCartItem(item.id)}
                  >
                    <ion-icon name="close"></ion-icon>
                  </button>
                </Row>
              </div>
            ))}
          </Col>
          <Col md={4} className="text-center">
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>₹{totalPrice}.00</h3>
              </div>
            </div>

            <Button
              style={{ backgroundColor: "#0f3460" }}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
