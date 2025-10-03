# 🍕 Food Ordering App

A modern, full-stack food ordering application built with React.js and Node.js featuring beautiful animations, real-time notifications, and a seamless user experience.

![Food Ordering App](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.0+-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.0+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-darkgreen)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Beautiful Animations**: Floating food icons, smooth transitions, and engaging hover effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Gradient Design**: Consistent purple/blue gradient theme throughout
- **Interactive Elements**: Animated buttons, cards, and navigation components
- **Smooth Scrolling**: Enhanced scroll-to-top functionality with animations

### 🛒 **Core Functionality**
- **User Authentication**: Secure login/register with JWT tokens
- **Restaurant Browse**: Search and filter restaurants by cuisine, rating, and delivery time
- **Menu Management**: View detailed menu items with images, descriptions, and ratings
- **Shopping Cart**: Add/remove items with real-time cart notifications
- **Order Placement**: Streamlined checkout process with order confirmation
- **Email Notifications**: Automated order confirmation emails
- **User Profile**: Manage personal information and order history

### 🔧 **Technical Features**
- **Real-time Updates**: Dynamic cart updates and notifications
- **Error Handling**: Comprehensive error management and user feedback
- **Loading States**: Shimmer effects and loading animations
- **Form Validation**: Client and server-side validation
- **API Integration**: RESTful API with proper error handling

## 🛠️ Technology Stack

### **Frontend**
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing and navigation
- **Context API** - State management for authentication and cart
- **CSS3** - Modern styling with gradients, animations, and flexbox
- **Vite** - Fast build tool and development server

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email service for notifications
- **bcryptjs** - Password hashing and security

## 📦 Project Structure

```
food-ordering-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── orderController.js    # Order management logic
│   │   ├── restaurantController.js # Restaurant operations
│   │   └── userController.js     # User authentication
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── models/
│   │   ├── Order.js              # Order data model
│   │   ├── Restaurant.js         # Restaurant data model
│   │   └── User.js               # User data model
│   ├── routes/
│   │   ├── orderRoutes.js        # Order API endpoints
│   │   ├── restaurantRoutes.js   # Restaurant API endpoints
│   │   └── userRoutes.js         # User API endpoints
│   ├── utils/
│   │   └── emailService.js       # Email notification service
│   ├── data/
│   │   ├── restaurants.js        # Sample restaurant data
│   │   └── users.js              # Sample user data
│   ├── seeder.js                 # Database seeding script
│   └── server.js                 # Main server file
├── frontend/
│   ├── public/
│   │   └── images/               # Static images and assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx          # Homepage hero section
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   ├── RestaurantCard.jsx # Restaurant display cards
│   │   │   ├── ProductCard.jsx   # Menu item cards
│   │   │   ├── ScrollToTop.jsx   # Scroll to top button
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Landing page
│   │   │   ├── RestaurantListPage.jsx # Restaurant browsing
│   │   │   ├── MenuPage.jsx      # Restaurant menu view
│   │   │   ├── CartPage.jsx      # Shopping cart
│   │   │   ├── PlaceOrderPage.jsx # Order checkout
│   │   │   ├── OrderConfirmationPage.jsx # Order success
│   │   │   ├── ProfilePage.jsx   # User profile
│   │   │   ├── LoginPage.jsx     # User login
│   │   │   └── RegisterPage.jsx  # User registration
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Authentication state
│   │   │   └── CartContext.jsx   # Shopping cart state
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # App entry point
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Preet-03/food-ordering-app.git
   cd food-ordering-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/foodorderingapp
   JWT_SECRET=your_jwt_secret_key_here
   
   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. **Database Setup**
   ```bash
   # Make sure MongoDB is running, then seed the database
   cd backend
   npm run seed
   ```

6. **Start the Application**
   
   **Backend Server** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend Development Server** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Application Screenshots

### Homepage
- Modern hero section with animated floating food icons
- Beautiful gradient backgrounds and smooth animations
- Interactive search functionality

### Restaurant Browsing
- Grid layout with animated restaurant cards
- Real-time search and filtering capabilities
- Hover effects and loading states

### Menu & Cart
- Detailed menu items with ratings and descriptions
- Smooth cart animations and notifications
- Streamlined checkout process

### Order Management
- Beautiful order confirmation with celebration effects
- Email notifications for order updates
- Order history and tracking

## 🎯 Key Features Explained

### **Authentication System**
- Secure JWT-based authentication
- Protected routes and middleware
- User profile management

### **Cart Management**
- Real-time cart updates
- Persistent cart state
- Animated notifications

### **Order Processing**
- Multi-step checkout process
- Order confirmation emails
- Order history tracking

### **Email Notifications**
- Automated order confirmations
- Beautiful HTML email templates
- SMTP integration with Gmail

## 🔧 API Endpoints

### **Authentication**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### **Restaurants**
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu

### **Orders**
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

## 🎨 Styling & Design

### **Design System**
- **Colors**: Purple/blue gradient theme (#667eea, #764ba2)
- **Typography**: Poppins font family for modern look
- **Animations**: CSS keyframes and transitions
- **Layout**: Flexbox and CSS Grid for responsive design

### **Animation Features**
- Hero section floating icons
- Card hover effects and transformations
- Button ripple effects and gradients
- Loading shimmer effects
- Smooth page transitions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **Protected Routes**: Middleware for route protection
- **CORS Configuration**: Proper cross-origin resource sharing

## 📧 Email Integration

The application includes automated email notifications:
- Order confirmation emails
- Beautiful HTML templates
- SMTP integration with Gmail
- Error handling for email failures

## 🌟 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized images and placeholders
- **Caching**: Efficient data caching strategies
- **Minification**: Production build optimization
- **Code Splitting**: Bundle optimization for faster loading

## 🧪 Testing

The application includes comprehensive error handling and validation:
- Form validation on client and server
- API error handling with user feedback
- Loading states and error boundaries
- Responsive design testing

## 🚀 Deployment

### **Backend Deployment (Heroku/Railway)**
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy using Git integration

### **Frontend Deployment (Vercel/Netlify)**
1. Build the production version
2. Configure environment variables
3. Deploy using Git integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Preet**
- GitHub: [@Preet-03](https://github.com/Preet-03)
- Project Link: [https://github.com/Preet-03/food-ordering-app](https://github.com/Preet-03/food-ordering-app)

## 🙏 Acknowledgments

- Unsplash for beautiful food images
- React community for excellent documentation
- MongoDB for database solutions
- All the amazing open-source libraries used in this project

---

⭐ **Star this repository if you found it helpful!** ⭐