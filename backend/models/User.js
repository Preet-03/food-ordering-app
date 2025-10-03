import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can share the same email
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    // Top-level address fields for compatibility and easier queries
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    zipCode: {
      type: String,
      default: ''
    },
    addresses: [{
      type: {
        type: String,
        enum: ['home', 'work', 'other'],
        default: 'home'
      },
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }],
    paymentMethods: [{
      type: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'net_banking'],
        required: true
      },
      cardNumber: {
        type: String,
        required: function() {
          return ['credit_card', 'debit_card'].includes(this.type);
        }
      },
      cardHolderName: {
        type: String,
        required: function() {
          return ['credit_card', 'debit_card'].includes(this.type);
        }
      },
      expiryDate: {
        type: String,
        required: function() {
          return ['credit_card', 'debit_card'].includes(this.type);
        }
      },
      cvv: {
        type: String,
        required: function() {
          return ['credit_card', 'debit_card'].includes(this.type);
        }
      },
      upiId: {
        type: String,
        required: function() {
          return this.type === 'upi';
        }
      },
      bankName: {
        type: String,
        required: function() {
          return this.type === 'net_banking';
        }
      },
      accountNumber: {
        type: String,
        required: function() {
          return this.type === 'net_banking';
        }
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // New users are not admins by default
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model('User', userSchema);

export default User;