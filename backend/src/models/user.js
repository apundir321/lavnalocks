const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
     email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    confirmpassword : {
        type: String
    },
    userimage: {
      type: String,
      url: "../../public/assets/new_assets/dashboard_img/db-profile.png"
    }

})

// encrypt the password before storing
employeeSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
  };
  
  employeeSchema.methods.validPassword = function (candidatePassword) {
    if (this.password != null) {
      return bcrypt.compareSync(candidatePassword, this.password);
    } else {
      return false;
    }
  };

const Register = new mongoose.model("User", employeeSchema);

module.exports = Register;