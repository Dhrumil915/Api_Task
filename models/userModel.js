const mongoose = require('mongoose')
const validator = require('validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    maxlength: [30, 'your cannot excced 30 character']
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'Your password longer then 6 characters'],
    select: false
  },
  mobile: {
    type: Number,
    required: [true, 'Please enter mobile number'],
    maxlength: [11, 'Please enter valid mobile number']
  }
})
// Encrypting password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bycrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);