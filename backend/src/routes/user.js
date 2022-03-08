const express = require("express");
const router = express.Router();
const csrf = require("csurf");
var passport = require("passport");
var user=require("../models/user");
var LocalStrategy = require("passport-local").Strategy;
const Product = require("../models/lavnaproduct");
const Order = require("../models/order");
const Cart = require("../models/cart");
const fs = require("fs");

const middleware = require("../middleware");
const {
  userSignUpValidationRules,
  userSignInValidationRules,
  validateSignup,
  validateSignin,
} = require("../config/validator");
const csrfProtection = csrf();
router.use(csrfProtection);

// GET: display the signup form with csrf token
router.get("/signup", middleware.isNotLoggedIn, (req, res) => {
  var errorMsg = req.flash("error");
  res.render("register", {
    csrfToken: req.csrfToken(),
    errorMsg,
    pageName: "Sign Up",
  });
});
// POST: handle the signup logic
router.post(
  "/signup",
  [
    middleware.isNotLoggedIn,
    userSignUpValidationRules(),
    validateSignup,
    passport.authenticate("local.signup", {
      successRedirect: "/user/signin",
      failureRedirect: "/user/signup",
      failureFlash: true,
    }),
  ],
  async (req, res) => {
    try {
      //if there is cart session, save it to the user's cart in db
      if (req.session.cart) {
        const cart = await new Cart(req.session.cart);
        cart.user = req.user._id;
        await cart.save();
      }
      // redirect to the previous URL
      if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/user/signin");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display the signin form with csrf token
router.get("/signin", middleware.isNotLoggedIn, async (req, res) => {
  var errorMsg = req.flash("error");
  res.render("login", {
    csrfToken: req.csrfToken(),
    errorMsg,
    pageName: "Sign In",
  });
});

// POST: handle the signin logic
router.post(
  "/signin",
  [
    middleware.isNotLoggedIn,
    userSignInValidationRules(),
    validateSignin,
    passport.authenticate("local.signin", {
      failureRedirect: "/user/signin",
      failureFlash: true,
    }),
  ],
  async (req, res) => {
    
    try {
      // cart logic when the user logs in
      let cart = await Cart.findOne({ user: req.user._id });
      // if there is a cart session and user has no cart, save it to the user's cart in db
      if (req.session.cart && !cart) {
        const cart = await new Cart(req.session.cart);
        cart.user = req.user._id;
        await cart.save();
      }
      // if user has a cart in db, load it to session
      if (cart) {
        req.session.cart = cart;
      }
      // redirect to old URL before signing in
      if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        console.log(oldUrl);
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      } else {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/");
    }
  }
);

// GET: display user's profile
// GET: display user's dashboard
router.get("/dashboard", middleware.isLoggedIn, async (req, res) => {
  try {
    console.log(req.user);
    allOrders = await Order.find({ user: req.user });
    allOrders.userName = req.user.firstname;
    allOrders.estDate = req.user.estDate;
    console.log(allOrders.estDate);
    for(let order of allOrders){
      for(let item of order.cart.items){
        let foundProduct =await Product.findOne({ title: item.title}).exec();
        console.log(foundProduct.image);
        order.url =  foundProduct.image;
        order.estimatedString = order.estDate.toLocaleString();
      }
    }
    console.log(allOrders)
    res.render("dashboard", {
    orders: allOrders,      
      pageName: "User Profile",
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});


// GET: display user's orders
router.get("/orders", middleware.isLoggedIn, async (req, res) => {
  // console.log(req.flash("success"));
  // console.log(req.flash("success").length);
  // const successMsg = req.flash("success")[0];
  // const errorMsg = req.flash("error")[0];
  try {
    // find all orders of this user
    allOrders = await Order.find({ user: req.user });
    allOrders.userName = req.user.firstname
    let orderProducts = []; 
    for(let order of allOrders){
      console.log(order.cart.items);
      for(let item of order.cart.items)
      {
      let foundProduct =await Product.findOne({ title: item.title}).exec();
      console.log(foundProduct.image);
      order.url =  foundProduct.image;
        if(order.Delivered == true){
          order.status = "Delivered";
        }else{
          order.status = "Dispatched";
        }
        console.log(order.status);
      }
      order.estimatedString = order.estDate.toLocaleString();
      console.log("hi",order,order.cart.items);
      orderProducts.push(order);

    }
    console.log(allOrders);
    res.render("orders", {
      orders: allOrders,
      
      pageName: "User Profile",
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});


router.get("/settings", middleware.isLoggedIn, async (req, res) => {
  // console.log(req.flash("success"));
  // console.log(req.flash("success").length);
  // const successMsg = req.flash("success")[0];
  // const errorMsg = req.flash("error")[0];
  try {
    // find all orders of this user
    allOrders = await Order.find({ user: req.user });
    allOrders.userName = req.user.firstname
    allOrders.email = req.user.email
    allOrders.password = req.user.password
    console.log("hiiiiiiiiii", allOrders.userName);
    console.log("your email:", allOrders.email);
    console.log(allOrders.password);
    console.log(req.csrfToken());
    let msg = req.query.msg;
    console.log(msg+" &&&&");
    if(!msg)
    {
      msg = "";
    }else if(msg==="success"){
      msg = "Profile Updated"
    }else if(msg==="invalid"){
      msg = "Password invalid please try again with correct password"
    }
    res.render("settings", {
      orders: allOrders,
      userInfo:req.user,
      csrfToken:req.csrfToken(),
      pageName: "User Profile",
      msg: msg
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
});

// router.post("/uploadImage", middleware.isLoggedIn, async (req, res) => {
//   console.log(req.body.avatar);
//   console.log(req);
//   return res.redirect("/user/settings");
// }
// )


router.post("/profileUpdate",  middleware.isLoggedIn, async (req, res) => {
  console.log("In profileUpdate this route");
  const { name, email, ct_pass, nw_pass, cf_nw_pass } = req.body;
  console.log(name);
 console.log(req.user);
  user.findOne({ _id: req.user._id})
    .then((user) => {
      if (!user) {
        req.flash("error_msg", "user not found");
        res.redirect("/users/profileUpdate");
      }
      console.log(user);
      if (typeof name !== "undefined") {
        user.firstname = name;
        console.log(user.name);
      }
      console.log(user);

      // user.save().then((User) => {
      //   req.flash("success_msg", "details updated successfully");
      //   res.redirect("/users/profileUpdate");
      // });

      user.save(function (err, resolve) {
        if(err)
          console.log('db error', err)
         });
        return res.redirect('/user/settings?msg=success')
    })
    .catch((err) => console.log(err));
});


router.post("/passUpdate",  middleware.isLoggedIn, async (req, res) => {
  // console.log("In passUpdate this route");
  const { ct_pass, nw_pass, cf_nw_pass } = req.body;
//  console.log(req.user);
  user.findOne({ _id: req.user._id})
    .then((user) => {
      
      if (!user) {
        req.flash("error_msg", "user not found");
        res.redirect("/users/passUpdate");
      }
      console.log(user.validPassword(ct_pass));
      if (typeof nw_pass == "undefined" || !user.validPassword(ct_pass) || nw_pass != cf_nw_pass) {
        console.log('password not update');
        return res.redirect('/user/settings?msg=invalid');

        // console.log(user.nw_pass);
      }
      user.password = user.encryptPassword(nw_pass)
      console.log(user);
        user.save(function (err, resolve) {
          if(err)
            console.log('db error', err)
           });
          //  console.log("succesfully compared!");           
        return res.redirect('/user/settings?msg=success');
        


      // user.save().then((User) => {
      //   req.flash("success_msg", "details updated successfully");
      //   res.redirect("/users/profileUpdate");
      // });

  
    })
    .catch((err) => console.log(err));
    
});


// GET: logout
router.get("/logout", middleware.isLoggedIn, (req, res) => {
  req.logout();
  req.session.cart = null;
  res.redirect("/");
});
module.exports = router;
