// frontend/src/pages/RestaurantListPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import RestaurantCard from '../components/RestaurantCard';
import ProductCard from '../components/ProductCard';
import FilterSlider from '../components/FilterSlider';
import './RestaurantListPage.css';
import Hero from '../components/Hero';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortedMenuItems, setSortedMenuItems] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState({ value: 'All', type: 'cuisine' });
  const [showProducts, setShowProducts] = useState(false);
  const [currentSort, setCurrentSort] = useState('default');
  const [totalItems, setTotalItems] = useState(0);
  const location = useLocation();

  // Function to sort restaurants
  const sortRestaurants = (restaurantList, sortType) => {
    if (sortType === 'default') return restaurantList;
    
    return [...restaurantList].sort((a, b) => {
      switch (sortType) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'price-high': {
          // Calculate average price from menu items
          const avgPriceA = a.menu.reduce((sum, item) => sum + item.price, 0) / a.menu.length;
          const avgPriceB = b.menu.reduce((sum, item) => sum + item.price, 0) / b.menu.length;
          return avgPriceB - avgPriceA;
        }
        case 'price-low': {
          const avgPriceA2 = a.menu.reduce((sum, item) => sum + item.price, 0) / a.menu.length;
          const avgPriceB2 = b.menu.reduce((sum, item) => sum + item.price, 0) / b.menu.length;
          return avgPriceA2 - avgPriceB2;
        }
        default:
          return 0;
      }
    });
  };

  // Get search term from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  const fetchRestaurants = async (search = '', filterValue = 'All', filterType = 'cuisine') => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/restaurants';
      const params = new URLSearchParams();
      
      if (search) {
        url = `/api/restaurants/search`;
        params.append('q', search);
      } else {
        // Add filter parameters for regular fetch
        if (filterValue !== 'All') {
          if (filterType === 'cuisine') {
            params.append('cuisine', filterValue);
          } else if (filterType === 'restaurant') {
            params.append('name', filterValue);
          }
        }
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const { data } = await axios.get(url);
      
      // Check if the received data is actually an array
      if (Array.isArray(data)) {
        setRestaurants(data);
        if (!search && filterValue === 'All') {
          setAllRestaurants(data); // Store all restaurants when no filters applied
        }
      } else {
        setError('Data received from server is not in the correct format.');
        setRestaurants([]); 
      }

    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to fetch restaurants from the server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (search = '', filterValue = 'All') => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/restaurants/products';
      const params = new URLSearchParams();
      
      if (search) {
        params.append('search', search);
      }
      
      if (filterValue !== 'All') {
        params.append('cuisine', filterValue);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const { data } = await axios.get(url);
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setError('Data received from server is not in the correct format.');
        setProducts([]); 
      }

    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products from the server.');
    } finally {
      setLoading(false);
    }
  };

  // New function to fetch sorted menu items
  const fetchSortedMenuItems = async (search = '', filterValue = 'All', sortBy = 'rating', order = 'desc') => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/restaurants/menu-items/sorted';
      const params = new URLSearchParams();
      
      if (search) {
        params.append('search', search);
      }
      
      if (filterValue !== 'All') {
        params.append('cuisine', filterValue);
      }
      
      params.append('sortBy', sortBy);
      params.append('order', order);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const { data } = await axios.get(url);
      
      if (data && data.items && Array.isArray(data.items)) {
        setSortedMenuItems(data.items);
        setTotalItems(data.total || 0);
      } else {
        setError('Data received from server is not in the correct format.');
        setSortedMenuItems([]); 
        setTotalItems(0);
      }

    } catch (err) {
      console.error('Error fetching sorted menu items:', err);
      setError('Failed to fetch menu items from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If sorting is applied (not default), always show individual menu items
    if (currentSort !== 'default') {
      const [sortBy, order] = currentSort.includes('-') ? 
        [currentSort.split('-')[0], currentSort.split('-')[1] === 'high' ? 'desc' : 'asc'] : 
        ['rating', 'desc'];
      fetchSortedMenuItems(searchTerm, activeFilter.value, sortBy, order);
    } else if (showProducts) {
      fetchProducts(searchTerm, activeFilter.value);
    } else {
      fetchRestaurants(searchTerm, activeFilter.value, activeFilter.type);
    }
  }, [searchTerm, activeFilter, showProducts, currentSort]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setActiveFilter({ value: 'All', type: 'cuisine' }); // Reset filter when searching
    setShowProducts(false); // Reset to restaurants view when searching
    // Update URL without navigation
    const newUrl = term ? `/restaurants?search=${encodeURIComponent(term)}` : '/restaurants';
    window.history.pushState({}, '', newUrl);
  };

  const handleFilter = (filterValue, filterType) => {
    // When a filter is applied (not "All"), show products
    setShowProducts(filterValue !== 'All');
    setActiveFilter({ value: filterValue, type: filterType });
  };

  const handleSort = (sortType) => {
    setCurrentSort(sortType);
    
    if (showProducts && sortType !== 'default') {
      // Use the new sorted menu items endpoint for better performance
      const [sortBy, order] = sortType.includes('-') ? 
        [sortType.split('-')[0], sortType.split('-')[1] === 'high' ? 'desc' : 'asc'] : 
        ['rating', 'desc'];
      fetchSortedMenuItems(searchTerm, activeFilter.value, sortBy, order);
    } else if (showProducts) {
      // Fallback to client-side sorting for default
      const sortedProducts = sortProducts(products, sortType);
      setProducts(sortedProducts);
    } else {
      // For restaurants, use client-side sorting
      const sortedRestaurants = sortRestaurants(restaurants, sortType);
      setRestaurants(sortedRestaurants);
    }
  };

  // Function to sort products
  const sortProducts = (productList, sortType) => {
    if (sortType === 'default') return productList;
    
    return [...productList].sort((a, b) => {
      switch (sortType) {
        case 'rating-high':
          return b.restaurant.rating - a.restaurant.rating;
        case 'rating-low':
          return a.restaurant.rating - b.restaurant.rating;
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setActiveFilter({ value: 'All', type: 'cuisine' });
    setShowProducts(false);
    setCurrentSort('default');
    setSortedMenuItems([]);
    setTotalItems(0);
    window.history.pushState({}, '', '/restaurants');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{(currentSort !== 'default' || showProducts) ? 'Food Items' : 'Restaurants'}</h1>
      <Hero onSearch={handleSearch} />
      
      {searchTerm && (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <p>
            Search results for: <strong>"{searchTerm}"</strong>
            <button 
              onClick={clearSearch}
              style={{ 
                marginLeft: '10px', 
                padding: '5px 10px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Clear Search
            </button>
          </p>
        </div>
      )}

      <FilterSlider 
        restaurants={searchTerm ? restaurants : allRestaurants} 
        onFilter={handleFilter}
        onSort={handleSort}
        currentSort={currentSort}
        sortedMenuItems={sortedMenuItems}
        totalItems={totalItems}
        showProducts={showProducts}
      />
      
      <div className="restaurant-list">
        {(currentSort !== 'default' || showProducts) ? (
          <>
            {(currentSort !== 'default' ? sortedMenuItems : products).length > 0 ? (
              (currentSort !== 'default' ? sortedMenuItems : products).map((product, index) => {
                // Handle both sorted menu items format and regular products format
                const isNewFormat = product.restaurantName; // New format has restaurantName
                
                return (
                  <div key={`${isNewFormat ? product.restaurantId : product.restaurant._id}-${index}`} className="menu-item-card">
                    <ProductCard 
                      product={isNewFormat ? {
                        ...product,
                        restaurant: {
                          _id: product.restaurantId,
                          name: product.restaurantName,
                          cuisine: product.restaurantCuisine,
                          rating: product.rating || 4.0
                        }
                      } : product} 
                      restaurant={isNewFormat ? {
                        _id: product.restaurantId,
                        name: product.restaurantName,
                        cuisine: product.restaurantCuisine,
                        rating: product.rating || 4.0
                      } : product.restaurant}
                      showItemRating={isNewFormat} // Show individual item rating for sorted items
                    />
                  </div>
                );
              })
            ) : (
              <p>No food items found for the selected filters.</p>
            )}
          </>
        ) : (
          restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            <p>{searchTerm ? `No restaurants found for "${searchTerm}".` : 'No restaurants found.'}</p>
          )
        )}
      </div>
    </div>
  );
};

export default RestaurantListPage;