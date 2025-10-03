// backend/utils/emailService.js
import nodemailer from 'nodemailer';

// Create transporter with Gmail configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

// Generate order confirmation email HTML template
const generateOrderConfirmationEmail = (order) => {
  const orderItemsHtml = (order.orderItems || []).map(item => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 10px;">
        <img src="${item.image || '/images/placeholder.png'}" alt="${item.name || 'Item'}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
      </td>
      <td style="padding: 10px; font-weight: 500;">${item.name || 'Unknown Item'}</td>
      <td style="padding: 10px; text-align: center;">${item.qty || 1}</td>
      <td style="padding: 10px; text-align: right;">₹${(item.price || 0).toFixed(2)}</td>
      <td style="padding: 10px; text-align: right; font-weight: 600;">₹${((item.qty || 1) * (item.price || 0)).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ff6b6b, #ee5a52); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Order Confirmed!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Thank you for your order</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
        <div style="margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 10px;">Hi ${order.user?.name || 'Valued Customer'}!</h2>
          <p style="margin: 0; color: #666;">Your order has been confirmed and is being prepared. Here are the details:</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #333;">Order Details</h3>
          <p style="margin: 5px 0;"><strong>Order ID:</strong> ${order._id}</p>
          <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt || order.paidAt || Date.now()).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod || 'Card Payment'}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #333;">Delivery Address</h3>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; color: #666;">
            <p style="margin: 0;">${order.shippingAddress?.address || 'Address not provided'}</p>
            <p style="margin: 5px 0 0 0;">${order.shippingAddress?.city || 'City'}</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="margin: 0 0 15px 0; color: #333;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse; background: white; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Name</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
          </table>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Items Total:</span>
            <span>₹${(order.itemsPrice || 0).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Tax:</span>
            <span>₹${(order.taxPrice || 0).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>Shipping:</span>
            <span>₹${(order.shippingPrice || 0).toFixed(2)}</span>
          </div>
          <hr style="border: none; border-top: 2px solid #ddd; margin: 15px 0;">
          <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #333;">
            <span>Total Amount:</span>
            <span style="color: #ff6b6b;">₹${(order.totalPrice || 0).toFixed(2)}</span>
          </div>
        </div>

        <div style="text-align: center; margin-bottom: 30px;">
          <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #2e7d32; font-weight: 500;">
              🚚 Estimated delivery time: 30-45 minutes
            </p>
          </div>
          <p style="color: #666; margin: 0;">You will receive updates about your order via SMS and email.</p>
        </div>

        <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Need Help?</h3>
          <p style="margin: 0 0 15px 0; color: #666;">Contact our support team if you have any questions about your order.</p>
          <a href="mailto:support@foodorderingapp.com" style="background: #ff6b6b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">Contact Support</a>
        </div>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 14px;">
        <p style="margin: 0;">Thank you for choosing our service!</p>
        <p style="margin: 5px 0 0 0;">© 2025 Food Ordering App. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
};

// Send order confirmation email
const sendOrderConfirmationEmail = async (order) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Food Ordering App',
        address: process.env.EMAIL_USER
      },
      to: order.user.email,
      subject: `Order Confirmation - ${order._id}`,
      html: generateOrderConfirmationEmail(order),
      text: `
        Order Confirmation
        
        Hi ${order.user.name},
        
        Your order has been confirmed! 
        
        Order ID: ${order._id}
        Total Amount: ₹${order.totalPrice.toFixed(2)}
        
        Delivery Address:
        ${order.shippingAddress.address}
        ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}
        
        Estimated delivery time: 30-45 minutes
        
        Thank you for your order!
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: error.message };
  }
};

export { sendOrderConfirmationEmail };