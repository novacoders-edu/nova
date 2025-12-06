const express = require("express");
const authController = require("../controller/auth.controller");
const validators = require("../middlewares/validator.middleware");
const authmiddleware = require("../middlewares/auth.middleware");


const router = express.Router();

router.get('/',(req, res)=>{
  res.send('API is running...');
});

// POST api/auth/register
router.post(
  "/register",
  validators.registerUserValidations,
  authController.registerUser
);

// POST api/auth/login
router.post(
  "/login",
  validators.loginUserValidations,
  authController.loginUser
);

// GET api/auth/me
router.get("/me", authmiddleware.authMiddleware, authController.getCurrentUser);

// GET api/auth/logout
router.get("/logout", authController.logoutUser);



module.exports = router;
