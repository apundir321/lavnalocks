const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Category = require("../models/category");
const Product = require("../models/product")
const LavnaProduct = require("../models/lavnaproduct")
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedCateg(titleStr,price,imagePath,sp,desc,subp,feat) {
    try {
      const lavnaProduct = await new LavnaProduct({ title: titleStr,price: price,image:imagePath,sellingPrice:sp,description:desc,subItems:subp,features:feat });
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
  await seedCateg("L-A8",14200,"/assets/img/lavna3.jpg",9900,"Meet the 4 in 1 Digital gate lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, and Key.",null,"feature-LA8");
  await seedCateg("L-A24-BLACK",14200,"/assets/img/lavna4.jpg",8300,"Meet the 6 in 1 Digital fingerprint lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.",[
    {
        "title": "L-A24(Bluetooth)",
        "price": 14200,
        "sellingPrice": 8300,
        "image": "assets/img/lavna11.jpg"
    },
    {
        "title": "L-A24(WI-FI)",
        "price": 15700,
        "sellingPrice": 9800,
        "image": "assets/img/lavna11.jpg"
    }
],"features-L-A24-BLACK");
  await seedCateg("L-A24-GOLD",14200,"/assets/img/lavna4.jpg",8300,"Meet the 6 in 1 Digital fingerprint lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.",[
    {
        "title": "L-A24(Bluetooth)",
        "price": 14200,
        "sellingPrice": 8300,
        "image": "/assets/img/lavna4.jpg"
    },
    {
        "title": "L-A24(WI-FI)",
        "price": 15700,
        "sellingPrice": 9800,
        "image": "/assets/img/lavna4.jpg"
    }
],"features-L-A24-GOLD");
  await seedCateg("L-A28-BLACK",8999,"/assets/img/lavna5.jpg",7600,"Meet the 6 in 1 Fingerprint door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.",null,"features-L-A28-BLACK");
  await seedCateg("L-A28-GOLD",8999,"/assets/img/lavna6.jpg",7600,"Meet the 6 in 1 Fingerprint door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.",null,"features-L-A28-GOLD");
  await seedCateg("L-A15",4999,"/assets/img/lavna8.jpg",3899,"Meet the 2 in 1 MOST Affordable Digital door lock from LAVNA Locks, which you can access from your fingerprint and Key.",null,"features-L-A15");
  await seedCateg("L-H300",7500,"/assets/img/lavna10.jpg",4300,"Meet the 2 in 1 smart lock for hotel doors from LAVNA Locks, which you can access from your RFID Card and Key.",null,"features-L-H300");
  await seedCateg("L-A5",13900,"/assets/img/lavna11.jpg",8700,"Meet the 4 in 1 Glass door security lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN and remote",null,"features-L-A5");
  await seedCateg("L-S9",5900,"/assets/img/lavna11.jpg",3180,"Meet the 2 in 1 Lock for your cabinets from LAVNA Locks, which you can access from your fingerprint and PIN.",null,"features-L-S9");
  await seedCateg("L-A24(Bluetooth)",14200,"/assets/img/lavna4.jpg",8300,"Meet the 2 in 1 Lock for your doors from LAVNA Locks, which you can access from your fingerprint and PIN.",null,"features-L-A24(Bluetooth)");
  await seedCateg("L-A24(WI-FI)",15700,"/assets/img/lavna4.jpg",9800,"Meet the 5 in 1 Digital door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, WI-FI unlocking.",null,"features-L-A24(WI-FI)");
  await seedCateg("L-A24-Black(Bluetooth)",14200,"/assets/img/lavna4.jpg",8300,"Meet the 6 in 1 Digital door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, Bluetooth unlocking, OTP Unlocking and Key.",null,"features-L-A24-Black(Bluetooth)");
  await seedCateg("L-A24-Black(WI-FI)",15700,"/assets/img/lavna4.jpg",9800,"Meet the 5 in 1 Digital door lock from LAVNA Locks, which you can access from your fingerprint, RFID Card, PIN, WI-FI unlocking.",null,"features-L-A24-Black(WI-FI)");
  await seedCateg("L-A28(Bluetooth)",8999,"/assets/img/lavna6.jpg",7600,"Meet the 6 in 1 Lock for your doors from LAVNA Locks, which you can access from your Fingerprint, PIN, RFID card, OTP unlocking, Bluetooth unlocking and Manual Key.",null,"features-L-A28(Bluetooth)");
  await seedCateg("L-A28(WI-FI)",9999,"/assets/img/lavna6.jpg",8700,"Meet the 6 in 1 Lock for your doors from LAVNA Locks, which you can access from your Fingerprint, PIN, RFID card, OTP unlocking, Bluetooth unlocking and Manual Key.",null,"features-L-A28(WI-FI)");
  await seedCateg("L-A28(Remote)",9999,"/assets/img/lavna6.jpg",9000,"Meet the 5 in 1 Lock for your doors from LAVNA Locks, which you can access from your fingerprint, PIN, RFID card, Remote and Manual Key .",null,"features-L-A28(Remote)");
  await seedCateg("L-A28-Black(Bluetooth)",8999,"/assets/img/lavna6.jpg",7600,"Meet the 6 in 1 Lock for your doors from LAVNA Locks, which you can access from your Fingerprint, PIN, RFID card, OTP unlocking, Bluetooth unlocking and Manual Key.",null,"features-L-A28-Black(Bluetooth)");
  await seedCateg("L-A28-Black(WI-FI)",9999,"/assets/img/lavna6.jpg",8700,"Meet the 6 in 1 Lock for your doors from LAVNA Locks, which you can access from your Fingerprint, PIN, RFID card, OTP unlocking, WI-FI unlocking and Manual Key",null,"features-L-A28-Black(WI-FI)");
  await seedCateg("L-A28-Black(Remote)",9999,"/assets/img/lavna6.jpg",9000,"Meet the 5 in 1 Lock for your doors from LAVNA Locks, which you can access from your Fingerprint, PIN, RFID card, Remote and Manual Key . ",null,"features-L-A28-Black(Remote)");
  await closeDB();
}

seedDB();
