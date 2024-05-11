import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './SuccessPage.css'; // Custom CSS for styling

const SuccessPage = () => {
    const navigate = useNavigate();
    return (
        <Container fluid className="success-container">
            <Row className="justify-content-center align-items-center">
                <Col md={8} lg={6}>
                    <div className="success-card">
                        <h1 className="success-heading">Payment Successful!</h1>
                        <p className="success-text">Thank you for your purchase.</p>
                        <p className="success-text">Your order has been successfully placed.</p>
                        <Button variant="primary" className="success-button" onClick={() => navigate('/shop')}>Continue Shopping</Button>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SuccessPage;
