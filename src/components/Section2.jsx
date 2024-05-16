import { Container, Row, Col } from "react-bootstrap";
import PeopleCard from "./PeopleCard/PeopleCard";

const Section2 = ({ title, bgColor, productItems }) => {
    return (
        <section style={{ background: bgColor }}>
            <Container>
                <div className="heading">
                    <h1>{title}</h1>
                </div>
                <Row className="justify-content-center">


                    <PeopleCard />

                </Row>
            </Container>
        </section>
    );
};

export default Section2;
