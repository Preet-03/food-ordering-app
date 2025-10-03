import Restaurant from '../models/Restaurant.js';

// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const { cuisine, name } = req.query;
    let filter = {};
    
    // Add cuisine filter if provided
    if (cuisine && cuisine !== 'All') {
      filter.cuisine = new RegExp(cuisine, 'i');
    }
    
    // Add name filter if provided
    if (name && name !== 'All') {
      filter.name = new RegExp(name, 'i');
    }
    
    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch a single restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Search restaurants by name, cuisine, address, or menu items
// @route   GET /api/restaurants/search?q=searchterm
// @access  Public
const searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Create a case-insensitive search query
    const searchRegex = new RegExp(q, 'i');
    
    const restaurants = await Restaurant.find({
      $or: [
        // Search in restaurant details
        { name: searchRegex },
        { cuisine: searchRegex },
        { address: searchRegex },
        { description: searchRegex },
        // Search in menu items
        { 'menu.name': searchRegex },
        { 'menu.description': searchRegex }
      ]
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all products (menu items) with restaurant context
// @route   GET /api/restaurants/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const { cuisine, search, sortBy, order } = req.query;
    let filter = {};
    
    // Add cuisine filter if provided
    if (cuisine && cuisine !== 'All') {
      filter.cuisine = new RegExp(cuisine, 'i');
    }
    
    // Add search filter if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { cuisine: searchRegex },
        { 'menu.name': searchRegex },
        { 'menu.description': searchRegex }
      ];
    }
    
    // Only get restaurants that have menu items
    filter['menu.0'] = { $exists: true };
    
    const restaurants = await Restaurant.find(filter);
    
    // Flatten menu items with restaurant context - only include items with all required fields
    const products = [];
    restaurants.forEach(restaurant => {
      // Validate restaurant has all required fields
      if (!restaurant.name || !restaurant.cuisine || !restaurant.rating || !restaurant._id) {
        return; // Skip this restaurant if missing required fields
      }
      
      restaurant.menu.forEach(menuItem => {
        // Validate menu item has all required fields
        if (menuItem.name && menuItem.price && menuItem.description && menuItem.image && menuItem._id) {
          products.push({
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            description: menuItem.description,
            image: menuItem.image,
            rating: menuItem.rating || 4.0, // Default rating if not set
            restaurant: {
              _id: restaurant._id,
              name: restaurant.name,
              cuisine: restaurant.cuisine,
              rating: restaurant.rating,
              address: restaurant.address,
              imageUrl: restaurant.imageUrl
            }
          });
        }
      });
    });
    
    // Sort products based on query parameters
    if (sortBy) {
      const sortOrder = order === 'desc' ? -1 : 1;
      
      products.sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return (b.rating - a.rating) * sortOrder;
          case 'price':
            return (a.price - b.price) * sortOrder;
          case 'name':
            return a.name.localeCompare(b.name) * sortOrder;
          case 'restaurant':
            return a.restaurant.name.localeCompare(b.restaurant.name) * sortOrder;
          default:
            return 0;
        }
      });
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get sorted menu items (products only, no restaurants)
// @route   GET /api/restaurants/menu-items/sorted
// @access  Public
const getSortedMenuItems = async (req, res) => {
  try {
    const { sortBy = 'rating', order = 'desc', cuisine, search, limit } = req.query;
    let filter = {};
    
    // Add cuisine filter if provided
    if (cuisine && cuisine !== 'All') {
      filter.cuisine = new RegExp(cuisine, 'i');
    }
    
    // Add search filter if provided
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { cuisine: searchRegex },
        { 'menu.name': searchRegex },
        { 'menu.description': searchRegex }
      ];
    }
    
    // Only get restaurants that have menu items
    filter['menu.0'] = { $exists: true };
    
    const restaurants = await Restaurant.find(filter);
    
    // Flatten menu items with restaurant context
    const menuItems = [];
    restaurants.forEach(restaurant => {
      if (!restaurant.name || !restaurant.cuisine || !restaurant.rating || !restaurant._id) {
        return;
      }
      
      restaurant.menu.forEach(menuItem => {
        if (menuItem.name && menuItem.price && menuItem.description && menuItem.image && menuItem._id) {
          menuItems.push({
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            description: menuItem.description,
            image: menuItem.image,
            rating: menuItem.rating || 4.0,
            restaurantName: restaurant.name,
            restaurantCuisine: restaurant.cuisine,
            restaurantId: restaurant._id
          });
        }
      });
    });
    
    // Sort menu items
    const sortOrder = order === 'desc' ? -1 : 1;
    
    menuItems.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating - a.rating) * sortOrder;
        case 'price':
          return (a.price - b.price) * sortOrder;
        case 'name':
          return a.name.localeCompare(b.name) * sortOrder;
        case 'restaurant':
          return a.restaurantName.localeCompare(b.restaurantName) * sortOrder;
        default:
          return (b.rating - a.rating) * sortOrder; // Default to rating desc
      }
    });
    
    // Apply limit if provided
    const limitedItems = limit ? menuItems.slice(0, parseInt(limit)) : menuItems;
    
    res.json({
      total: menuItems.length,
      sortBy,
      order,
      items: limitedItems
    });
  } catch (error) {
    console.error('Error fetching sorted menu items:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getRestaurants, getRestaurantById, searchRestaurants, getAllProducts, getSortedMenuItems };