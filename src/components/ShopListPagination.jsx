import { useEffect, useState } from "react";
import { Container, Row, Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import Loader from "./Loader/Loader";
import ProductCard from "./ProductCard/ProductCard";
import { getFirestore, collection, getDocs, query, where, orderBy, startAt, endAt } from 'firebase/firestore';
import {
    CitySelect,
    StateSelect,
} from "react-country-state-city";

//IN THIS PAGE PAGINATION WORKS BUT SORTING DOES NOT 

const ShopListPagination = () => {
    const [books, setBooks] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [languageFilter, setLanguageFilter] = useState(null);
    const [stateId, setStateId] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const db = getFirestore(); // Initialize Firestore


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                let queryBooks = collection(db, "BookListing");

                // Apply filters
                if (categoryFilter) {
                    queryBooks = queryBooks.where("genre", "==", categoryFilter);
                }
                if (languageFilter) {
                    queryBooks = queryBooks.where("language", "==", languageFilter);
                }
                if (selectedState) {
                    queryBooks = queryBooks.where("address.state", "==", selectedState);
                }
                if (selectedCity) {
                    queryBooks = queryBooks.where("address.city", "==", selectedCity);
                }

                const querySnapshot = await getDocs(queryBooks);
                const fetchedBooks = [];
                querySnapshot.forEach((doc) => {
                    fetchedBooks.push({ id: doc.id, ...doc.data() });
                });

                // Update state with only the subset of books for the current page
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setBooks(fetchedBooks.slice(startIndex, endIndex));

                // Update total number of pages based on total documents and items per page
                const totalItems = fetchedBooks.length;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                setTotalPages(totalPages);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching books: ", error);
                setLoading(false);
            }
        };
        fetchBooks();
    }, [db, categoryFilter, languageFilter, selectedState, selectedCity, currentPage, itemsPerPage]);

    // // Logic to get current items based on pagination
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

    // Logic to paginate
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Logic to calculate total number of pages
    // const totalPages = Math.ceil(books.length / itemsPerPage);

    const filteredBooks = books.filter(book => {
        if (categoryFilter && book.genre !== categoryFilter) return false;
        if (languageFilter && book.language !== languageFilter) return false;
        if (selectedState && book.address.state !== selectedState) return false;
        if (selectedCity && book.address.city !== selectedCity) return false;

        return true;
    });

    const resetFilters = () => {

        // setSelectedState(null);
        // setSelectedCity(null);
        window.location.reload();

    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="shop-list">
            <Container>

                {/* <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "1px solid #ced4da", borderRadius: "4px" }} // Add styling for outline
          />
        </Form.Group> */}

                <div style={{ display: "flex", alignItems: "center" }}>
                    <DropdownButton id="dropdown-basic-button" title={`Sort by category: ${categoryFilter || 'All'}`}>
                        <Dropdown.Item onClick={() => setCategoryFilter(null)}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter("Study Books")}>Study Books</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter("Educational")}>Educational</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter("Comic")}>Comic</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter("Fiction")}>Fiction</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter("Non Fiction")}>Non Fiction</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter("Adventure")}>Adventure</Dropdown.Item>
                        {/* Add other category options */}
                    </DropdownButton>

                    <div style={{ marginLeft: "10px" }}></div>

                    <DropdownButton id="dropdown-basic-button" title={`Sort by Language: ${categoryFilter || 'All'}`}>
                        <Dropdown.Item onClick={() => setLanguageFilter(null)}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLanguageFilter("English")}>English</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLanguageFilter("Hindi")}>Hindi</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLanguageFilter("Sanskrit")}>Sanskrit</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLanguageFilter("Marathi")}>Marathi</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLanguageFilter("Bengali")}>Bengali</Dropdown.Item>
                        {/* Add other language options */}
                    </DropdownButton>

                    <div style={{ marginLeft: "10px" }}></div>

                    <StateSelect
                        countryid={101}//County ID for India
                        onChange={(e) => {
                            setSelectedState(e.name);
                            setStateId(e.id);




                        }}
                        placeHolder={selectedCity ? selectedCity : "Select State"}

                    />

                    <div style={{ marginLeft: "10px" }}></div>

                    <CitySelect
                        countryid={101}
                        stateid={stateId}
                        onChange={(e) => {

                            setSelectedCity(e.name);


                        }}
                        placeHolder={selectedCity ? selectedCity : "Select City"}

                    />
                    <button onClick={resetFilters}>Reset</button>

                </div>




                <Row>
                    {filteredBooks.map((book) => (
                        <ProductCard
                            key={book.bookID}
                            title="Big Discount"
                            productItem={{
                                id: book.bookID,
                                discount: (parseInt(((parseInt(book.marketPrice) - parseInt(book.sellingPrice)) / book.marketPrice) * 100)),
                                imgUrl: book.bookPicture,
                                productName: book.bookName,
                                opticalPrice: book.marketPrice,
                                price: book.sellingPrice,
                                bookQuantity: book.bookQuantity,
                                category: book.genre,
                                shortDesc: book.bookDescription,
                                selfPickupOption: book.selfPickupOption,
                                city: book.address.city,
                                bookseller: book.bookseller,
                            }}
                        />
                    ))}
                </Row>
                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Pagination>
                        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </Container>
        </section>
    );
};

export default ShopListPagination;