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

//GET: display abous us page
router.get("/about-us", (req, res) => {
  res.render("pages/about-us", {
    pageName: "About Us",
  });
});

//GET: display shipping policy page
router.get("/shipping-policy", (req, res) => {
  res.render("pages/shipping-policy", {
    pageName: "Shipping Policy",
  });
});

//GET: display careers page
router.get("/careers", (req, res) => {
  res.render("pages/careers", {
    pageName: "Careers",
  });
});

//GET: display contact us page and form with csrf tokens
router.get("/contact-us", (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error");
  res.render("pages/contact-us", {
    pageName: "Contact Us",
    csrfToken: req.csrfToken(),
    successMsg,
    errorMsg,
  });
});

//POST: handle contact us form logic using nodemailer
router.post(
  "/contact-us",
  [userContactUsValidationRules(), validateContactUs],
  (req, res) => {
    // instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // company's email and password
        user: "anuragpundir621@gmail.com",
        pass: "OURINDIA12",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // email options
    const mailOpts = {
      from: "anuragpundir621@gmail.com",
      to: "anuragpundir631@gmail.com",
      subject: `Enquiry from `,
      html: `
      test email
      `,
    };

    // send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        req.flash(
          "error",
          "An error occured... Please check your internet connection and try again later"
        );
        return res.redirect("/pages/contact-us");
      } else {
        req.flash(
          "success",
          "Email sent successfully! Thanks for your inquiry."
        );
        return res.redirect("/pages/contact-us");
      }
    });
  }
);

module.exports = router;
