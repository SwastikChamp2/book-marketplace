import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
import Loader from '../components/Loader/Loader';
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from "react-toastify";
import './PagesCSS/Checkout.css'

const Checkout = () => {

    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        email: '',
        addressFirstLine: '',
        addressSecondLine: '',
        streetName: '',
        landmark: '',
        // district: '',
        city: '',
        state: ''
    });

    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(null);

    const fetchUserData = async () => {
        try {
            // Assuming you have Firebase auth set up and user is authenticated
            const userEmail = auth.currentUser.email; // Replace with user's email
            const db = getFirestore();
            const userDocRef = doc(db, 'Users', userEmail);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setUserData(userDocSnap.data());
            } else {
                console.log('User document does not exist');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
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

    const generateOrderId = () => {
        const min = 10000000; // Minimum 8-digit number
        const max = 99999999; // Maximum 8-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const handleCheckout = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User not authenticated");
            }

            // Fetch user data from Firestore
            const userDocRef = doc(db, 'Users', user.email);
            const userDocSnap = await getDoc(userDocRef);
            if (!userDocSnap.exists()) {
                throw new Error("User document not found");
            }
            const userData = userDocSnap.data();

            console.log("User Data:", userData);

            for (const item of cartItems) {

                const orderId = generateOrderId();

                const purchaseData = {
                    bookID: item.bookID,
                    orderID: orderId,
                    sellerAddress: {
                        addressFirstLine: item.address.firstLine,
                        addressSecondLine: item.address.secondLine,
                        streetName: item.address.streetName,
                        landmark: item.address.landmark,
                        pincode: item.address.pincode,
                        city: item.address.city,
                        state: item.address.state,
                    },
                    buyerAddress: {
                        addressFirstLine: userData.addressFirstLine,
                        addressSecondLine: userData.addressSecondLine,
                        streetName: userData.streetName,
                        landmark: userData.landmark,
                        pincode: userData.pincode,
                        city: userData.city,
                        state: userData.state,
                    },
                    bookseller: item.bookseller,
                    bookbuyer: user.email,
                    bookbuyerName: userData.name,
                    bookName: item.bookName,
                    bookPrice: item.sellingPrice,
                    bookWeight: item.weight,
                    bookDimension: {
                        length: item.dimensions.length,
                        breadth: item.dimensions.breadth,
                        height: item.dimensions.height,
                    },
                    timestamp: serverTimestamp(),
                };

                console.log("Purchase Data:", purchaseData);

                const docRef = await addDoc(collection(db, "PurchasedBooks"), purchaseData);
                console.log("Document written with ID:", docRef.id);
                toast("Document written with ID: ", docRef.id);
            }

            // Redirect or perform any other action after successful checkout
            navigate('/success'); // Redirect to success page
        } catch (error) {
            console.error("Error during checkout:", error);
            // Handle error (e.g., display error message to user)
            toast.error("Error during checkout. Please try again later.");
        }
    };






    useEffect(() => {
        // Check if the user is authenticated
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Fetch user data from Firestore
                fetchUserData();
                fetchCartItems();
            } else {
                // Redirect to login page if user is not authenticated
                navigate('/login');
            }
        });

        // Clean up the subscription
        return () => unsubscribe();
    }, [auth, navigate]);

    useEffect(() => {
        let totalPrice = null;
        cartItems.forEach((item) => {
            totalPrice += parseInt(item.sellingPrice);
        });
        setTotalPrice(totalPrice);
    }, [cartItems]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    if (loading) {
        return <Loader />; // You can replace this with a loading spinner or component
    }

    // // State htmlFor discount code input
    // const [discountCode, setDiscountCode] = useState('');
    // // State htmlFor displaying error messages
    // const [noDiscountCode, setNoDiscountCode] = useState(false);
    // const [invalidDiscountCode, setInvalidDiscountCode] = useState(false);

    // // Function to handle discount code input change
    // const handleDiscountCode = (e) => {
    //     setDiscountCode(e.target.value);
    // };

    // // Function to handle discount code submission
    // const handleDiscountClick = (e) => {
    //     e.preventDefault();
    //     if (!discountCode) {
    //         setNoDiscountCode(true);
    //         setInvalidDiscountCode(false);
    //     } else {
    //         // Assuming commerce object is defined elsewhere
    //         commerce.checkout.checkDiscount(tokenId, { code: discountCode })
    //             .then(res => {
    //                 if (!res.valid) {
    //                     setInvalidDiscountCode(true);
    //                 } else {
    //                     setInvalidDiscountCode(false);
    //                     // Assuming setLiveObject and setDiscountCode are defined elsewhere
    //                     setLiveObject(res.live);
    //                     setDiscountCode('');
    //                 }
    //                 setNoDiscountCode(false);
    //             })
    //             .catch(err => console.log(err));
    //     }
    // };

    return (
        <div className="maincontainer">

            <div className="container">
                <div className="py-5 text-center">

                    <h2>Checkout form</h2>

                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            Your cart
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {cartItems.map((item, index) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{item.bookName}</h6>
                                    </div>
                                    <span className="text-muted">₹{item.sellingPrice}</span>
                                </li>
                            ))}

                            {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Second product</h6>
                                    
                                </div>
                                <span className="text-muted">₹8</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Third item</h6>
                                    
                                </div>
                                <span className="text-muted">₹5</span>
                            </li> */}

                            {/* <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span className="text-success">-₹5</span>
                            </li> */}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>{totalPrice}</strong>
                            </li>
                        </ul>
                        {/* <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </form> */}
                    </div>

                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3"> Delivery Address</h4>
                        <form className="needs-validation" noValidate>
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="streetName"> <span className="text-muted"><b>Name</b></span> </label>
                                    <input type="text" className="form-control" id="name" name="name" placeholder=" " value={userData.name} onChange={handleInputChange} required />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label htmlFor="mobile"><span className="text-muted"><b>Mobile Number</b></span></label>
                                    <input type="tel" className="form-control" id="mobile" name="mobile" placeholder=" " value={userData.mobile} onChange={handleInputChange} pattern="[0-9]{10}" required />
                                    <div className="invalid-feedback">
                                        Valid Mobile Number is Required
                                    </div>
                                </div>

                            </div>


                            {/* <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required />
                                    <div className="invalid-feedback">
                                        Your username is required.
                                    </div>
                                </div>
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="email"> <span className="text-muted"><b>Email</b></span> </label>
                                <input type="email" className="form-control" id="email" name="email" placeholder=" " value={userData.email} onChange={handleInputChange} required />
                                <div className="invalid-feedback">
                                    Please enter a valid email address htmlFor shipping updates.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addressFirstLine"><span className="text-muted"><b>Address First Line</b></span></label>
                                <input type="text" className="form-control" id="addressFirstLine" name="addressFirstLine" placeholder=" " value={userData.addressFirstLine} onChange={handleInputChange} required />
                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="addressSecondLine"> <span className="text-muted"><b>Address Second Line</b></span> </label>
                                <input type="text" className="form-control" id="addressSecondLine" name="addressSecondLine" placeholder=" " value={userData.addressSecondLine} onChange={handleInputChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="streetName"> <span className="text-muted"><b>Street Name</b></span> </label>
                                <input type="text" className="form-control" id="streetName" name="streetName" placeholder=" " value={userData.streetName} onChange={handleInputChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="landmark"><span className="text-muted"><b>Landmark</b></span></label>
                                <input type="text" className="form-control" id="landmark" name="landmark" placeholder=" " value={userData.landmark} onChange={handleInputChange} required />
                            </div>

                            {/* <div className="mb-3">
                                <label htmlFor="district"><span className="text-muted"><b>District</b></span></label>
                                <input type="text" className="form-control" id="district" name="district" placeholder=" " value={userData.district} onChange={handleInputChange} required />
                            </div> */}

                            <div className="mb-3">
                                <label htmlFor="city"><span className="text-muted"><b>City or Region</b></span></label>
                                <input type="text" className="form-control" id="city" name="city" placeholder=" " value={userData.city} onChange={handleInputChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="state"><span className="text-muted"><b>State</b></span></label>
                                <input type="text" className="form-control" id="state" name="state" placeholder=" " value={userData.state} onChange={handleInputChange} required />
                            </div>


                            {/* <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div> */}

                            {/* <hr className="mb-4" /> */}

                            {/* <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="same-address" />
                                <label className="custom-control-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="save-info" />
                                <label className="custom-control-label" htmlFor="save-info">Save this information htmlFor next time</label>
                            </div>
                            <hr className="mb-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                                    <label className="custom-control-label" htmlFor="credit">Credit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="debit">Debit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                </div>
                            </div> */}

                            {/* <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-name">Name on card</label>
                                    <input type="text" className="form-control" id="cc-name" placeholder="" required />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-number">Credit card number</label>
                                    <input type="text" className="form-control" id="cc-number" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">Expiration</label>
                                    <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">CVV</label>
                                    <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4" /> */}

                            <div style={{ marginBottom: "20px" }}></div>

                            <div className="center-the-button" >
                                <button className="btn btn-primary btn-lg btn-block" type="button" style={{ backgroundColor: "#0f3460" }} onClick={handleCheckout}>Continue to checkout</button>
                            </div>

                            <div style={{ marginBottom: "50px" }}></div>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Checkout;