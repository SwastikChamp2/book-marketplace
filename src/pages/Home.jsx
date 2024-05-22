import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import Loader from '../components/Loader/Loader';
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';

const Home = () => {

  const [discountBooks, setDiscountBooks] = useState([]);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDiscountBooks = async () => {
      const db = getFirestore();
      const bookListingRef = collection(db, "BookListing");
      const querySnapshot = await getDocs(bookListingRef);
      const books = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Fetched books:', books); // Log fetched books to verify data format

      // Calculate discount and sort by highest discount
      const booksWithDiscount = books.map(book => ({
        ...book,
        discount: (book.marketPrice - book.sellingPrice) / book.marketPrice
      }));

      const topDiscountBooks = booksWithDiscount
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 6); // Get the top 6 books with the highest discount

      setDiscountBooks(topDiscountBooks);

      // Get the current month and year in YYYY-MM format
      const currentMonthYear = format(new Date(), 'yyyy-MM');
      console.log('Current Month-Year:', currentMonthYear); // Log current month-year

      // Filter books for the featured section
      const featuredBooks = books.filter(book => {
        const advertiseDate = book.advertiseFeaturedBooksDate;
        if (typeof advertiseDate !== 'string') {
          console.warn(`Book ${book.id} does not have advertiseFeaturedBooksDate field`);
          return false;
        }
        return advertiseDate.startsWith(currentMonthYear);
      });

      console.log('Filtered Featured Books:', featuredBooks); // Log filtered featured books
      setFeaturedBooks(featuredBooks);

      setLoading(false);
    };

    fetchDiscountBooks();
  }, []);


  if (loading) {
    return <Loader />;
  }


  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discountBooks}
      />
      <Section
        title="Featured Books"
        bgColor="white"
        productItems={featuredBooks}
      />
      {featuredBooks.length === 0 && <p>No featured books available for this month.</p>}
    </Fragment>
  );
};

export default Home;
