import React, { useState } from 'react';
import { Col, Form, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { FaRegCopy } from 'react-icons/fa';
import { IoSearchSharp } from "react-icons/io5";
import "./AdminComponent.css";

function SearchBooks() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Text Copied');
    };

    const handleSearch = async () => {
        try {
            const db = getFirestore();
            const bookDocRef = doc(db, 'BookListing', searchQuery);
            const bookDocSnapshot = await getDoc(bookDocRef);

            if (bookDocSnapshot.exists()) {
                const bookData = bookDocSnapshot.data();
                setSearchResults({ id: bookDocSnapshot.id, name: bookData.bookName, seller: bookData.bookseller });
            } else {
                setSearchResults(null);
            }
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    return (
        <div className="p-4">
            <h2>Search Book Listings</h2>
            <div style={{ marginBottom: "40px" }}></div>

            <Form.Group controlId="formSearch" className="mb-3">
                <Col xs={12} md={8}>
                    <InputGroup>

                        <FormControl
                            type="text small-input"
                            placeholder="Enter book ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ borderTopRightRadius: '5', borderBottomRightRadius: '5' }}
                        />

                        <button className="search-icon-button" onClick={handleSearch}>
                            <IoSearchSharp />
                        </button>
                    </InputGroup>
                </Col>
            </Form.Group>


            <div className="mt-3">
                {searchResults ? (
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>{searchResults.name}</Card.Title>
                            <Card.Text className="text-muted font-weight-bold"><b>Seller:</b> {searchResults.seller} <span><button className="icon-button" onClick={() => copyToClipboard(searchResults.seller)}>
                                <FaRegCopy className="grey-copy-icon" />
                            </button></span></Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
}

export default SearchBooks;
