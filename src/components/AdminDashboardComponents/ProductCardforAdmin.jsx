import { Col, Button } from "react-bootstrap";
import "../ProductCard/product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaRegCopy } from 'react-icons/fa';



const ProductCardforAdmin = ({ title, productItem }) => {
    const dispatch = useDispatch();
    const router = useNavigate();
    const auth = getAuth();
    const db = getFirestore();


    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Text Copied');
    };


    const handelClick = (bookID) => {
        router(`/shop/${bookID}`);
    };


    const handleIgnore = async () => {
        try {
            const docRef = doc(db, "BookListing", productItem.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const newReportCount = (data.bookReported || 0) - 1000; // Decreament  by 1000 pushing down the rank below zero
                await updateDoc(docRef, { bookReported: newReportCount });
                toast.success("Product Listing Reported");
                window.location.reload();
            } else {
                console.error("Document does not exist");
                toast.error("Failed to report product listing");
            }
        } catch (error) {
            console.error("Error reporting product listing:", error);
            toast.error("Failed to report product listing");
        }
    };

    const handleDelete = async (bookID) => {
        try {
            await deleteDoc(doc(db, "BookListing", bookID));
            toast.success("Product has been deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product");
        }
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

            <div className="product-details">
                <h3 onClick={() => handelClick(productItem.id)}>{productItem.productName}</h3>

                <div>
                    <span><b>Email :</b><button className="icon-button" onClick={() => copyToClipboard(productItem.bookseller)}>
                        <FaRegCopy className="grey-copy-icon" />
                    </button> {productItem.bookseller}</span>

                </div>

                <div>
                    <span><b>ID :</b><button className="icon-button" onClick={() => copyToClipboard(productItem.id)}>
                        <FaRegCopy className="grey-copy-icon" />
                    </button> {productItem.id}</span>

                </div>

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

                </div>
                <div className="admin-buttons">
                    <Button variant="danger" onClick={() => handleDelete(productItem.id)}>Delete</Button>
                    <span style={{ marginRight: "5px" }}></span>
                    <Button variant="secondary" onClick={() => handleIgnore(productItem.id)}>Ignore</Button>
                </div>
            </div>
        </Col>

    );
};

export default ProductCardforAdmin;
