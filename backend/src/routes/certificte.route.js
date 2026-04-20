const express = require("express");
const router = express.Router();

const certificateController  = require("../controller/certificate.controller");
const { adminMiddleware } = require("../middlewares/admin.middleware");
 
// Admin routes
// POST api/certificate/admin/add
router.post("/admin/add", certificateController.addCertificate);
// POST api/certificate/admin/bulk
router.post("/admin/bulk", certificateController.bulkUploadCertificates);

// Public route
// GET api/certificate/verify-certificate/:id
router.get("/verify-certificate/:id", certificateController.verifyCertificate);

module.exports = router;
