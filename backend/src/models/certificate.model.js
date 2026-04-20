const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
    },

    eventName: {
      type: String,
      index: true,
    },

    role: {
      type: String,
      //   enum: ["Participant", "Organizer", "Volunteer", "Winner", "Runner-up", "coordinator"],
      default: "coordinator",
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    isValid: {
      type: Boolean,
    },

    issuedBy: {
      type: String,
      default: "Nova Coders",
    },
  },
  { timestamps: true },
);
const certificateModel = mongoose.model("Certificate", certificateSchema);

module.exports = certificateModel;
