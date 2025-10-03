// frontend/src/components/FilterSlider.jsx
import React, { useState } from 'react';
import './FilterSlider.css';

const FilterSlider = ({ restaurants, onFilter, onSort, currentSort, sortedMenuItems, totalItems, showProducts }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('default');

  // Get unique cuisines from restaurants
  const cuisines = ['All', ...new Set(restaurants.map(restaurant => restaurant.cuisine))];

  const sortOptions = [
    { value: 'default', label: '🔄 Default', icon: '🔄' },
    { value: 'rating-high', label: '⭐ Rating: High to Low', icon: '⭐' },
    { value: 'rating-low', label: '⭐ Rating: Low to High', icon: '⭐' },
    { value: 'price-high', label: '💰 Price: High to Low', icon: '💰' },
    { value: 'price-low', label: '💰 Price: Low to High', icon: '💰' }
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilter(filter, 'cuisine');
  };

  const handleSortChange = (sortValue) => {
    setSelectedSort(sortValue);
    onSort(sortValue);
  };

  return (
    <div className="filter-slider-container">
      <div className="filter-header">
        <div className="filter-section">
          <h3>🍽️ Filter by Cuisine</h3>
          <div className="filter-slider">
            <div className="filter-scroll-container">
              {cuisines.map((cuisine, index) => (
                <button
                  key={index}
                  className={`filter-option ${selectedFilter === cuisine ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cuisine)}
                >
                  {cuisine === 'All' ? '🔄 All' : cuisine}
                  {cuisine !== 'All' && (
                    <span className="filter-count">
                      ({restaurants.filter(r => r.cuisine === cuisine).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sort-section">
          <h3>📊 Sort by</h3>
          <div className="sort-dropdown">
            <select 
              value={selectedSort} 
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="filter-info">
        <p>
          {currentSort !== 'default' ? (
            `Showing ${sortedMenuItems?.length || 0} of ${totalItems || 0} menu items from ${
              sortedMenuItems ? [...new Set(sortedMenuItems.map(item => item.restaurantName))].length : 0
            } restaurants - sorted by ${currentSort.replace('-', ' ')}`
          ) : (
            selectedFilter === 'All' 
              ? `Showing all ${restaurants.length} restaurants`
              : `Showing ${restaurants.filter(r => r.cuisine === selectedFilter).length} ${selectedFilter} restaurants`
          )}
        </p>
      </div>
    </div>
  );
};

export default FilterSlider;