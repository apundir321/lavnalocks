const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser= require('body-parser');
const router = express.Router();
require("dotenv").config();
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const Category = require("./models/category");
var MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");

require("./config/passport");

// require("./db/conn");
const Register = require('./models/user');
// const Register = require('./templates/views/register');
const { json } = require("express");
connectDB();

const port = process.env.PORT || 3000;


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use('/public', express.static(path.join(__dirname, "../public")));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    //session expires after 3 hours
    cookie: { maxAge: 60 * 1000 * 60 * 3 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// global variables across routes
app.use(async (req, res, next) => {
  try {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    const cUser = req.user;
    // console.log(cUser);
    // console.log(cUser.firstname);
    // console.log(cUser.email);

    
    const categories = await Category.find({}).sort({ title: 1 }).exec();
    res.locals.categories = categories;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//routes config
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/user");
const pagesRouter = require("./routes/pages");
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/pages", pagesRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



// app.get('/', (req, res) => {
//     // console.log(static_path+"   ((((");
//     res.render("index");
  
// });


app.post('/register', async (req, res) => {
    try{
        // console.log("inside register");
        // console.log(req.body);
        const password = req.body.pass;
        const cpassword = req.body.cpass;
        // console.log(password);
        // console.log(cpassword);
    
        if(password === cpassword){
            // console.log("inside confirm pass.");
            const registerEmployee = new Register({
                firstname : req.body.name,
                email : req.body.email,
                password : req.body.pass,
                confirmpassword : req.body.cpass
            })   
            // console.log(registerEmployee);
            const registered = await registerEmployee.save();
            res.status(201).render("login");
        }else{
            res.send("password are not matching");
        }
    
       }catch(error){
        console.log(error);
           res.status(400).send(error);
       }
    })


// ------------------FOR LOGIN------------------

   
app.post('/login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        
        if(useremail.pass === password){
            res.status(201).render("index");
        }else{
            res.send("Password is Incorrect");
        }
    }catch( error ){
        res.status(400).send("Invalid Email or Password.Please Try Again.");
    }
})



app.listen(3000, ()=>{
    console.log("listing on port 3000")
})