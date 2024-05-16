import React, { useState, useEffect } from "react";
import { Form, Alert, Button, Tooltip, OverlayTrigger, Modal } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Cropper from "react-easy-crop";
import { cropImage } from "../../utils/cropUtils";
import { getCroppedImg } from "../../utils/cropUtils";
import ImageUploading from "react-images-uploading";


import "./ListScholarship.css";


const ImageUploadingButton = ({ value, onChange, ...props }) => {
    return (
        <ImageUploading value={value} onChange={onChange}>
            {({ onImageUpload, onImageUpdate }) => (
                <Button
                    color="primary"
                    onClick={value ? onImageUpload : () => onImageUpdate(0)}
                    {...props}
                >
                    Upload
                </Button>
            )}
        </ImageUploading>
    );
};


const ImageCropper = ({
    open,
    image,
    onComplete,
    containerStyle,
    ...props
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Crop Image</DialogTitle>

            <DialogContent>
                <div style={containerStyle}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={(_, croppedAreaPixels) => {
                            setCroppedAreaPixels(croppedAreaPixels);
                        }}
                        onZoomChange={setZoom}
                        {...props}
                    />
                </div>
            </DialogContent>

            <DialogActions>
                <Button
                    color="primary"
                    onClick={() => {
                        onComplete(cropImage(image, croppedAreaPixels, console.log));

                    }}
                >
                    Finish
                </Button>
            </DialogActions>
        </Dialog>
    );
};


const ListScholarship = () => {
    const auth = getAuth(); // Get the authentication service
    const db = getFirestore(); // Initialize Firestore




    const [profilePicture, setProfilePicture] = useState("");
    const [image, setImage] = useState([]);
    const [croppedImage, setCroppedImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);


    const [Name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [standard, setStandard] = useState("");
    const [aboutDescription, setAboutDescription] = useState("");
    const [tenthMarks, setTenthMarks] = useState("");
    const [twelvethMarks, setTwelvethMarks] = useState("");
    const [schoolName, setSchoolName] = useState("");


    const [needForMoney, setNeedforMoney] = useState("");
    const [moneyRequired, setmoneyRequired] = useState("");

    const [religion, setReligion] = useState("");
    const [caste, setCaste] = useState("");

    const [BankAccountName, setBankAccountName] = useState("");
    const [BankAccountNumber, setBankAccountNumber] = useState("");
    const [IFSCCode, setIFSCCode] = useState("");

    const [contactNumber, setContactNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const [quantityError, setQuantityError] = useState("");
    const [error, setError] = useState("");


    const [isValidName, setIsValidName] = useState(true);
    const [isFunded, setIsFunded] = useState(false);
    const [loading, setLoading] = useState(false);


    // const { logOut, user } = useUserAuth();
    let navigate = useNavigate();
    const trimmedName = Name.trim();



    const handleNameChange = (e) => {
        const inputValue = e.target.value;

        // Check for special characters using regular expression
        if (/[^a-zA-Z0-9\s]/.test(inputValue)) {
            setError("Book name cannot contain special characters.");
            setIsValidName(false);
        } else if (/  /.test(inputValue)) { // Check for consecutive two spaces
            setError("Book name cannot contain consecutive two spaces.");
            setIsValidName(false);
        } else {
            setError(""); // Clear error if input is valid
            setName(inputValue);
            setIsValidName(true);
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");


        const sanitizedName = trimmedName.replace(/\s/g, "-");
        const documentId = `${sanitizedName.substring(0, 25)}---${uuidv4()}`;


        if (!isValidName) {
            toast.error("Enter a Valid Book Name");
            return;
        }


        try {
            // Store all the input data in the "BookListing" collection
            await setDoc(doc(db, "Students", documentId), {
                profilePicture,
                ProfileID: documentId,
                Name: trimmedName,
                uploadedby: auth.currentUser.email,
                aboutDescription,
                age,
                standard,
                aboutDescription,
                tenthMarks,
                twelvethMarks,
                schoolName,
                needForMoney,
                moneyRequired,
                caste,
                religion,
                BankAccountNumber,
                IFSCCode,
                contactEmail,
                contactNumber,


                // Add more fields as needed
            });
            // Redirect the user to a different page after successful submission
            navigate("/fund-education");
        } catch (error) {
            setError("Error occurred while creating listing. Please try again.");
            console.error("Error adding document: ", error);
        }




    };

    const renderTooltip = (message) => (
        <Tooltip id="button-tooltip">{message}</Tooltip>
    );


    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfilePicture(reader.result);
    //             setShowModal(true); // Open modal for cropping
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };





    return (
        <>
            <div className="p-4 box form-container">
                <h2 className="mb-3 listing-form-heading">List a Scholarship Request</h2>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>


                    <Form.Group className="mb-3" controlId="formBasicProfilePicture">
                        <Form.Label>
                            Profile Picture: <span className="required-indicator">*</span>
                        </Form.Label>

                        <span style={{ marginRight: "10px" }}></span>

                        <ImageUploadingButton
                            value={image}
                            onChange={(newImage) => {
                                setDialogOpen(true);
                                setImage(newImage);
                            }}
                        />

                        {croppedImage && (
                            <div className="cropped-image-image-container">
                                <img src={croppedImage} alt="Profile" />
                            </div>
                        )}
                    </Form.Group>


                    <ImageCropper
                        open={dialogOpen}
                        image={image.length > 0 && image[0].dataURL}
                        onComplete={(imagePromisse) => {
                            imagePromisse.then((image) => {
                                setCroppedImage(image);
                                setDialogOpen(false);
                                setProfilePicture(image);
                            });
                        }}
                        containerStyle={{
                            position: "relative",
                            width: "100%",
                            height: 300,
                            background: "#333"
                        }}
                    />




                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            onChange={handleNameChange}
                            required
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Age: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Age"
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicGender">
                        <Form.Label>Gender: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Non Binary</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasic10Marks">
                        <Form.Label>Class 10th Marks: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter School/College Name"
                            onChange={(e) => setTenthMarks(e.target.value)}
                            required

                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic12Marks">
                        <Form.Label>Class 12th Marks: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter School/College Name"
                            onChange={(e) => setTwelvethMarks(e.target.value)}
                            required

                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSchool">
                        <Form.Label>Name of School/College: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter School/College Name"
                            onChange={(e) => setSchoolName(e.target.value)}
                            required

                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicStandard">
                        <Form.Label>Enter Standard: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => setStandard(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option>Pre School</option>
                            <option>Class 1</option>
                            <option>Class 2</option>
                            <option>Class 3</option>
                            <option>Class 4</option>
                            <option>Class 5</option>
                            <option>Class 6</option>
                            <option>Class 7</option>
                            <option>Class 8</option>
                            <option>Class 9</option>
                            <option>Class 10</option>
                            <option>Class 11</option>
                            <option>Class 12</option>
                            <option>Under Graduate</option>
                            <option>Post Graduate</option>
                            <option>Masters</option>
                            <option>PHD</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicAboutDescription">
                        <Form.Label>About Me: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself"
                            onChange={(e) => setAboutDescription(e.target.value)}
                            required
                        />
                    </Form.Group>



                    {/* <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("This is the price that will be striked and your selling price will be shown. Lower is your price from the market price, quicker the book sells.")}
                    >
                        <Form.Control
                            type="number"
                            placeholder="Enter Market Price"
                            onChange={(e) => setMarketPrice(e.target.value)}
                            required
                        />
                    </OverlayTrigger> */}


                    <Form.Group className="mb-3 small-input" controlId="formBasicMoneyRequired">
                        <Form.Label>Money Required: <span className="required-indicator">*</span></Form.Label>
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip("How much money do you require to fund your education")}
                        >
                            <Form.Control
                                type="number"
                                placeholder="Enter the Amount"
                                onChange={(e) => setmoneyRequired(e.target.value)}
                                required
                            />
                        </OverlayTrigger>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNeedforMoney">
                        <Form.Label>Why do you need the money ? <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself"
                            onChange={(e) => setNeedforMoney(e.target.value)}
                            required
                        />
                    </Form.Group>


                    <Form.Group className="mb-3 small-input" controlId="formBasicReligion">
                        <Form.Label>Religion: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => setReligion(e.target.value)}
                            required
                        >
                            <option value="">Select Religion</option>
                            <option>Hindu</option>
                            <option>Muslim</option>
                            <option>Christian</option>
                            <option>Sikh</option>
                            <option>Jain</option>
                            <option>Parsi</option>
                            <option>Jew</option>
                            <option>Atheist</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3 small-input" controlId="formBasicCaste">
                        <Form.Label>Caste: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => setCaste(e.target.value)}
                            required
                        >
                            <option value="">Select Religion</option>
                            <option>General</option>
                            <option>SC</option>
                            <option>ST</option>
                            <option>OBC</option>
                        </Form.Control>
                    </Form.Group>

                    <div style={{ marginBottom: "30px" }}></div>
                    <Form.Label style={{ fontSize: "20px", color: "gray" }}>
                        Payment Details for Fund Transfer
                    </Form.Label>
                    <div style={{ marginBottom: "20px" }}></div>


                    <Form.Group className="mb-3" controlId="formPaymentName">
                        <Form.Label>Beneficiary Name<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Beneficiary Name"
                            onChange={(e) => setBankAccountName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaymentAccountNumber">
                        <Form.Label>Account Number<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Bank Account Number"
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaymentIFSCCode">
                        <Form.Label>IFSC Code<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the IFSC Code"
                            onChange={(e) => setIFSCCode(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div style={{ marginBottom: "30px" }}></div>
                    <Form.Label style={{ fontSize: "20px", color: "gray" }}>Contact Details</Form.Label>
                    <div style={{ marginBottom: "20px" }}></div>

                    <Form.Group className="mb-3" controlId="formContactMobile">
                        <Form.Label>Contact Number<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Contact Number"
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formContactEmail">
                        <Form.Label>Contact Email<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Contact Number"
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                    </Form.Group>


                    <div className="d-grid gap-2 btn-container">
                        <Button className="listing-submit-button" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default ListScholarship;