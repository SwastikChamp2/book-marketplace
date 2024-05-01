import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Form, Input, Dropdown } from 'semantic-ui-react';
import Loader from '../components/Loader/Loader';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
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
        district: '',
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

    // // State for discount code input
    // const [discountCode, setDiscountCode] = useState('');
    // // State for displaying error messages
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

            <div class="container">
                <div class="py-5 text-center">

                    <h2>Checkout form</h2>

                </div>
                <div class="row">
                    <div class="col-md-4 order-md-2 mb-4">
                        <h4 class="d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted">Your cart</span>
                            <span class="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul class="list-group mb-3">
                            {cartItems.map((item, index) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{item.bookName}</h6>
                                    </div>
                                    <span className="text-muted">₹{item.sellingPrice}</span>
                                </li>
                            ))}

                            {/* <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Second product</h6>
                                    
                                </div>
                                <span class="text-muted">₹8</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">Third item</h6>
                                    
                                </div>
                                <span class="text-muted">₹5</span>
                            </li> */}

                            {/* <li class="list-group-item d-flex justify-content-between bg-light">
                                <div class="text-success">
                                    <h6 class="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span class="text-success">-₹5</span>
                            </li> */}
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total</span>
                                <strong>{totalPrice}</strong>
                            </li>
                        </ul>
                        {/* <form class="card p-2">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Promo code" />
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </form> */}
                    </div>

                    <div class="col-md-8 order-md-1">
                        <h4 class="mb-3">Billing address</h4>
                        <form class="needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="Name">Name</label>
                                    <input type="text" className="form-control" id="Name" name="name" placeholder=" " value={userData.name} onChange={handleInputChange} required />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="mobile">Mobile Number</label>
                                    <input type="tel" className="form-control" id="mobile" name="mobile" placeholder=" " value={userData.mobile} onChange={handleInputChange} pattern="[0-9]{10}" required />
                                    <div class="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                            </div>


                            {/* <div class="mb-3">
                                <label for="username">Username</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">@</span>
                                    </div>
                                    <input type="text" class="form-control" id="username" placeholder="Username" required />
                                    <div class="invalid-feedback">
                                        Your username is required.
                                    </div>
                                </div>
                            </div> */}
                            <div class="mb-3">
                                <label for="email">Email </label>
                                <input type="email" className="form-control" id="email" name="email" placeholder=" " value={userData.email} onChange={handleInputChange} required />
                                <div class="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="addressFirstLine">Address First Line</label>
                                <input type="text" className="form-control" id="addressFirstLine" name="addressFirstLine" placeholder=" " value={userData.addressFirstLine} onChange={handleInputChange} required />
                                <div class="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="addressSecondLine">Address Second Line </label>
                                <input type="text" class="form-control" id="addressSecondLine" name="addressSecondLine" placeholder=" " value={userData.addressSecondLine} onChange={handleInputChange} required />
                            </div>

                            <div class="mb-3">
                                <label for="streetName">Street Name </label>
                                <input type="text" class="form-control" id="streetName" name="streetName" placeholder=" " value={userData.streetName} onChange={handleInputChange} required />
                            </div>

                            <div class="mb-3">
                                <label for="landmark">Landmark</label>
                                <input type="text" class="form-control" id="landmark" name="landmark" placeholder=" " value={userData.landmark} onChange={handleInputChange} required />
                            </div>

                            <div class="mb-3">
                                <label for="district">District</label>
                                <input type="text" class="form-control" id="district" name="district" placeholder=" " value={userData.district} onChange={handleInputChange} required />
                            </div>

                            <div class="mb-3">
                                <label for="city">City</label>
                                <input type="text" class="form-control" id="city" name="city" placeholder=" " value={userData.city} onChange={handleInputChange} required />
                            </div>

                            <div class="mb-3">
                                <label for="state">State</label>
                                <input type="text" class="form-control" id="state" name="state" placeholder=" " value={userData.state} onChange={handleInputChange} required />
                            </div>


                            {/* <div class="row">
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select class="custom-select d-block w-100" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select class="custom-select d-block w-100" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input type="text" class="form-control" id="zip" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div> */}

                            {/* <hr class="mb-4" /> */}

                            {/* <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="same-address" />
                                <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="save-info" />
                                <label class="custom-control-label" for="save-info">Save this information for next time</label>
                            </div>
                            <hr class="mb-4" />
                            <h4 class="mb-3">Payment</h4>
                            <div class="d-block my-3">
                                <div class="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required />
                                    <label class="custom-control-label" for="credit">Credit card</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required />
                                    <label class="custom-control-label" for="debit">Debit card</label>
                                </div>
                                <div class="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required />
                                    <label class="custom-control-label" for="paypal">Paypal</label>
                                </div>
                            </div> */}

                            {/* <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="" required />
                                    <small class="text-muted">Full name as displayed on card</small>
                                    <div class="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div> */}

                            {/* <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="cc-expiration">Expiration</label>
                                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="cc-expiration">CVV</label>
                                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                                    <div class="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>
                            </div>
                            <hr class="mb-4" /> */}

                            <div style={{ marginBottom: "20px" }}></div>

                            <div className="center-the-button" >
                                <button class="btn btn-primary btn-lg btn-block" type="button" style={{ backgroundColor: "#0f3460" }}>Continue to checkout</button>
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