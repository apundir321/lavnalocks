let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
 
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
 req.session.oldUrl = req.url;
  res.redirect("/user/signin?returnUrl="+req.url);
};

middlewareObject.isProductCheckout = (req,res,next)=>{
  if (req.isAuthenticated()) {
    console.log("i am here at product middleware")
    return next();
  }
  res.redirect(`/user/signin/?title=${req.params.name}`);
}



module.exports = middlewareObject;
