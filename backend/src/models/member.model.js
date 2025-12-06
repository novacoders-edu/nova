const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  membershipId: {
    type: String,
    unique: true,
    default: function() {
      return 'NC' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  university: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
  motivation: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  newsletter: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const memberModel = mongoose.model("CommunityMember", memberSchema);

module.exports = memberModel;