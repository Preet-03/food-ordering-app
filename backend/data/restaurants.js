// backend/data/restaurants.js
const restaurants = [
  {
    name: 'Pizza Palace',
    cuisine: 'Italian',
    address: '123 Pizza St, Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    rating: 4.5,
    menu: [
      { name: 'Margherita Pizza', price: 250, description: 'Classic cheese and tomato' },
      { name: 'Pepperoni Pizza', price: 300, description: 'Spicy pepperoni and cheese' },
      { name: 'Garlic Bread', price: 150, description: 'Toasted with garlic butter' },
    ],
  },
  {
    name: 'Curry Kingdom',
    cuisine: 'Indian',
    address: '456 Spice Ave, Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
    rating: 4.8,
    menu: [
      { name: 'Butter Chicken', price: 350, description: 'Creamy and rich chicken curry' },
      { name: 'Palak Paneer', price: 300, description: 'Spinach and cottage cheese' },
      { name: 'Naan Bread', price: 50, description: 'Soft leavened bread' },
    ],
  },
  {
    name: 'Taco Town',
    cuisine: 'Mexican',
    address: '789 Fiesta Blvd, Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400',
    rating: 4.3,
    menu: [
      { name: 'Chicken Tacos', price: 200, description: 'Three soft tacos with chicken' },
      { name: 'Beef Burrito', price: 280, description: 'Large burrito with beef and beans' },
      { name: 'Nachos', price: 180, description: 'Loaded with cheese and salsa' },
    ],
  },
];

export default restaurants;