const express = require("express");
const csrf = require("csurf");
const stripe = require("stripe")('sk_test_51IU1d5HwsJW6Q2MYyeVMXxah0ASBDEYnnoc9unuzpkPJbsNNqlKXW72IyM0fQLLSwF3w8OV61qzFvWsG3WqhkOwn00q4YvLQOs');
const Product = require("../models/lavnaproduct");
const Category = require("../models/category");
const Cart = require("../models/cart");
const Order = require("../models/order");
const middleware = require("../middleware");
const router = express.Router();
const app = express();
const crypto = require("crypto");
const bodyParser = require('body-parser');
const csrfProtection = csrf();
router.use(csrfProtection);
const nodemailer = require("nodemailer");
var Razorpay = require('razorpay');
const { body } = require("express-validator");
var instance = new Razorpay({
  key_id: 'rzp_live_AesJaVZnibvAwT',
  key_secret: 'GCQOfaLJglmH7AmoNLriiqPf'
})


// var instance = new Razorpay({
//   key_id: 'rzp_test_DTRatZbmdR7EnW',
//   key_secret: 'ZotkGhgBTy9mNNLl3350LNWe'
// })

let price = 2000,
  currency = 'INR',
  receipt = 'lavna_order_id',
  payment_capture = 1,
  notes = "lavna",
  order_id, payment_id;



// GET: home page
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
      .sort("-createdAt")
      .populate("category");

    res.render("index", {
      pageName: "Home", products,
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/index.html", async (req, res) => {
  try {
    const products = await Product.find({})
      .sort("-createdAt")
      .populate("category");

    res.render("index", {
      pageName: "Home", products,
      csrfToken: req.csrfToken()
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/cart", async (req, res) => {
  try {

    res.render("cart");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.use(bodyParser.json())

app.get('/register', (req, res) => {
  res.render("register");
})


router.get('/login', (req, res) => {
  res.render("login");
})

router.get('/about', (req, res) => {
  res.render("about");
})

router.get('/builder', (req, res) => {
  res.render("builder");
})

router.get('/distributor', (req, res) => {
  res.render("distributor");
})

router.get('/products', (req, res) => {
  res.render("products");
})


router.get('/shop', (req, res) => {
  res.render("shop");
})

router.get('/privacypolicy', (req, res) => {
  res.render("privacypolicy");
})


router.get('/faq', (req, res) => {
  res.render("faq");
})


router.get('/blog', (req, res) => {
  res.render("blog");
})





// GET: add a product to the shopping cart when "Add to cart" button is pressed
router.get("/add-to-cart/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    // get the correct cart, either from the db, session, or an empty cart.
    let user_cart;
    if (req.user) {
      user_cart = await Cart.findOne({ user: req.user._id });
    }
    let cart;
    if (
      (req.user && !user_cart && req.session.cart) ||
      (!req.user && req.session.cart)
    ) {
      cart = await new Cart(req.session.cart);
    } else if (!req.user || !user_cart) {
      cart = new Cart({});
    } else {
      cart = user_cart;
    }
    console.log(cart);
    // add the product to the cart
    const product = await Product.findOne({ title: productId }).exec();
    const itemIndex = cart.items.findIndex((p) => p.title == productId);
    if (itemIndex > -1) {
      // if product exists in the cart, update the quantity
      cart.items[itemIndex].qty++;
      cart.items[itemIndex].price = cart.items[itemIndex].qty * product.sellingPrice;
      cart.totalQty++;
      cart.totalCost += product.sellingPrice;
    } else {
      // if product does not exists in cart, find it in the db to retrieve its price and add new item
      cart.items.push({
        productId: product._id,
        qty: 1,
        price: product.sellingPrice,
        title: product.title
      });
      cart.totalQty++;
      cart.totalCost += product.sellingPrice;
    }

    // if the user is logged in, store the user's id and save cart to the db
    if (req.user) {
      cart.user = req.user._id;
      await cart.save();
    }
    req.session.cart = cart;
    req.flash("success", "Item added to the shopping cart");
    res.redirect("/shopping-cart");
    // res.redirect("/products/"+productId);
  } catch (err) {
    console.log(err.message);
    res.redirect("/shopping-cart");
  }
});

// GET: view shopping cart contents
router.get("/shopping-cart", async (req, res) => {
  try {

    console.log("inside shopping cart");
    // find the cart, whether in session or in db based on the user state
    let cart_user;
    if (req.user) {
      cart_user = await Cart.findOne({ user: req.user._id });
    }
    console.log(cart_user);
    // if user is signed in and has cart, load user's cart from the db
    if (req.user && cart_user) {
      console.log(" ****");
      req.session.cart = cart_user;
      let shippingCharge = await calculateShippingCharge(cart_user)
      console.log(shippingCharge)
      tax = ((cart_user.totalCost-shippingCharge)/118)*18
      subtotal = cart_user.totalCost - shippingCharge - tax
      cart_user.subTotal = subtotal.toFixed(2);
      cart_user.tax = tax.toFixed(2);
      cart_user.shippingCharge = shippingCharge;
      console.log(cart_user);
      return res.render("cart", {
        cart: cart_user,
        pageName: "Shopping Cart",
        products: await productsFromCart(cart_user)
      });
    }
    // if there is no cart in session and user is not logged in, cart is empty
    if (!req.session.cart) {

      console.log("no cart");
      return res.render("cart", {
        cart: null,
        pageName: "Shopping Cart",
        products: null,
      });
    }
    // otherwise, load the session's cart
    tax = ((req.session.cart.totalCost-250)/118)*18
    subtotal = req.session.cart.totalCost - 250 - tax
    req.session.cart.subTotal = subtotal.toFixed(2);
    req.session.cart.tax = tax.toFixed(2);
    console.log(req.session.cart);
    return res.render("cart", {
      cart: req.session.cart,
      pageName: "Shopping Cart",
      products: await productsFromCart(req.session.cart),
    });
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

// GET: reduce one from an item in the shopping cart
router.get("/reduce/:id", async function (req, res, next) {
  // if a user is logged in, reduce from the user's cart and save
  // else reduce from the session's cart
  const productId = req.params.id;
  let cart;
  try {
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else if (req.session.cart) {
      cart = await new Cart(req.session.cart);
    }

    // find the item with productId
    let itemIndex = cart.items.findIndex((p) => p.title == productId);
    if (itemIndex > -1) {
      // find the product to find its price
      const product = await Product.findOne({ title: productId }).exec();
      // if product is found, reduce its qty
      cart.items[itemIndex].qty--;
      cart.items[itemIndex].price -= product.sellingPrice;
      cart.totalQty--;
      cart.totalCost -= product.sellingPrice;
      // if the item's qty reaches 0, remove it from the cart
      if (cart.items[itemIndex].qty <= 0) {
        await cart.items.remove({ _id: cart.items[itemIndex]._id });
      }
      req.session.cart = cart;
      //save the cart it only if user is logged in
      if (req.user) {
        await cart.save();
      }
      //delete cart if qty is 0
      if (cart.totalQty <= 0) {
        req.session.cart = null;
        await Cart.findByIdAndRemove(cart._id);
      }
    }
    res.redirect(req.headers.referer);
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

// GET: remove all instances of a single product from the cart
router.get("/removeAll/:id", async function (req, res, next) {
  const productId = req.params.id;
  let cart;
  try {
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
    } else if (req.session.cart) {
      cart = await new Cart(req.session.cart);
    }
    //fnd the item with productId
    let itemIndex = cart.items.findIndex((p) => p.title == productId);
    if (itemIndex > -1) {
      //find the product to find its price
      cart.totalQty -= cart.items[itemIndex].qty;
      cart.totalCost -= cart.items[itemIndex].price;
      await cart.items.remove({ _id: cart.items[itemIndex]._id });
    }
    req.session.cart = cart;
    //save the cart it only if user is logged in
    if (req.user) {
      await cart.save();
    }
    //delete cart if qty is 0
    if (cart.totalQty <= 0) {
      req.session.cart = null;
      await Cart.findByIdAndRemove(cart._id);
    }
    res.redirect(req.headers.referer);
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});

// GET: checkout form with csrf token
router.get("/checkout", middleware.isLoggedIn, async (req, res) => {
  console.log("checking out");
  if (!req.isAuthenticated()) {
    console.log("authenticated");
  }
   const errorMsg = req.flash("error")[0];
 
  if (!req.session.cart) {
    return res.redirect("/shopping-cart");
  }
  //load the cart with the session's cart's id from the db
  if (req.user) {
    cart = await Cart.findById(req.session.cart._id);
      res.render("checkout1", {
      cart: cart,
      total: cart.totalCost,
      totalAmount: cart.totalCost*100,
      csrfToken: req.csrfToken(),
      errorMsg,
      key: "rzp_live_AesJaVZnibvAwT",
      // key: "rzp_test_DTRatZbmdR7EnW",
      pageName: "Checkout",
      order_id: order_id,
      products: await productsFromCart(cart)
    });
  }
  else {
    cart = req.session.cart;
    res.render("guest_checkout", {
      cart: cart,
      total: cart.totalCost,
      totalAmount: cart.totalCost*100,
      csrfToken: req.csrfToken(),
      errorMsg,
      
      key: "rzp_live_AesJaVZnibvAwT",
      // key: "rzp_test_DTRatZbmdR7EnW",
      pageName: "Checkout",
      order_id: order_id,
      products: await productsFromCart(cart)
    });
  }
  const errMsg = req.flash("error")[0];
});

router.get("/successpayment", async (req, res) => {
  res.render("success_payment",{});
});

router.get("/errorpayment", async (req, res) => {
  res.render("error_payment",{});
});


router.post("/createOrder", async (req, res) => {
  console.log("creating order");
  params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});

// POST: handle checkout logic and payment using Stripe
// router.post("/checkout", middleware.isLoggedIn, async (req, res) => {

//   console.log("checking out 2");
//   if (!req.session.cart) {
//     return res.redirect("/shopping-cart");
//   }
//   const cart = await Cart.findById(req.session.cart._id);
//   stripe.charges.create(
//     {

//       amount: cart.totalCost * 100,
//       currency: "usd",
//       source: req.body.stripeToken,
//       description: "Test charge",
//     },
//     function (err, charge) {
//       if (err) {
//         req.flash("error", err.message);
//         console.log(err);
//         return res.redirect("/checkout");
//       }
//       var tomorrow = new Date();
//       tomorrow.setDate(tomorrow.getDate()+4);
//       const order = new Order({
//         user: req.user,
//         cart: {
//           totalQty: cart.totalQty,
//           totalCost: cart.totalCost,
//           items: cart.items,
//         },
//         address: req.body.address,
//         paymentId: charge.id,
//         estDate: tommorow
//       });
//       order.save(async (err, newOrder) => {
//         if (err) {
//           console.log(err);
//           return res.redirect("/checkout");
//         }
//         await cart.save();
//         await Cart.findByIdAndDelete(cart._id);
//         // allOrders = await Order.find({ user: req.user });
//         // req.flash("success", "Successfully purchased");
//         req.session.cart = null;
//         allOrders = await Order.find({ user: req.user });
//         res.render("profile", {
//           orders: allOrders,
//           successMsg: "Successfully purchased",
//           pageName: "User Profile",
//         });
//       });
//     }
//   );
// });

router.post("/confirmOrder", async(req, res) => {
  try {
    console.log(req.body.order_pay_id);
    console.log(req.body.postDataJson);
    let body = req.body.order_id + "|" + req.body.order_pay_id;
    console.log(body);
    console.log(req.session.cart);
    const cart = await Cart.findById(req.session.cart._id);
    console.log(cart);
    // var expectedSignature = crypto
    //   .createHmac("sha256", "NlctE8WAxE9R5qWZesH0t1bU")
    //   .update(body.toString())
    //   .digest("hex");
    // console.log("sig" + req.body.order_sig);
    // console.log("sig" + expectedSignature);
    
    // if (expectedSignature === req.body.order_sig) {
            let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate()+4);
      console.log("****s");
      console.log(tomorrow);
      const order = new Order({
        user: req.user,
        cart: {
          totalQty: cart.totalQty,
          totalCost: cart.totalCost,
          items: cart.items,
        },
        address: "Gurgaon",
        paymentId: req.body.order_pay_id,
        estDate : tomorrow
      });
      order.save(async (err, newOrder) => {
        if (err) {
          console.log(err);
          return res.redirect("/checkout");
        }
        console.log("saved order")
        await cart.save();
        await Cart.findByIdAndDelete(cart._id);
        console.log("sending email");
        // allOrders = await Order.find({ user: req.user });
        // req.flash("success", "Successfully purchased");
        // let emailRes = await sendPaymentEmail(req.body.postDataJson,req.body.order_pay_id);
        
        console.log(req.body.postDataJson);
      // console.log(emailRes);  
        req.session.cart = null;
        var response = { status: "SUCCESS" };
        res.send(response);
      });
  } catch (error) {
    console.log(error);
    var response = { status: "failure" };
    res.send(response);
  }
});


router.post("/confirmGuestOrder", async(req, res) => {
  try {
    console.log(req.body.order_pay_id); 
    console.log(req.body.postDataJson);
    req.session.cart = null;
    var response = { status: "SUCCESS" };
    // let emailRes = await sendPaymentEmail(req.body.postDataJson,req.body.order_pay_id);
    console.log("sending email");
    // console.log(emailRes);
    res.send(response);
  } catch (error) {
    console.log(error);
    var response = { status: "failure" };
    res.send(response);
  }
});


router.post('/payment', function (req, res) {

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Gautam Sharma',
    address: {
      line1: 'TC 9/4 Old MES colony',
      postal_code: '110092',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
    }
  })
    .then((customer) => {

      return stripe.charges.create({
        amount: 7000,	 // Charing Rs 25 
        description: 'Web Development Product',
        currency: 'USD',
        customer: customer.id
      });
    })
    .then((charge) => {
      res.send("Success") // If no error occurs 
    })
    .catch((err) => {
      res.send(err)	 // If some error occurs 
    });
})


//POST: handle contact us form logic using nodemailer
router.post(
  "/contact-us"
  ,
  (req, res) => {
    // instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // company's email and password
        user: "bhagwnshrilocks@gmail.com",
        pass: "yuretciewpzuinxr",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // email options
    const mailOpts = {
      from: "bhagwnshrilocks@gmail.com",
      to: "lavnalocks@gmail.com",
      subject: `Enquiry from ${req.body.name}`,
      html:
        `
      <div>
      <h2 style="color: #478ba2; text-align:center;">Client's name: ${req.body.name}</h2>
      <h3 style="color: #478ba2;">Client's email: (${req.body.email})<h3>
      <h3 style="color: #478ba2;">Client's phone: (${req.body.phone})<h3>
      </div>
      <h3 style="color: #478ba2;">Client's message: </h3>
      <div style="font-size: 30;">
      ${req.body.message}
      </div>
      `
      ,
    };

    // send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        console.log(error);
        req.flash(
          "error",
          "An error occured... Please check your internet connection and try again later"
        );
        return res.redirect("/");
      } else {
        req.flash(
          "success",
          "Email sent successfully! Thanks for your inquiry."
        );
        return res.render("query");
      }
    });
  }
);


// create products array to store the info of each product in the cart
async function productsFromCart(cart) {
  // console.log(cart.items)
  let products = []; // array of objects
  for (const item of cart.items) {
    console.log(item.title);
    // console.log(item);
    let foundProduct =
      await Product.findOne({ title: item.title }).exec();
    console.log(foundProduct);
    if (item.qty) {
      foundProduct["qty"] = item.qty;
    }
    foundProduct["totalPrice"] = item.price;
    products.push(foundProduct);
  }
  console.log(products);
  return products;
}


async function sendPaymentEmail(postDataJson,payId) {
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // company's email and password
      user: "bhagwnshrilocks@gmail.com",
      pass: "yuretciewpzuinxr",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // email options
  const mailOpts = {
    from: "bhagwnshrilocks@gmail.com",
    to: "lavnalocks@gmail.com",
    subject: `Payment Success`,
    html:
      `
    <div>
    <h2 style="color: #478ba2; text-align:center;">Client's name: ${postDataJson.firstname}</h2>
    <h3 style="color: #478ba2;">Client's email: (${postDataJson.email})<h3>
    <h3 style="color: #478ba2;">Client's phone: (${postDataJson.phone})<h3>
    <h3 style="color: #478ba2;">Client's address: (${postDataJson.address})<h3>
    <h3 style="color: #478ba2;">Client's city: (${postDataJson.city})<h3>
    <h3 style="color: #478ba2;">Client's zip: (${postDataJson.zip})<h3>
    <h3 style="color: #478ba2;">Product name: (${postDataJson.titles})<h3>
    <h3 style="color: #478ba2;">Amount: (${postDataJson.amount})<h3>
    <h3 style="color: #478ba2;">Payment Id: (${payId})<h3>
    </div>
    `
    ,
  };

  // send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error);
    
      return response.send({ status: "SUCCESS" });
    } else {
      req.flash(
        "success",
        "Email sent successfully! Thanks for your inquiry."
      );
      return response.send({ status: "ERROR" });
    }
  });
}

async function calculateShippingCharge(cartItem){
  const productTitle = ['L-A15','L-S9']
  let totalCharge=0;
  for(let x of cartItem.items){
      if(productTitle.includes(x.title)){
        totalCharge += 150*x.qty
        continue
      }
      totalCharge +=250*x.qty
  }

  return totalCharge;
}

module.exports = router;
