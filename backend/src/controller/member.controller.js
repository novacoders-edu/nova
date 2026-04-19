const memberModel = require("../models/member.model");

// POST - Join member
const joinMember = async (req, res) => {
  try {
    console.log("Received member join request:", req.body);
    
    const {
      fullName,
      email,
      phone,
      university,
      year,
      interests,
      motivation,
      experience,
      github,
      linkedin,
      newsletter
    } = req.body;

    // Check if member already exists
    console.log("Checking for existing member with email:", email);
    const existingMember = await memberModel.findOne({ email });
    if (existingMember) {
      console.log("Member already exists:", existingMember.email);
      return res.status(400).json({
        success: false,
        message: "Member already exists"
      });
    }

    // Create new member
    const newMember = new memberModel({
      fullName,
      email,
      phone,
      university,
      year,
      interests,
      motivation,
      experience,
      github,
      linkedin,
      newsletter
    });

    console.log("Saving new member:", newMember);
    await newMember.save();
    console.log("Member saved successfully:", newMember._id);

    res.status(201).json({
      success: true,
      message: "Member joined successfully",
      data: newMember
    });

  } catch (error) {
    console.error("Error joining member:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// GET - Get all members
const getAllMembers = async (req, res) => {
  try {
    const { limit = 50, skip = 0, status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const members = await memberModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const totalRecords = await memberModel.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: {
        members,
        pagination: {
          totalRecords,
          limit: parseInt(limit),
          skip: parseInt(skip),
        },
      },
      count: members.length
    });

  } catch (error) {
    console.error("Error getting members:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// DELETE - Delete member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await memberModel.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
      data: deletedMember,
    });

  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  joinMember,
  getAllMembers,
  deleteMember
};