const contactModel = require("../models/contact.model");
const sendMailHelper = require("../utils/email");

// POST - Create contact message
const createContact = async (req, res) => {
  try {
    console.log("Received contact form submission:", req.body);

    const { name, phone, email, url, message, subject } = req.body;

    const newContact = new contactModel({
      name,
      phone,
      email,
      url,
      message,
    });

    console.log("Saving new contact message:", newContact);
    await newContact.save();
    console.log("Contact message saved successfully:", newContact._id);

    const emailBody = [
      `Subject: ${subject || "New contact form submission"}`,
      "",
      message || "No additional details provided.",
      url ? `Website: ${url}` : "",
    ]
      .filter(Boolean)
      .join("\n");

 // Send notification to Admin
await sendMailHelper(
  process.env.EMAIL_USER,
  `📩 New Contact Form - ${subject || "Website Inquiry"}`,
  `New inquiry from ${name}`,
  `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
    <div style="background:#0f172a; color:#fff; padding:18px;">
      <h2 style="margin:0;">📩 New Contact Form Submission</h2>
    </div>

    <div style="padding:20px;">
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <td><strong>Name</strong></td>
          <td>${name}</td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Phone</strong></td>
          <td>${phone || "N/A"}</td>
        </tr>
        <tr>
          <td><strong>Subject</strong></td>
          <td>${subject || "Website Inquiry"}</td>
        </tr>
      </table>

      <hr>

      <h3>Message</h3>

      <p>${emailBody.replace(/\n/g, "<br>")}</p>

      <hr>

      <p><b>Submitted:</b> ${new Date().toLocaleString()}</p>
    </div>
  </div>
  `
);

// Send confirmation email to customer (don't block API)
try {
  await sendMailHelper(
    email,
    "✅ We've received your message | Nova Coders",
    "",
    `
    <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #ddd;border-radius:8px;overflow:hidden;">

      <div style="background:#2563eb;color:#fff;padding:20px;text-align:center;">
        <h2 style="margin:0;">Thank You, ${name}! 🎉</h2>
      </div>

      <div style="padding:25px;line-height:1.7;">

        <p>Hello <b>${name}</b>,</p>

        <p>
          Thank you for contacting <b>Nova Coders</b>.
          Your inquiry has been received successfully.
        </p>

        <p>
          Our team will review your request and respond as soon as possible.
        </p>

        <div style="background:#f8fafc;padding:15px;border-radius:6px;">
          <h4>Your Submission</h4>

          <p><b>Subject:</b> ${subject || "Website Inquiry"}</p>

          <p><b>Message:</b></p>

          <p>${emailBody.replace(/\n/g, "<br>")}</p>
        </div>

        <br>

        <p>
          Thank you for choosing <b>Nova Coders</b>. 🚀
        </p>

        <hr>

        <p style="font-size:13px;color:#666;">
          Nova Coders Team
        </p>

      </div>

    </div>
    `
  );
} catch (emailError) {
  console.error("Error sending confirmation email to customer:", emailError);
}
    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
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
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error getting contact messages:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// DELETE - Delete contact message
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await contactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContact,
};
