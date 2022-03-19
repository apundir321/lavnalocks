const express = require("express");
const csrf = require("csurf");
const nodemailer = require("nodemailer");
const router = express.Router();
const {
  userContactUsValidationRules,
  validateContactUs,
} = require("../config/validator");
const csrfProtection = csrf();
router.use(csrfProtection);


router.get("/l-a24", async function (req, res, next) {
    res.render("offer_l-a24");
  });




module.exports = router;
