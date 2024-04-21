import { Col, Container, Row } from "react-bootstrap";
import "./banner.css";
const Banner = ({ title }) => {
    return (
        <div className="image-container">
            <img src="https://static.vecteezy.com/system/resources/previews/008/650/515/original/white-abstract-polygon-shape-background-square-box-pattern-geometric-backdrop-mosaic-decoration-creative-design-template-element-free-vector.jpg" alt="Product-bg" />
            <div className="overlay">
                <Container>
                    <Row>
                        <Col>
                            <h2>{title}</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Banner;

//Here is the pattern like Background Image Link