import React, { useState, useEffect } from "react";
import "./Listing.css";
import { Form, Alert, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Cropper from "react-easy-crop";
import { cropImage } from "../../utils/cropUtils";
import { getCroppedImg } from "../../utils/cropUtils";
import ImageUploading from "react-images-uploading";


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
            aspect={3 / 4}
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






// import { useUserAuth } from "../context/UserAuthContext";

const Listing = () => {
  const auth = getAuth(); // Get the authentication service
  const db = getFirestore(); // Initialize Firestore

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookQuantity, setQuantity] = useState("1");
  const [quantityError, setQuantityError] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [condition, setCondition] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [educationStandard, setEducationStandard] = useState("");
  const [educationBoard, setEducationBoard] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [error, setError] = useState("");
  const [showAddressFields, setShowAddressFields] = useState(true);
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [streetName, setStreetName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  // const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selfPickupOption, setSelfPickupOption] = useState(false);
  const [isValidBookName, setIsValidBookName] = useState(true);
  const [bookReported, setBookReported] = useState(0);
  const [isBookIgnored, setIsBookIgnored] = useState(false);

  const [bookPicture, setBookPicture] = useState("");
  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [advertiseBestSales, setAdvertiseBestSales] = useState(false);
  const [advertiseFeaturedBooks, setAdvertiseFeaturedBooks] = useState(false);
  const [advertiseBestSalesDate, setAdvertiseBestSalesDate] = useState([]);
  const [advertiseFeaturedBooksDate, setAdvertiseFeaturedBooksDate] = useState([]);
  const [eligibleMonths, setEligibleMonths] = useState([]);


  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isImageFilled, setIsImageFilled] = useState(false);


  // const { logOut, user } = useUserAuth();
  let navigate = useNavigate();
  const trimmedBookName = bookName.trim();

  // const handlePincodeChange = (data) => {
  //   setPincode(data);
  //   setError("");

  //   // Fetch city and state based on pincode
  //   const cityState = getCityState(data);
  //   if (cityState) {
  //     setCity(cityState.city);
  //     setState(cityState.state);
  //   } else {
  //     setCity("");
  //     setState("");
  //     setError("Invalid pincode.");
  //   }
  // };


  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);

    if (newQuantity < 1) {
      // Set quantity error message
      setQuantityError("Quantity must be 1 or more.");
      // Set quantity back to 1

    } else {
      // Clear quantity error message
      setQuantityError("");
      // Update quantity state
      setQuantity(newQuantity);
    }
  };


  const handleAdvertiseDateSelection = (isChecked, type) => {
    if (isChecked) {
      if (type === 'advertiseBestSales') {
        setAdvertiseBestSales(true);
      } else if (type === 'advertiseFeaturedBooks') {
        setAdvertiseFeaturedBooks(true);
      }
    } else {
      if (type === 'advertiseBestSales') {
        setAdvertiseBestSales(false);
        setAdvertiseBestSalesDate([]);
      } else if (type === 'advertiseFeaturedBooks') {
        setAdvertiseFeaturedBooks(false);
        setAdvertiseFeaturedBooksDate([]);
      }
    }
  };

  const handleAdvertiseDateChange = (date, type) => {
    if (type === 'advertiseBestSalesDate') {
      setAdvertiseBestSalesDate([date]);
    } else if (type === 'advertiseFeaturedBooksDate') {
      setAdvertiseFeaturedBooksDate([date]);
    }
  };

  const handleBookNameChange = (e) => {
    const inputValue = e.target.value;

    // Check for special characters using regular expression
    if (/[^a-zA-Z0-9\s]/.test(inputValue)) {
      setError("Book name cannot contain special characters.");
      setIsValidBookName(false);
    } else if (/  /.test(inputValue)) { // Check for consecutive two spaces
      setError("Book name cannot contain consecutive two spaces.");
      setIsValidBookName(false);
    } else {
      setError(""); // Clear error if input is valid
      setBookName(inputValue);
      setIsValidBookName(true);
    }
  };

  const handleSearch = () => {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => response.json())
      .then(data => {
        if (data[0].PostOffice && data[0].PostOffice.length) {
          const firstPostOffice = data[0].PostOffice[0];
          setCity(firstPostOffice.District);
          setState(firstPostOffice.State);
        } else {
          alert('Enter Valid pincode');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    if (pincode.trim() !== "" && pincode.trim().length === 6) {
      handleSearch();
    }
  }, [pincode]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const userEmail = auth.currentUser.email;
    const sanitizedBookName = trimmedBookName.replace(/\s/g, "-");
    const documentId = `${sanitizedBookName.substring(0, 25)}---${uuidv4()}`;


    if (!isValidBookName) {
      toast.error("Enter a Valid Book Name");
      return;
    }

    if (!isImageFilled) {
      toast.error("Please fill an image for the book");
      return;
    }

    if (parseInt(sellingPrice) > parseInt(marketPrice)) {
      toast.error("Selling Price must be lower than Market Price");
      return;
    }

    // Check if bookQuantity is less than or equal to 0
    if (parseInt(bookQuantity) < 0) {
      toast.error("Please enter a valid quantity greater than 0.");
      return;
    }

    try {
      // Store all the input data in the "BookListing" collection
      await setDoc(doc(db, "BookListing", documentId), {
        bookPicture,
        bookID: documentId,
        bookName: trimmedBookName,
        bookseller: auth.currentUser.email,
        authorName,
        bookDescription,
        bookQuantity,
        marketPrice,
        sellingPrice,
        bookReported,
        isBookIgnored,
        dimensions: {
          length: dimensions.length,
          breadth: dimensions.breadth,
          height: dimensions.height,
        },
        weight,
        condition,
        genre,
        language,
        selfPickupOption,
        advertiseBestSales,
        advertiseFeaturedBooks,
        ageGroup,
        educationStandard,
        educationBoard,
        schoolName,
        advertiseBestSalesDate,
        advertiseFeaturedBooksDate,
        address: {
          firstLine,
          secondLine,
          streetName,
          landmark,
          city,
          pincode,
          state,

        },
        // Add more fields as needed
      });
      // Redirect the user to a different page after successful submission
      navigate("/shop");
    } catch (error) {
      setError("Error occurred while creating listing. Please try again.");
      console.error("Error adding document: ", error);
    }




  };

  const renderTooltip = (message) => (
    <Tooltip id="button-tooltip">{message}</Tooltip>
  );

  const handleSelfPickupOption = (value) => {
    // setShowAddressFields(value);
    setSelfPickupOption(value);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    console.log("Cropped Image:", croppedImage);
    // You can set the cropped image state or perform any other action here
    setDialogOpen(false);
  };


  useEffect(() => {
    const fetchEligibleMonths = async () => {
      const q = query(collection(db, 'Date'), where('totalAds', '<', 6));
      const querySnapshot = await getDocs(q);
      const months = [];
      querySnapshot.forEach((doc) => {
        months.push(doc.id);
      });
      setEligibleMonths(months);
    };

    fetchEligibleMonths();
  }, []);

  const formatMonthYear = (monthYear) => {
    const [year, month] = monthYear.split('-');
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[monthIndex]} ${year}`;
  };







  return (
    <>
      <div className="p-4 box form-container">
        <h2 className="mb-3 listing-form-heading">Sell Book</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicBookPicture">
            <Form.Label>
              Book Picture: <span className="required-indicator">*</span>
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
                setBookPicture(image);
              });
            }}
            containerStyle={{
              position: "relative",
              width: "100%",
              height: 300,
              background: "#333"
            }}
          />


          <Form.Group className="mb-3" controlId="formBasicBookName">
            <Form.Label>Book Name: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Name"
              onChange={handleBookNameChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAuthorName">
            <Form.Label>Author Name: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Author Name"
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBookDescription">
            <Form.Label>Book Description: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Book Description"
              onChange={(e) => setBookDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 small-input" controlId="formBasicMarketPrice">
            <Form.Label>Book Market Price (in Rs): <span className="required-indicator">*</span></Form.Label>
            <OverlayTrigger
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
            </OverlayTrigger>
          </Form.Group>

          <Form.Group className="mb-3 small-input" controlId="formBasicSellingPrice">
            <Form.Label>Book Selling Price (in Rs): <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Selling Price"
              onChange={(e) => setSellingPrice(e.target.value)}
              required
            />
          </Form.Group>



          <Form.Group className="mb-3" controlId="formBasicDimensions">
            <Form.Label>Approximate Dimensions (in cms): <span className="required-indicator">*</span></Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                className="me-2"
                type="number"
                placeholder="Length"
                style={{ width: 'calc(33.33% - 6px)' }}
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                required
              />
              <Form.Control
                className="me-2"
                type="number"
                placeholder="Breadth"
                style={{ width: 'calc(33.33% - 6px)' }}
                onChange={(e) => setDimensions({ ...dimensions, breadth: e.target.value })}
                required
              />
              <Form.Control
                type="number"
                placeholder="Height"
                style={{ width: 'calc(33.33% - 6px)' }}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                required
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3 small-input" controlId="formBasicWeight">
            <Form.Label>Approximate Weight (in gms): <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Weight"
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCondition">
            <Form.Label>Condition of Book: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="">Select Condition</option>
              <option>New</option>
              <option>Great</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Decent</option>
              <option>Poor</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3 small-input" controlId="formBasicQuantity">
            <Form.Label>Quantity of Books Available:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Quantity"
              onChange={handleQuantityChange}
              defaultValue={1}
              required
            />
            {quantityError && (
              <Form.Text className="text-danger">{quantityError}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGenre">
            <Form.Label>Book Genre: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              <option value="">Select Genre</option>
              <option>Study Books</option>
              <option>Educational</option>
              <option>Comic</option>
              <option>Adventure</option>
              <option>Romance</option>
              <option>Action</option>
              <option>Fiction</option>
              <option>Non Fiction</option>
              <option>Kids</option>
              <option>Articles</option>
              <option>Research Paper</option>
              <option>Notes</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLanguage">
            <Form.Label>Book Language: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="">Select Language</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Sanskrit</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>German</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Japanese</option>
              <option>Korean</option>
              <option>Mandarin</option>
              {/* Add other foreign languages */}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAvailability">
            <Form.Label>Is this book available for Self Pickup?</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="availability"
                id="yes"
                onChange={() => handleSelfPickupOption(true)}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="availability"
                id="no"
                onChange={() => handleSelfPickupOption(false)}
              />
            </div>
          </Form.Group>

          <Form.Label>Book Pickup Address </Form.Label>
          <div style={{ marginBottom: "10px" }}></div>




          <Form.Group className="mb-3" controlId="formAddressBasicFirstLine">
            <Form.Label style={{ fontWeight: 'normal' }}>First Line of Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Line of Address"
              onChange={(e) => setFirstLine(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddressSecondLine">
            <Form.Label style={{ fontWeight: 'normal' }}>Second Line of Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Line of Address"
              onChange={(e) => setSecondLine(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddressStreetName">
            <Form.Label style={{ fontWeight: 'normal' }}>Street Name (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Street Name"
              onChange={(e) => setStreetName(e.target.value)}

            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddressLandmark">
            <Form.Label style={{ fontWeight: 'normal' }}>Landmark (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Landmark"
              onChange={(e) => setLandmark(e.target.value)}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formAddressDistrict">
                <Form.Label style={{ fontWeight: 'normal' }}>District</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter District"
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
              </Form.Group> */}

          <Form.Group className="mb-3 small-input" controlId="formBasicPincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => {
                const input = e.target.value;
                // Check if input is exactly 6 digits
                if (input.length === 6) {
                  // Validate input using regex
                  const isValidInput = /^[0-9]{6}$/.test(input);
                  if (isValidInput) {
                    setPincode(input);
                    setPincodeError("");

                  } else {
                    setPincodeError("Pincode must be a 6-digit number.");
                  }
                } else if (input.length < 6) {
                  setPincode(input);
                  setPincodeError("Pincode must be a 6-digit number.");
                }
              }}
              isInvalid={!!pincodeError}
            />
            <Form.Control.Feedback type="invalid">{pincodeError}</Form.Control.Feedback>
          </Form.Group>


          {loading && <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>}

          {!loading && (
            <>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label style={{ fontWeight: 'normal' }}>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label style={{ fontWeight: 'normal' }}>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled
                  required
                />
              </Form.Group>

            </>
          )}






          <Form.Group className="mb-3" controlId="formBasicAgeGroup">
            <Form.Label>Suggested Age Group for the Book (Optional)</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setAgeGroup(e.target.value)}

            >
              <option value="">Select Age Group</option>
              <option>0-5 years</option>
              <option>6-10 years</option>
              <option>11-14 years</option>
              <option>15-17 years</option>
              <option>18+ years</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEducationStandard">
            <Form.Label>Suggested Standard (For Study Books):</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setEducationStandard(e.target.value)}

            >
              <option value="">Select Education Standard</option>
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
              {/* Add more education standards */}
              <option>Engineering</option>
              <option>Medical</option>
              <option>Other College Streams</option>
              <option>Any</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBoard">
            <Form.Label>Name of the Board (For Study Books) </Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setEducationBoard(e.target.value)}

            >
              <option value="">Select Name of the Board </option>
              <option>CBSE</option>
              <option>ICSE</option>
              <option>State Board</option>
              <option>International Board</option>
              <option>Open School</option>
              <option>Private Education </option>
              <option>IBOSE</option>
              <option>CAIE</option>
              <option>CISCE</option>


            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBoard">
            <Form.Label>Name of School/College (For Study Books) </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter School/College Name"
              onChange={(e) => setSchoolName(e.target.value)}

            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvertiseBestSales">
            <Form.Label>Book Advertisement</Form.Label>
            {/* <Form.Check
              type="checkbox"
              label="Do you want to run paid advertisement of your book in the Home Page's Best Sales Section?"
              onChange={(e) => handleAdvertiseDateSelection(e.target.checked, 'advertiseBestSales')}
            />
            {advertiseBestSales && (
              <Form.Control
                type="date"
                onChange={(e) => handleAdvertiseDateChange(e.target.value, 'advertiseBestSalesDate')}
              />
            )} */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvertiseFeaturedBooks">
            <Form.Check
              type="checkbox"
              label="Do you want to run paid advertisement of your book in the Home Page's Featured Books Section?"
              onChange={(e) => handleAdvertiseDateSelection(e.target.checked, 'advertiseFeaturedBooks')}
            />
            {advertiseFeaturedBooks && (
              <Form.Control
                as="select"
                onChange={(e) => handleAdvertiseDateChange(e.target.value, 'advertiseFeaturedBooksDate')}
              >
                <option value="">Select a month</option>
                {eligibleMonths.map((month) => (
                  <option key={month} value={month}>
                    {formatMonthYear(month)}
                  </option>
                ))}
              </Form.Control>
            )}
          </Form.Group>

          <div className="d-grid gap-2 btn-container">
            <Button className="listing-submit-button" type="submit">
              Create Listing
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Listing;