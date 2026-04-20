const certificateModel = require("../models/certificate.model");

// ADMIN: Add single certificate
const addCertificate = async (req, res) => {
  try {
    const data = req.body;
    const isDuplicate = await certificateModel.findOne({
      certificateId: data.certificateId,
    });
    if (isDuplicate) {
      return res.status(400).json({
        error: "Certificate with this ID already exists",
      });
    }

    const cert = await certificateModel.create({
      ...data,
    });

    res.status(201).json({
      success: true,
      message: "Certificate created",
      certificateId: cert.certificateId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: Bulk upload
const bulkUploadCertificates = async (req, res) => {
  try {
    const users = req.body; // array of certificates

    const preparedData = users.map((user) => {
      return {
        ...user,
      };
    });

    try {
      await certificateModel.insertMany(preparedData, { ordered: false });
      res.json({
        success: true,
        message: "Bulk certificates uploaded",
        count: preparedData.length,
      });
    } catch (bulkError) {
      // Handle duplicate key or validation errors
      res.status(207).json({
        success: false,
        message: "Some certificates could not be uploaded",
        error: bulkError.writeErrors
          ? bulkError.writeErrors.map((e) => e.errmsg)
          : bulkError.message,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUBLIC: Verify certificate
const verifyCertificate = async (req, res) => {
  try {
    const certificateId =
      req.params.id || req.query.certificateId || req.query.id;

    if (!certificateId) {
      return res.status(400).json({
        message: "Certificate ID required",
      });
    }

    const cert = await certificateModel
      .findOne({
        certificateId,
        isValid: true,
      })
      .select("-_id name college eventName role issueDate issuedBy");

    if (!cert) {
      return res.status(404).json({
        valid: false,
        message: "Certificate not found or invalid",
      });
    }

    res.json({
      valid: true,
      data: cert,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addCertificate,
  bulkUploadCertificates,
  verifyCertificate,
};
