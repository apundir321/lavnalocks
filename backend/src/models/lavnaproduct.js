const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lavnaProductSchema = Schema({
  
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model("LavnaProduct", lavnaProductSchema);
