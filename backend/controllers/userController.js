import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will be valid for 30 days
  });
};

// @desc    Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, address, city } = req.body;

  try {
    // 1. Check if all fields are present
    if (!name || !email || !password || !address || !city) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    // Save provided address into the addresses array so profile/address endpoints work
    const initialAddresses = [];
    if (address && city) {
      initialAddresses.push({
        type: 'home',
        street: address,
        city,
        // Provide minimal default values to satisfy required schema fields
        state: req.body.state || 'N/A',
        zipCode: req.body.zipCode || '000000',
        isDefault: true,
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      addresses: initialAddresses,
      // Also set top-level address fields for compatibility
      address: initialAddresses[0] ? initialAddresses[0].street : '',
      city: initialAddresses[0] ? initialAddresses[0].city : '',
      state: initialAddresses[0] ? initialAddresses[0].state : '',
      zipCode: initialAddresses[0] ? initialAddresses[0].zipCode : '',
    });

    // 5. If user created successfully, send back user data and token
    if (user) {
      // Provide both addresses array and top-level address/city for backward compatibility
      const primaryAddress = user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
        address: primaryAddress ? primaryAddress.street : '',
        city: primaryAddress ? primaryAddress.city : '',
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('RegisterUser error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Return addresses plus address/city for compatibility with frontend
      const primaryAddress = user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
        address: primaryAddress ? primaryAddress.street : '',
        city: primaryAddress ? primaryAddress.city : '',
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

import { protect } from '../middleware/authMiddleware.js';

// @desc    Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses,
        paymentMethods: updatedUser.paymentMethods,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add new address
const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // If this is the first address or marked as default, update others
      if (req.body.isDefault) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }

      user.addresses.push(req.body);
      await user.save();

      res.status(201).json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update address
const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      const addressIndex = user.addresses.findIndex(
        addr => addr._id.toString() === req.params.id
      );

      if (addressIndex !== -1) {
        // If this address is marked as default, update others
        if (req.body.isDefault) {
          user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses[addressIndex] = {
          ...user.addresses[addressIndex].toObject(),
          ...req.body
        };

        await user.save();
        res.json(user.addresses);
      } else {
        res.status(404).json({ message: 'Address not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete address
const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.addresses = user.addresses.filter(
        addr => addr._id.toString() !== req.params.id
      );

      await user.save();
      res.json(user.addresses);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add payment method
const addPaymentMethod = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // If this is the first payment method or marked as default, update others
      if (req.body.isDefault) {
        user.paymentMethods.forEach(method => method.isDefault = false);
      }

      user.paymentMethods.push(req.body);
      await user.save();

      res.status(201).json(user.paymentMethods);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      const methodIndex = user.paymentMethods.findIndex(
        method => method._id.toString() === req.params.id
      );

      if (methodIndex !== -1) {
        // If this method is marked as default, update others
        if (req.body.isDefault) {
          user.paymentMethods.forEach(method => method.isDefault = false);
        }

        user.paymentMethods[methodIndex] = {
          ...user.paymentMethods[methodIndex].toObject(),
          ...req.body
        };

        await user.save();
        res.json(user.paymentMethods);
      } else {
        res.status(404).json({ message: 'Payment method not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete payment method
const deletePaymentMethod = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.paymentMethods = user.paymentMethods.filter(
        method => method._id.toString() !== req.params.id
      );

      await user.save();
      res.json(user.paymentMethods);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
};
