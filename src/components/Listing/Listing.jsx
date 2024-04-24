import React, { useState } from "react";
import { Form, Alert, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


import "./Listing.css";
export const stateOptions = [
  '',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

// import { useUserAuth } from "../context/UserAuthContext";

const Listing = () => {
  const auth = getAuth(); // Get the authentication service
  const db = getFirestore(); // Initialize Firestore
  const [bookPicture, setBookPicture] = useState("");
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookQuantity, setQuantity] = useState("1");
  const [marketPrice, setMarketPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [condition, setCondition] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [educationStandard, setEducationStandard] = useState("");
  const [error, setError] = useState("");
  const [showAddressFields, setShowAddressFields] = useState("");
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [streetName, setStreetName] = useState("");
  const [landmark, setLandmark] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selfPickupOption, setSelfPickupOption] = useState(false);
  const [stateid, setstateid] = useState(0);


  const [advertiseBestSales, setAdvertiseBestSales] = useState(false);
  const [advertiseFeaturedBooks, setAdvertiseFeaturedBooks] = useState(false);
  const [advertiseBestSalesDate, setAdvertiseBestSalesDate] = useState([]);
  const [advertiseFeaturedBooksDate, setAdvertiseFeaturedBooksDate] = useState([]);

  // const { logOut, user } = useUserAuth();
  let navigate = useNavigate();



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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const userEmail = auth.currentUser.email;
    const sanitizedBookName = bookName.replace(/\s/g, "-");
    const documentId = sanitizedBookName.substring(0, 25) + "---" + userEmail;

    if (parseInt(sellingPrice) > parseInt(marketPrice)) {
      toast.error("Selling Price must be lower than Market Price");
      return;
    }

    try {
      // Store all the input data in the "BookListing" collection
      await setDoc(doc(db, "BookListing", documentId), {
        bookPicture,
        bookID: documentId,
        bookName,
        authorName,
        bookDescription,
        bookQuantity,
        marketPrice,
        sellingPrice,
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
        advertiseBestSalesDate,
        advertiseFeaturedBooksDate,
        address: {
          firstLine,
          secondLine,
          streetName,
          landmark,
          district,
          city,
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
    setShowAddressFields(value);
    setSelfPickupOption(value);
  };







  return (
    <>
      <div className="p-4 box form-container">
        <h2 className="mb-3 listing-form-heading">Sell Book</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicBookPicture">
            <Form.Label>Book Picture: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setBookPicture(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicBookName">
            <Form.Label>Book Name: <span className="required-indicator">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Name"
              onChange={(e) => setBookName(e.target.value)}
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
              onChange={(e) => setQuantity(e.target.value)}
              defaultValue={1}
              required
            />
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
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Kannada</option>
              {/* Add other Indian languages */}
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

          {showAddressFields && (
            <>
              <Form.Group className="mb-3" controlId="formAddressState">
                <Form.Label style={{ fontWeight: 'normal' }}>State</Form.Label>
                {/* <Form.Select onChange={(e) => setState(e.target.value)} required value={state}>
                  {stateOptions.map((option, index) => (
                    <option key={index} value={option}>{option || 'Select State/Union Territory'}</option>
                  ))}
                </Form.Select> */}
                <StateSelect
                  countryid={101}//County ID for India
                  onChange={(e) => {
                    setState(e.name);
                    setstateid(e.id);

                  }}
                  placeHolder="Select State"
                  required
                />
              </Form.Group>

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
                <Form.Label style={{ fontWeight: 'normal' }}>Street Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Street Name"
                  onChange={(e) => setStreetName(e.target.value)}
                  required
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

              <Form.Group className="mb-3" controlId="formAddressDistrict">
                <Form.Label style={{ fontWeight: 'normal' }}>District</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter District"
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddressCity">
                <Form.Label style={{ fontWeight: 'normal' }}>City</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                /> */}
                <CitySelect
                  countryid={101}
                  stateid={stateid}
                  onChange={(e) => {

                    setCity(e.name);

                  }}
                  placeHolder="Select City"
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
              onChange={(e) => setEducationStandard(e.target.value)}

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
              onChange={(e) => setAuthorName(e.target.value)}

            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvertiseBestSales">
            <Form.Label>Book Advertisement</Form.Label>
            <Form.Check
              type="checkbox"
              label="Do you want to run paid advertisement of your book in the Home Page's Best Sales Section?"
              onChange={(e) => handleAdvertiseDateSelection(e.target.checked, 'advertiseBestSales')}
            />
            {advertiseBestSales && (
              <Form.Control
                type="date"
                onChange={(e) => handleAdvertiseDateChange(e.target.value, 'advertiseBestSalesDate')}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvertiseFeaturedBooks">
            <Form.Check
              type="checkbox"
              label="Do you want to run paid advertisement of your book in the Home Page's Featured Books Section?"
              onChange={(e) => handleAdvertiseDateSelection(e.target.checked, 'advertiseFeaturedBooks')}
            />
            {advertiseFeaturedBooks && (
              <Form.Control
                type="date"
                onChange={(e) => handleAdvertiseDateChange(e.target.value, 'advertiseFeaturedBooksDate')}
              />
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