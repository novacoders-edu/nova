const express = require("express");
const memberController = require("../controller/member.controller");
const validators = require("../middlewares/validator.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const router = express.Router();

// POST api/member/join-member - Public route for member registration
router.post("/join-member", validators.joinMemberValidations, memberController.joinMember);

// GET api/member/all - Admin only
router.get("/all", adminMiddleware, memberController.getAllMembers);

module.exports = router;