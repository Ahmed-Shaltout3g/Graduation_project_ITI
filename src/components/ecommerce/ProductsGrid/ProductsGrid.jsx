import React from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";

const ProductsGrid = ({ products, allProductsCount, filters, onFilterChange }) => {
  
  const handleRemoveFilter = (filterType) => {
    onFilterChange(prev => ({
      ...prev,
      [filterType]: filterType === 'priceRange' ? [0, 5000] : 
                   filterType === 'inStock' ? false :
                   filterType === 'features' ? [] : ""
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-light">
          Showing {products.length} of {allProductsCount} products
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
                onClick={() => handleRemoveFilter('category')}
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
                onClick={() => handleRemoveFilter('university')}
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
                onClick={() => handleRemoveFilter('faculty')}
              >
                ×
              </Button>
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
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
          <Col>
            <Alert variant="info" className="text-center">
              {allProductsCount === 0 
                ? 'No products available.' 
                : 'No products found matching your filters.'
              }
            </Alert>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProductsGrid;