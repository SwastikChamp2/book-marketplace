import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import Loader from '../components/Loader/Loader';
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Home = () => {

  const [discountBooks, setdiscountBooks] = useState([]);
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

      // Calculate discount and sort by highest discount
      const booksWithDiscount = books.map(book => ({
        ...book,
        discount: (book.marketPrice - book.sellingPrice) / book.marketPrice
      }));

      const topDiscountBooks = booksWithDiscount
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 6); // Get the top 6 books with the highest discount

      setdiscountBooks(topDiscountBooks);
      setLoading(false);
    };

    fetchDiscountBooks();
  }, []);


  const newArrivalData = products.filter(
    (item) => item.category === "fiction" || item.category === "non-fiction"
  );
  const bestSales = products.filter((item) => item.category === "study-books");
  useWindowScrollToTop();

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
        productItems={newArrivalData}
      />
    </Fragment>
  );
};

export default Home;
