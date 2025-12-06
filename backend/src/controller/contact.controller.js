const contactModel = require("../models/contact.model");

// POST - Create contact message
const createContact = async (req, res) => {
  try {
    console.log("Received contact form submission:", req.body);
    
    const {
      name,
      phone,
      email,
      url,
      message
    } = req.body;

    // Create new contact message
    const newContact = new contactModel({
      name,
      phone,
      email,
      url,
      message
    });

    console.log("Saving new contact message:", newContact);
    await newContact.save();
    console.log("Contact message saved successfully:", newContact._id);

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      data: newContact
    });

  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// GET - Get all contact messages
const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    const contacts = await contactModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await contactModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Contact messages retrieved successfully",
      data: contacts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: contacts.length,
        totalRecords: total
      }
    });

  } catch (error) {
    console.error("Error getting contact messages:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// PATCH - Update contact status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedContact = await contactModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      data: updatedContact
    });

  } catch (error) {
    console.error("Error updating contact status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContactStatus
};