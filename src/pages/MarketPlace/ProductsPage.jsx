import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FeaturedProducts from '@components/ecommerce/FeaturedProducts/FeaturedProducts';
import ProductFilters from '@components/ecommerce/ProductFilters/ProductFilters';
import ProductsGrid from '@components/ecommerce/ProductsGrid/ProductsGrid';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    university: "",
    faculty: "",
    priceRange: [0, 5000],
    inStock: false,
    features: []
  });

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://127.0.0.1:8000/api/products/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle different possible response structures
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.results)) {
        setProducts(data.results);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.warn('Unexpected API response structure:', data);
        setProducts([]);
      }
    } catch (err) {
      setError(`Failed to fetch products: ${err.message}`);
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get featured products
  const featuredProducts = Array.isArray(products) 
    ? products.filter(product => product.is_featured).slice(0, 6)
    : [];

  // Filter products based on current filters
  const filteredProducts = Array.isArray(products) ? products.filter(product => {
    if (!product) return false;
    
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // University filter
    if (filters.university && product.university !== filters.university) {
      return false;
    }
    
    // Faculty filter
    if (filters.faculty && product.faculty !== filters.faculty) {
      return false;
    }
    
    // Price range filter
    if (product.price && (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])) {
      return false;
    }
    
    // Availability filter
    if (filters.inStock && product.status !== 'available') {
      return false;
    }
    
    return true;
  }) : [];

  const clearAllFilters = () => {
    setFilters({
      category: "",
      university: "",
      faculty: "",
      priceRange: [0, 5000],
      inStock: false,
      features: []
    });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Container className="text-center mt-5">
        <h1 className="fw-bold display-5">Our Products</h1>
        <p className="mx-auto" style={{ maxWidth: "600px" }}>
          Explore our line of innovative, high-quality products designed to enhance your
          remote work experience and boost productivity.
        </p>
      </Container>

      <Container fluid className="py-5">
        <Row className="justify-content-center">
          {/* Filters Sidebar */}
          <Col md={3} className="mb-4">
            <ProductFilters 
              filters={filters}
              onFilterChange={setFilters}
              products={products}
              onClearFilters={clearAllFilters}
            />
          </Col>

          {/* Products Display */}
          <Col md={8}>
            {loading && (
              <div className="text-center">
                <Spinner animation="border" variant="info" />
                <p className="mt-2">Loading products...</p>
              </div>
            )}

            {error && (
              <Alert variant="danger">
                {error}
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="ms-3"
                  onClick={fetchProducts}
                >
                  Retry
                </Button>
              </Alert>
            )}

            {!loading && !error && (
              <>
                {/* Featured Products Section */}
                {featuredProducts.length > 0 && (
                  <div className="mb-5">
                    <FeaturedProducts 
                      title="Featured Products" 
                      products={featuredProducts} 
                      bgColor='transparent' 
                    />
                  </div>
                )}

                {/* Products Grid */}
                <ProductsGrid 
                  products={filteredProducts}
                  allProductsCount={products.length}
                  filters={filters}
                  onFilterChange={setFilters}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsPage;