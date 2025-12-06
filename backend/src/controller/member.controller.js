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
    const members = await memberModel.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: members,
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

module.exports = {
  joinMember,
  getAllMembers
};