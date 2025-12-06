const express = require("express");
const contactController = require("../controller/contact.controller");
const validators = require("../middlewares/validator.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const router = express.Router();

// POST api/contact/create - Public route for form submissions
router.post("/create", validators.createContactValidations, contactController.createContact);

// GET api/contact/all - Admin only
router.get("/all", adminMiddleware, contactController.getAllContacts);

// PATCH api/contact/:id/status - Admin only
router.patch("/:id/status", adminMiddleware, contactController.updateContactStatus);

module.exports = router;