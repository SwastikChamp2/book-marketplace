import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import Section2 from "../components/Section2";
import { products, discoutProducts } from "../utils/products";
import SliderFundEducation from "../components/FundEducationComponents/SliderFundEducation";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import "./PagesCSS/scholarshipButton.css"

const FundEducation = () => {

    const navigate = useNavigate();


    const newArrivalData = products.filter(
        (item) => item.category === "fiction" || item.category === "non-fiction"
    );
    const bestSales = products.filter((item) => item.category === "study-books");
    useWindowScrollToTop();


    const handleScholarshipClick = () => {
        navigate('/list-scholarship');
    };

    return (
        <Fragment>
            <div style={{ position: 'relative' }}>
                <button className="scholarship-button" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={handleScholarshipClick}>
                    Register for Scholarship
                </button>
            </div>
            <SliderFundEducation />
            <Section2
                title="Fund their Education"
                bgColor="#f6f9fc"
            />

        </Fragment>
    );
};

export default FundEducation;
