import React from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FeaturedProducts from '@components/ecommerce/FeaturedProducts/FeaturedProducts'


const ProductsPage = () => {
  const categories = ["Laptops", "Monitors", "Keyboards", "Audio", "Accessories"];
  const features = ["Wireless", "4K Resolution", "Noise Cancelling"];

  return (
    <div className="min-vh-100 d-flex flex-column">



      <Container fluid className="text-center mt-5">
        <h1 className="fw-bold display-5">Our Products</h1>
        <p className=" mx-auto" style={{ maxWidth: "600px" }}>
          Explore our line of innovative, high-quality products designed to enhance your
          remote work experience and boost productivity.
        </p>
      </Container>


      <Container fluid className="py-5">
        <Row >
          {/* Sidebar */}
          <Col md={3} className="mb-4">
            <Card bg="transparent" text="light" className="border-info">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Filters</h5>
                  <Button variant="link" className="text-info text-decoration-none p-0">
                    Clear All
                  </Button>
                </div>


                <div className="mb-4">
                  <h6 className="fw-semibold">Category</h6>
                  {categories.map((item, i) => (
                    <Form.Check
                      key={i}
                      type="checkbox"
                      label={item}
                      defaultChecked={i === 0}
                      className="text-light"
                    />
                  ))}
                </div>


                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Price Range</h6>
                  <Form.Range min={0} max={5000} defaultValue={2500} />
                  <div className="d-flex justify-content-between text-info small">
                    <span>$0</span>
                    <span>$5000</span>
                  </div>
                </div>

                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Availability</h6>
                  <Form.Check type="checkbox" label="In Stock" defaultChecked />
                </div>


                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Features</h6>
                  {features.map((feature, i) => (
                    <Form.Check key={i} type="checkbox" label={feature} className="text-light" />
                  ))}
                </div>

                <Button variant="info" className="w-100 fw-bold">
                  Apply Filters
                </Button>
              </Card.Body>
            </Card>
          </Col>



          <Col md={9}>
            <FeaturedProducts title="Shop by Category" products={categories} bgColor='transparent' />
          </Col>

        </Row>
      </Container>

    </div>
  );
};

export default ProductsPage;
