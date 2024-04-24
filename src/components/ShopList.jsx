import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ShopList = () => {
  const [books, setBooks] = useState([]);
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BookListing"));
        const fetchedBooks = [];
        querySnapshot.forEach((doc) => {
          fetchedBooks.push({ id: doc.id, ...doc.data() });
        });
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, [db]);

  return (
    <section className="shop-list">
      <Container>
        <Row>
          {books.map((book) => (
            <ProductCard
              key={book.id} // Assuming each book document has an "id" field
              title="Big Discount" // You might want to adjust this dynamically based on book properties
              productItem={{
                id: book.id, // Assuming each book document has an "id" field
                discount: (parseInt(((parseInt(book.marketPrice) - parseInt(book.sellingPrice)) / book.marketPrice) * 100)),
                imgUrl: book.bookPicture,
                productName: book.bookName,
                opticalPrice: book.marketPrice,
                price: book.sellingPrice,
                category: book.genre,
                shortDesc: book.bookDescription
              }}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ShopList;