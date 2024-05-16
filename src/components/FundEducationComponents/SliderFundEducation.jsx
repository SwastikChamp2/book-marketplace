import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "../SliderCard/SlideCard"
import { SliderDataFundEducation } from "../../utils/products"


const SliderFundEducation = () => {
    const settings = {
        nav: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }
    return (
        <section className='homeSlide'>
            <Container>
                <Slider {...settings}>
                    {SliderDataFundEducation.map((value, index) => {
                        return (
                            <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
                        )
                    })}
                </Slider>
            </Container>
        </section>
    )
}

export default SliderFundEducation