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

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background: #0f172a; color: #fff; padding: 18px;">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>
        <div style="padding: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${subject || "Website Inquiry"}</p>
          <hr />
          <h3>Message</h3>
          <p>${emailBody.replace(/\n/g, "<br>")}</p>
          <hr />
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background: #2563eb; color: #fff; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">Thank You, ${name}! 🎉</h2>
        </div>
        <div style="padding: 25px; line-height: 1.7;">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for contacting <strong>Nova Coders</strong>. Your inquiry has been received successfully.</p>
          <p>Our team will review your request and respond as soon as possible.</p>
       
          <p style="margin-top: 16px;">Thank you for choosing <strong>Nova Coders</strong>. 🚀</p>
          <hr />
          <p style="font-size: 13px; color: #666;">Nova Coders Team</p>
        </div>
      </div>
    `;

    const emailResults = await Promise.allSettled([
      sendMailHelper(
        process.env.EMAIL_USER,
        `📩 New Contact Form - ${subject || "Website Inquiry"}`,
        `New inquiry from ${name}`,
        adminEmailHtml,
      ),
      sendMailHelper(
        email,
        "We've received your message | Nova Coders",
        "",
        customerEmailHtml,
      ),
    ]);

    const failedEmails = emailResults
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason?.message || "Unknown email error");

    if (failedEmails.length > 0) {
      console.warn("Some emails could not be sent:", failedEmails);
    }

    res.status(201).json({
      success: true,
      message: "Contact message received successfully. Our team will get back to you soon.",
      data: newContact,
      emailStatus: failedEmails.length > 0 ? "partially-sent" : "sent",
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
