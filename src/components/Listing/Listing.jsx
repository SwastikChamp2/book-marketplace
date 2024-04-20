import React, { useState } from "react";
import { Form, Alert, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Listing.css"; 
// import { useUserAuth } from "../context/UserAuthContext";

const Listing = () => {
  const [bookPicture, setBookPicture] = useState("");
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [condition, setCondition] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [advertiseHomepage, setAdvertiseHomepage] = useState(false);
  const [advertiseFeatured, setAdvertiseFeatured] = useState(false);
  const [ageGroup, setAgeGroup] = useState("");
  const [educationStandard, setEducationStandard] = useState("");
  const [error, setError] = useState("");
  // const { logOut, user } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Add your logic here to handle form submission
  };

  const renderTooltip = (message) => (
    <Tooltip id="button-tooltip">{message}</Tooltip>
  );

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
      style={{ width: 'calc(33.33% - 6px)' }} // Adjust width as needed
    />
    <Form.Control
      className="me-2"
      type="number"
      placeholder="Breadth"
      style={{ width: 'calc(33.33% - 6px)' }} // Adjust width as needed
    />
    <Form.Control
      type="number"
      placeholder="Height"
      style={{ width: 'calc(33.33% - 6px)' }} // Adjust width as needed
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

          <Form.Group className="mb-3" controlId="formBasicAgeGroup">
            <Form.Label>Suggested Age Group for the Book:</Form.Label>
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
            <Form.Label>Suggested Standard for (Study Books):</Form.Label>
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
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvertiseHomepage">
            <Form.Label>Book Advertisement <br /></Form.Label>
            <Form.Check
              className="book-advertisement-label"
              type="checkbox"
              label="Do you want to run paid advertisement of your book in the Home Page's New Arrival Section?"
              onChange={(e) => setAdvertiseHomepage(e.target.checked)}
            />
            {/* <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip("Your book will be featured in the New Arrival Page for the entire day of the date selected")}
            ></OverlayTrigger> */}
            {advertiseHomepage && (
              <Form.Control
                className="book-advertisement-control"
                type="date"
                onChange={(e) => console.log(e.target.value)}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAdvertiseFeatured">
            <Form.Check
              className="book-advertisement-label"
              type="checkbox"
              label="Do you want to run paid advertisement of your book in the Home Page's Best Sales Section?"
              onChange={(e) => setAdvertiseFeatured(e.target.checked)}
            />
            {advertiseFeatured && (
              <Form.Control
                className="book-advertisement-control"
                type="date"
                onChange={(e) => console.log(e.target.value)}
              />
            )}
          </Form.Group>

          <div className="d-grid gap-2 btn-container">
            <Button variant="primary" type="submit">
              Create Listing
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Listing;