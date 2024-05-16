import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section2 from "../components/Section2";
import { products, discoutProducts } from "../utils/products";
import SliderFundEducation from "../components/FundEducationComponents/SliderFundEducation";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const FundEducation = () => {
    const newArrivalData = products.filter(
        (item) => item.category === "fiction" || item.category === "non-fiction"
    );
    const bestSales = products.filter((item) => item.category === "study-books");
    useWindowScrollToTop();
    return (
        <Fragment>
            <SliderFundEducation />
            <Section2
                title="Fund their Education"
                bgColor="#f6f9fc"
                productItems={discoutProducts}
            />

        </Fragment>
    );
};

export default FundEducation;
