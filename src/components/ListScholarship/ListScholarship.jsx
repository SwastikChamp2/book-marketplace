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

    const [isValidName, setIsValidName] = useState(true);
    const [isValidBankName, setIsValidBankName] = useState(true);
    const [isImageFilled, setIsImageFilled] = useState(false);
    const [isFunded, setIsFunded] = useState(false);
    const [loading, setLoading] = useState(false);


    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [beneficiaryNameError, setBeneficiaryNameError] = useState("");
    const [schoolNameError, setschoolNameError] = useState("");
    const [tenthMarksError, setTenthMarksError] = useState("");
    const [twelvethMarksError, setTwelvethMarksError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [aboutmeError, setaboutmeError] = useState("");
    const [needformoneyError, setNeedformoneyError] = useState("");
    const [bankAccountError, setbankAccountError] = useState("");
    const [IFSCCodeError, setIFSCCodeErrorr] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [moneyRequiredError, setMoneyRequiredError] = useState("");




    // const { logOut, user } = useUserAuth();
    let navigate = useNavigate();
    const trimmedName = Name.trim();



    const handleNameChange = (e) => {
        const inputValue = e.target.value;

        // Check for special characters using regular expression
        if (/[^a-zA-Z0-9\s]/.test(inputValue)) {
            setNameError("name cannot contain special characters.");
            setIsValidName(false);
        } else if (/  /.test(inputValue)) { // Check for consecutive two spaces
            setNameError("name cannot contain consecutive two spaces.");
            setIsValidName(false);
        } else if (inputValue.length > 200) { // Check for character limit
            setNameError("Maximum character limit exceeded (200 characters)");
            setIsValidName(false);
        } else {
            setNameError(""); // Clear error if input is valid
            setName(inputValue);
            setIsValidName(true);
        }
    };

    const HandleBeneficirayNameChange = (e) => {
        const inputValue = e.target.value;

        // Check for special characters using regular expression
        if (/[^a-zA-Z0-9\s]/.test(inputValue)) {
            setBeneficiaryNameError("name cannot contain special characters.");
            setIsValidBankName(false);
        } else if (/  /.test(inputValue)) { // Check for consecutive two spaces
            setBeneficiaryNameError("name cannot contain consecutive two spaces.");
            setIsValidBankName(false);
        } else if (inputValue.length > 200) { // Check for character limit
            setBeneficiaryNameError("Maximum character limit exceeded (200 characters)");
            setIsValidBankName(false);
        } else {
            setBeneficiaryNameError(""); // Clear error if input is valid
            setBankAccountName(inputValue);
            setIsValidBankName(true);
        }
    };

    const handleAgeChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue > 99 || inputValue <= 0) {
            setAgeError("Enter a Correct Age");
        } else {
            setAgeError("");
            setAge(inputValue);
        }
    };

    const handleTenthMarksChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue > 100 || inputValue <= 0) {
            setTenthMarksError("Marks cannot be more than 100 or less than 0");
        } else {
            setTenthMarksError("");
            setTenthMarks(inputValue);
        }
    };

    // Function to handle class 12th marks change and error checking
    const handleTwelvethMarksChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue > 100 || inputValue <= 0) {
            setTwelvethMarksError("Marks cannot be more than 100 or less than 0");
        } else {
            setTwelvethMarksError("");
            setTwelvethMarks(inputValue);
        }
    };

    // Function to handle school name change and error checking
    const handleSchoolNameChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 200) {
            setschoolNameError("Maximum character limit exceeded (200 characters)");
        } else {
            setschoolNameError("");
            setSchoolName(inputValue);
        }
    };

    const handleAboutChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 2000) {
            setaboutmeError("Maximum character limit exceeded (2000 characters)");
        } else {
            setaboutmeError("");
            setAboutDescription(inputValue);
        }
    };

    const handleNeedforMoneyChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length > 2000) {
            setNeedformoneyError("Maximum character limit exceeded (2000 characters)");
        } else {
            setNeedformoneyError("");
            setNeedforMoney(inputValue);
        }
    };

    const handleMoneyRequiredChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue > 100000000) {
            setMoneyRequiredError("Amount cannot be greater than 100,000,000");
        } else {
            setMoneyRequiredError("");
            setmoneyRequired(inputValue);
        }
    };

    const handleContactNumberChange = (e) => {
        const inputValue = e.target.value;
        if (!/^\d{10}$/.test(inputValue)) {
            setMobileError("Enter a valid 10-digit mobile number");
        } else {
            setMobileError("");
            setContactNumber(inputValue);
        }
    };

    // Function to handle bank account number change and error checking
    const handleBankAccountNumberChange = (e) => {
        const inputValue = e.target.value;
        if (!/^\d{11,17}$/.test(inputValue)) {
            setbankAccountError("Enter a valid bank account number");
        } else {
            setbankAccountError("");
            setBankAccountNumber(inputValue);
        }
    };

    // Function to handle IFSC code change and error checking
    const handleIFSCCodeChange = (e) => {
        const inputValue = e.target.value;
        if (!/^[A-Za-z]{4}[A-Za-z0-9]{7,13}$/.test(inputValue)) {
            setIFSCCodeErrorr("Enter a valid IFSC code");
        } else {
            setIFSCCodeErrorr("");
            setIFSCCode(inputValue);
        }
    };




    // const bankAccountRegex = /^\d{11,17}$/;
    // const ifscRegex = /^[A-Za-z]{4}[A-Za-z0-9]{7,13}$/;

    // // Validation for age
    // const handleAgeChange = (e) => {
    //     const inputValue = e.target.value;
    //     if (inputValue > 99) {
    //         setError("Enter a Correct Age");
    //     } else {
    //         setError("");
    //         setAge(inputValue);
    //     }
    // };

    // // Validation for 10th and 12th marks
    // const handleMarksChange = (e) => {
    //     const inputValue = e.target.value;
    //     if (inputValue > 100) {
    //         setError("Marks cannot be more than 100");
    //     } else {
    //         setError("");
    //         // Set the marks state based on the input
    //     }
    // };

    // // Validation for bank account number
    // const handleBankAccountChange = (e) => {
    //     const inputValue = e.target.value;
    //     if (!bankAccountRegex.test(inputValue)) {
    //         setError("Enter a valid bank account number");
    //     } else {
    //         setError("");
    //         setBankAccountNumber(inputValue);
    //     }
    // };

    // // Validation for IFSC code
    // const handleIFSCChange = (e) => {
    //     const inputValue = e.target.value;
    //     if (!ifscRegex.test(inputValue)) {
    //         setError("Enter a valid IFSC code");
    //     } else {
    //         setError("");
    //         setIFSCCode(inputValue);
    //     }
    // };

    // // Validation for character limits
    // const handleDescriptionChange = (e) => {
    //     const inputValue = e.target.value;
    //     if (inputValue.length > 2000) {
    //         setError("Maximum character limit exceeded (2000 characters)");
    //     } else {
    //         setError("");
    //         setAboutDescription(inputValue);
    //     }
    // };

    // // Validation for other fields with 200 character limit
    // const handleInputChange = (setter, value) => {
    //     if (value.length > 200) {
    //         setError("Maximum character limit exceeded (200 characters)");
    //     } else {
    //         setError("");
    //         setter(value);
    //     }
    // };





    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!error) {

            setError("");
            const sanitizedName = trimmedName.replace(/\s/g, "-");
            const documentId = `${sanitizedName.substring(0, 25)}---${uuidv4()}`;


            if (!isValidName) {
                toast.error("Enter a Valid name");
                return;
            }

            if (!isImageFilled) {
                toast.error("Please upload an image");
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
                    isFunded,


                    // Add more fields as needed
                });
                // Redirect the user to a different page after successful submission
                navigate("/fund-education");
            } catch (error) {
                setError("Error occurred while creating listing. Please try again.");
                console.error("Error adding document: ", error);
            }


        }




    };

    const renderTooltip = (message) => (
        <Tooltip id="button-tooltip">{message}</Tooltip>
    );


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
                                setIsImageFilled(true);
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
                            isInvalid={!isValidName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {nameError}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicAge">
                        <Form.Label>Age: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Age"
                            onChange={handleAgeChange}
                            isInvalid={!!ageError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {ageError}
                        </Form.Control.Feedback>
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
                            placeholder="Enter 10th Marks"
                            onChange={handleTenthMarksChange}
                            isInvalid={!!tenthMarksError}
                            required

                        />
                        <Form.Control.Feedback type="invalid">
                            {tenthMarksError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasic12Marks">
                        <Form.Label>Class 12th Marks: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter 12th Marks"
                            onChange={handleTwelvethMarksChange}
                            isInvalid={!!twelvethMarksError}
                            required

                        />
                        <Form.Control.Feedback type="invalid">
                            {twelvethMarksError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSchool">
                        <Form.Label>Name of School/College: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter School/College Name"
                            onChange={handleSchoolNameChange}
                            isInvalid={!!schoolNameError}
                            required

                        />
                        <Form.Control.Feedback type="invalid">
                            {schoolNameError}
                        </Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicStandard">
                        <Form.Label>Enter Standard: <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => setStandard(e.target.value)}
                            required
                        >
                            <option value="">Select Standard</option>
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
                            onChange={handleAboutChange}
                            isInvalid={!!aboutmeError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {aboutmeError}
                        </Form.Control.Feedback>
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
                                onChange={handleMoneyRequiredChange}
                                isInvalid={!!moneyRequiredError}
                                required
                            />

                        </OverlayTrigger>
                        <Form.Control.Feedback type="invalid">
                            {moneyRequiredError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNeedforMoney">
                        <Form.Label>Why do you need the money ? <span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us about yourself"
                            onChange={handleNeedforMoneyChange}
                            isInvalid={!!needformoneyError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {needformoneyError}
                        </Form.Control.Feedback>
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
                            onChange={HandleBeneficirayNameChange}
                            isInvalid={!isValidBankName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {beneficiaryNameError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaymentAccountNumber">
                        <Form.Label>Account Number<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Bank Account Number"
                            onChange={handleBankAccountNumberChange}
                            isInvalid={!!bankAccountError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {bankAccountError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPaymentIFSCCode">
                        <Form.Label>IFSC Code<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the IFSC Code"
                            onChange={handleIFSCCodeChange}
                            isInvalid={!!IFSCCodeError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {IFSCCodeError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div style={{ marginBottom: "30px" }}></div>
                    <Form.Label style={{ fontSize: "20px", color: "gray" }}>Contact Details</Form.Label>
                    <div style={{ marginBottom: "20px" }}></div>

                    <Form.Group className="mb-3" controlId="formContactMobile">
                        <Form.Label>Contact Number<span className="required-indicator">*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Contact Number"
                            onChange={handleContactNumberChange}
                            isInvalid={!!mobileError}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {mobileError}
                        </Form.Control.Feedback>
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