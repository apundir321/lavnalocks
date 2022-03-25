const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const Product = require("../models/product");
const Category = require("../models/category");
const LawnaProduct = require("../models/lavnaproduct");
var moment = require("moment");
const csrfProtection = csrf();
const middleware = require("../middleware");
router.use(csrfProtection);

// // GET: display all products
// router.get("/", async (req, res) => {
//   const successMsg = req.flash("success")[0];
//   const errorMsg = req.flash("error")[0];
//   const perPage = 8;
//   let page = parseInt(req.query.page) || 1;
//   try {
//     const products = await Product.find({})
//       .sort("-createdAt")
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .populate("category");

//     const count = await Product.count();

//     res.render("shop/index", {
//       pageName: "All Products",
//       products,
//       successMsg,
//       errorMsg,
//       current: page,
//       breadcrumbs: null,
//       home: "/products/?",
//       pages: Math.ceil(count / perPage),
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect("/");
//   }
// });

router.get('/:name',async (req, res) => {
  console.log(req.params.name+"   ****");
  const foundProduct = await LawnaProduct.findOne({ title: req.params.name }).exec();
  console.log(foundProduct);
  res.render("products",{
    product:foundProduct
  });
  console.log(foundProduct)
})

router.get("/checkout/:name",  middleware.isProductCheckout, async (req, res) => {
  console.log("checking out");
  console.log(req.params.name+"   ****");
  const foundProduct = await LawnaProduct.findOne({ title: req.params.name }).exec();
  if(!Object.keys(foundProduct).length){
    res.redirect(`/`);
  }
  console.log(foundProduct);
  //load the cart with the session's cart's id from the db
  let shippingCharge = await calculateShippingCharge(foundProduct);
  let couponApply = false;
  let popup = 0;
  let couponAmount =0;
  if((req.query.coupon == "LAVNA799" && foundProduct.title == "L-A24-Black(Bluetooth)") || req.query.coupon == "LAVNA799" && foundProduct.title == "L-A24-GOLD"){ 
    couponApply = true;
    couponAmount = 799
    popup = 1;
  }

  if(req.query.coupon == "LAVNA5" && (foundProduct.title == "L-A28-Black(Bluetooth)" || foundProduct.title == "L-A28-GOLD")){
    couponApply = true
    couponAmount = (foundProduct.sellingPrice/100)*5
    couponAmount = couponAmount.toFixed(2)
    popup = 1;
  }

  if(req.query.coupon != "LAVNA799" && req.query.coupon != "LAVNA5"){
    couponApply = false;
    popup = 2;
  }
  console.log(req.query);
  console.log(shippingCharge)
  console.log(couponApply == true?foundProduct.sellingPrice-couponAmount:foundProduct.sellingPrice)
      tax = ((foundProduct.sellingPrice-shippingCharge)/118)*18
      subtotal = foundProduct.sellingPrice - shippingCharge - tax
      console.log(tax,subtotal);
      res.render("single_checkout", {
      products:foundProduct,
      couponApply:couponApply,
      total: couponApply == true?parseInt(foundProduct.sellingPrice-couponAmount):foundProduct.sellingPrice,
      totalAmount: foundProduct.sellingPrice*100,
      shippingCharge:shippingCharge,
      tax:tax.toFixed(2),
      subtotal:subtotal.toFixed(2),
      csrfToken: req.csrfToken(),
      // key: "rzp_live_AesJaVZnibvAwT",
      popup:popup,
      couponAmount:couponAmount,
      key: "rzp_test_DTRatZbmdR7EnW"
    });

  });



router.get('/variant/a24',async (req, res) => {
 
  // const foundProduct = await LawnaProduct.findOne({ title: req.params.name }).exec();
  // console.log(foundProduct.count());
  res.render("newproductL-A24");
})

router.get('/variant/a24/black',async (req, res) => {
 
  // const foundProduct = await LawnaProduct.findOne({ title: req.params.name }).exec();
  // console.log(foundProduct.count());
  res.render("newproductL-A24-black");
  
})

router.get('/variant/a28',async (req, res) => {
 
  // const foundProduct = await LawnaProduct.findOne({ title: req.params.name }).exec();
  // console.log(foundProduct.count());
  res.render("newproduct");
})

router.get('/variant/a28/black',async (req, res) => {
 
  // const foundProduct = await LawnaProduct.findOne({ title: req.params.name }).exec();
  // console.log(foundProduct.count());
  res.render("newproduct-black");
})

// GET: search box
router.get("/search", async (req, res) => {
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];

  try {
    const products = await Product.find({
      title: { $regex: req.query.search, $options: "i" },
    })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category")
      .exec();
    const count = await Product.count({
      title: { $regex: req.query.search, $options: "i" },
    });
    res.render("shop/index", {
      pageName: "Search Results",
      products,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: null,
      home: "/products/search?search=" + req.query.search + "&",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//GET: get a certain category by its slug (this is used for the categories navbar)
router.get("/:slug", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  try {
    const foundCategory = await Category.findOne({ slug: req.params.slug });
    const allProducts = await Product.find({ category: foundCategory.id })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category");

    const count = await Product.count({ category: foundCategory.id });

    res.render("shop/index", {
      pageName: foundCategory.title,
      currentCategory: foundCategory,
      products: allProducts,
      successMsg,
      errorMsg,
      current: page,
      breadcrumbs: req.breadcrumbs,
      home: "/products/" + req.params.slug.toString() + "/?",
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

// GET: display a certain product by its id
router.get("/:slug/:id", async (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error")[0];
  try {
    const product = await Product.findById(req.params.id).populate("category");
    res.render("shop/product", {
      pageName: product.title,
      product,
      successMsg,
      errorMsg,
      moment: moment,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

async function calculateShippingCharge(product){
  const productTitle = ['L-A15','L-S9']
  console.log(product);
  let totalCharge=0;
      if(productTitle.includes(product.title)){
        totalCharge += 150
        return totalCharge;
      }
      totalCharge +=250

  return totalCharge;
}

module.exports = router;
