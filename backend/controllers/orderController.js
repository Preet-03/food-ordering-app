// backend/controllers/orderController.js
import Order from '../models/Order.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentMethod } = req.body;

  console.log('Received order data:', { orderItems, shippingAddress, itemsPrice, taxPrice, totalPrice });

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.image,
        description: item.description,
        restaurantId: item.restaurantId,
      })),
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice: shippingPrice || 0,
      totalPrice,
      paymentMethod: paymentMethod || 'Card Payment',
      isPaid: true, // Simulating successful payment
      paidAt: Date.now() // Simulating successful payment
    });

    try {
      const createdOrder = await order.save();
      
      // Populate user information for email
      await createdOrder.populate('user', 'name email');
      
      console.log('Order created successfully:', createdOrder);
      
      // Send order confirmation email
      try {
        const emailResult = await sendOrderConfirmationEmail(createdOrder);
        if (emailResult.success) {
          console.log('Order confirmation email sent successfully');
        } else {
          console.error('Failed to send order confirmation email:', emailResult.error);
        }
      } catch (emailError) {
        console.error('Error sending order confirmation email:', emailError);
        // Don't fail the order creation if email fails
      }
      
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(400).json({ message: 'Error creating order', error: error.message });
    }
  }
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      // ensure the requesting user owns the order
      if (order.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('getOrderById error', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { addOrderItems, getMyOrders, getOrderById };