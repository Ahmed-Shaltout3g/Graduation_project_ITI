import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FeaturedProducts from '@components/ecommerce/FeaturedProducts/FeaturedProducts';

const ProductsPage = () => {
  const features = ["Wireless", "4K Resolution", "Noise Cancelling"];
  
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

  // Get unique values for filters from products
  const getUniqueValues = (field) => {
    if (!Array.isArray(products)) return [];
    return [...new Set(products
      .map(product => product[field])
      .filter(value => value && value.trim() !== '')
    )].sort();
  };

  // Get categories, universities, and faculties from API data
  const categories = getUniqueValues('category');
  const universities = getUniqueValues('university');
  const faculties = getUniqueValues('faculty');

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

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
    
    // Features filter
    if (filters.features.length > 0) {
      const productFeatures = product.features || [];
      if (!filters.features.every(feature => productFeatures.includes(feature))) {
        return false;
      }
    }
    
    return true;
  }) : [];

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
        <Row >
          {/* Sidebar */}
          <Col md={3} className="mb-4">
            <Card bg="transparent" text="light" className="border-info">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Filters</h5>
                  <Button 
                    variant="link" 
                    className="text-info text-decoration-none p-0"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </Button>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <h6 className="fw-semibold">Category</h6>
                  <Form.Select 
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="bg-dark text-light border-info"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category || 'Uncategorized'}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                {/* University Filter */}
                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">University</h6>
                  <Form.Select 
                    value={filters.university}
                    onChange={(e) => handleFilterChange('university', e.target.value)}
                    className="bg-dark text-light border-info"
                  >
                    <option value="">All Universities</option>
                    {universities.map((university, index) => (
                      <option key={index} value={university}>
                        {university}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                {/* Faculty Filter */}
                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Faculty</h6>
                  <Form.Select 
                    value={filters.faculty}
                    onChange={(e) => handleFilterChange('faculty', e.target.value)}
                    className="bg-dark text-light border-info"
                  >
                    <option value="">All Faculties</option>
                    {faculties.map((faculty, index) => (
                      <option key={index} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                {/* Price Range Filter */}
                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Price Range</h6>
                  <div className="mb-2">
                    <Form.Range 
                      min={0} 
                      max={5000} 
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                    />
                  </div>
                  <div className="d-flex justify-content-between text-info small">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <div className="text-center small text-muted mt-1">
                    Up to ${filters.priceRange[1]}
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Availability</h6>
                  <Form.Check 
                    type="checkbox" 
                    label="In Stock" 
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="text-light"
                  />
                </div>

                {/* Features Filter */}
                <div className="border-top border-info pt-3 mb-4">
                  <h6 className="fw-semibold">Features</h6>
                  {features.map((feature, i) => (
                    <Form.Check 
                      key={i} 
                      type="checkbox" 
                      label={feature} 
                      className="text-light"
                      checked={filters.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                  ))}
                </div>

                <div className="border-top border-info pt-3">
                  <div className="d-flex justify-content-between small text-muted mb-2">
                    <span>Active Filters:</span>
                    <span>
                      {[
                        filters.category && 'Category',
                        filters.university && 'University',
                        filters.faculty && 'Faculty',
                        filters.inStock && 'In Stock',
                        filters.features.length > 0 && 'Features',
                        filters.priceRange[1] < 5000 && 'Price'
                      ].filter(Boolean).length}
                    </span>
                  </div>
                  <Button variant="info" className="w-100 fw-bold">
                    Apply Filters
                  </Button>
                </div>
              </Card.Body>
            </Card>
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
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="text-light">
                    Showing {filteredProducts.length} of {Array.isArray(products) ? products.length : 0} products
                  </h5>
                  
                  {/* Active Filters Display */}
                  <div className="d-flex flex-wrap gap-2">
                    {filters.category && (
                      <span className="badge bg-info">
                        Category: {filters.category}
                        <Button 
                          variant="link" 
                          className="text-light p-0 ms-1" 
                          style={{ fontSize: '0.7rem' }}
                          onClick={() => handleFilterChange('category', '')}
                        >
                          ×
                        </Button>
                      </span>
                    )}
                    {filters.university && (
                      <span className="badge bg-info">
                        University: {filters.university}
                        <Button 
                          variant="link" 
                          className="text-light p-0 ms-1" 
                          style={{ fontSize: '0.7rem' }}
                          onClick={() => handleFilterChange('university', '')}
                        >
                          ×
                        </Button>
                      </span>
                    )}
                    {filters.faculty && (
                      <span className="badge bg-info">
                        Faculty: {filters.faculty}
                        <Button 
                          variant="link" 
                          className="text-light p-0 ms-1" 
                          style={{ fontSize: '0.7rem' }}
                          onClick={() => handleFilterChange('faculty', '')}
                        >
                          ×
                        </Button>
                      </span>
                    )}
                  </div>
                </div>

                {/* Display actual products from API */}
                <Row>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <Col key={product.id || product._id} md={6} lg={4} className="mb-4">
                        <Card className="bg-dark text-light border-info h-100">
                          {product.image && (
                            <Card.Img 
                              variant="top" 
                              src={product.image} 
                              alt={product.title}
                              style={{ height: '200px', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <Card.Body className="d-flex flex-column">
                            <Card.Title className="fw-bold">
                              {product.title || 'No Title'}
                            </Card.Title>
                            <Card.Text className="flex-grow-1 small">
                              {product.description ? 
                                `${product.description.substring(0, 100)}...` : 
                                'No description available'
                              }
                            </Card.Text>
                            <div className="mt-auto">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="h5 text-info mb-0">
                                  ${product.price || 'N/A'}
                                </span>
                                <span className={`badge ${product.status === 'available' ? 'bg-success' : 'bg-warning'}`}>
                                  {product.status || 'unknown'}
                                </span>
                              </div>
                              
                              {/* University and Faculty info */}
                              <div className="small text-muted mb-2">
                                {product.university && (
                                  <div>University: {product.university}</div>
                                )}
                                {product.faculty && (
                                  <div>Faculty: {product.faculty}</div>
                                )}
                              </div>
                              
                              <Button variant="info" className="w-100 mt-2">
                                View Details
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    !loading && (
                      <Col>
                        <Alert variant="info" className="text-center">
                          {Array.isArray(products) && products.length === 0 
                            ? 'No products available.' 
                            : 'No products found matching your filters.'
                          }
                        </Alert>
                      </Col>
                    )
                  )}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsPage;