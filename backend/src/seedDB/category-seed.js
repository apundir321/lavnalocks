const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Category = require("../models/category");
const Product = require("../models/product")
const LavnaProduct = require("../models/lavnaproduct")
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedCateg(titleStr,price,imagePath,desc) {
    try {
      const lavnaProduct = await new LavnaProduct({ title: titleStr,price: price,image:imagePath,description:desc });
      console.log(lavnaProduct);
      await lavnaProduct.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }
  await seedCateg("L-A8",14200,"/assets/img/lavna3.jpg","Meet the 4 in 1 Digital gate lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, and Key.");
  await seedCateg("L-A24",14200,"/assets/img/lavna4.jpg","Meet the 6 in 1 Digital fingerprint lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.");
  await seedCateg("L-A28-BLACK",8999,"/assets/img/lavna5.jpg","Meet the 6 in 1 Fingerprint door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.");
  await seedCateg("L-A28-GOLD",8999,"/assets/img/lavna6.jpg","Meet the 6 in 1 Fingerprint door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.");
  await seedCateg("L-A15",4999,"/assets/img/lavna8.jpg","Meet the 2 in 1 MOST Affordable Digital door lock from LAVNA Locks, which you can access from your fingerprint and Key.");
  await seedCateg("L-H300",7500,"/assets/img/lavna10.jpg","Meet the 2 in 1 smart lock for hotel doors from LAVNA Locks, which you can access from your RFID Card and Key.");
  await seedCateg("L-A5",13900,"/assets/img/lavna11.jpg","Meet the 4 in 1 Glass door security lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN and remote");
  await seedCateg("L-S9",13900,"/assets/img/lavna11.jpg","Meet the 2 in 1 Lock for your cabinets from LAVNA Locks, which you can access from your fingerprint and PIN.");
  await closeDB();
}

seedDB();
