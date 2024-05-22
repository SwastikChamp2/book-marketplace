import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>
        <Row className="justify-content-center">
          {productItems.map((productItem) => {
            return (
              <ProductCard
                key={productItem.bookID}
                title="Big Discount"
                productItem={{
                  id: productItem.bookID,
                  discount: (parseInt(((parseInt(productItem.marketPrice) - parseInt(productItem.sellingPrice)) / productItem.marketPrice) * 100)),
                  imgUrl: productItem.bookPicture,
                  productName: productItem.bookName,
                  opticalPrice: productItem.marketPrice,
                  price: productItem.sellingPrice,
                  bookQuantity: productItem.bookQuantity,
                  category: productItem.genre,
                  shortDesc: productItem.bookDescription,
                  selfPickupOption: productItem.selfPickupOption,
                  city: productItem.address?.city,
                  bookseller: productItem.bookseller,
                }}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
