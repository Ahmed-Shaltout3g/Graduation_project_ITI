import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const ProductFilters = ({ filters, onFilterChange, products, onClearFilters }) => {
  
  // Get unique values for filters from products
  const getUniqueValues = (field) => {
    if (!Array.isArray(products)) return [];
    return [...new Set(products
      .map(product => product[field])
      .filter(value => value && value.trim() !== '')
    )].sort();
  };

  const categories = getUniqueValues('category');
  const universities = getUniqueValues('university');
  const faculties = getUniqueValues('faculty');
  const features = ["Wireless", "4K Resolution", "Noise Cancelling"];

  const handleFilterChange = (filterType, value) => {
    onFilterChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    onFilterChange(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <Card bg="transparent" text="light" className="border-info">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Filters</h5>
          <Button 
            variant="link" 
            className="text-info text-decoration-none p-0"
            onClick={onClearFilters}
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
              onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
            />
          </div>
          <div className="d-flex justify-content-between text-info small">
            <span>$0</span>
            <span>${filters.priceRange[1]}</span>
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

        <Button variant="info" className="w-100 fw-bold">
          Apply Filters
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductFilters;